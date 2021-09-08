import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../trader.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeComponent } from '../trade/trade.component';
import { Trade } from '../trade';
import { currencyPair } from '../currencyPair';
import { CityindexService } from '../cityindex.service';

export interface DialogData{
  trade: Trade;
  trader: Trader;
  outCurrency: string;
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  
  trade: Trade = <Trade>{};
  cp: currencyPair = <currencyPair>{};
  trader: Trader = <Trader>{};
  outCurrency: string  = '';


  constructor(
    private traderService: TraderService,
    public cgService: CityindexService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getTrader()
  }

  getTrader(): void {
    let jwt = localStorage.getItem('token') // call getItem in traderservice instead
    if (jwt) {
      this.traderService.getAuthenticatedTrader(jwt)
      .subscribe(
        res => this.trader = res,
        err => console.log(err)
      )
    }
  }

  async closeAllPositions() {
    let eurXRate = this.cgService.Market[0].ExchangeRate
    let gbpXRate = this.cgService.Market[1].ExchangeRate
    let nzdXRate = this.cgService.Market[2].ExchangeRate

    let eurCurrencyPair = <currencyPair>{id:1, currencyPair: 'eurusd'}
    let gbpCurrencyPair = <currencyPair>{id:2, currencyPair: 'gbpusd'}
    let nzdCurrencyPair = <currencyPair>{id:3, currencyPair: 'nzdusd'}

    let dollarsFromEUR = this.trader.account.eur*eurXRate
    let dollarsFromGBP = this.trader.account.gbp*gbpXRate
    let dollarsFromNZD = this.trader.account.nzd*nzdXRate

    let trades = <any>[];

    if (dollarsFromEUR > 0) {
      let eurTrade = <Trade>{
        currencyPair:eurCurrencyPair, 
        usdAmount:dollarsFromEUR,
        timestamp: new Date(),
        rate: eurXRate
      }
      trades.push(eurTrade)
    }

    if (dollarsFromGBP > 0) {
      let gbpTrade = <Trade>{
        currencyPair:gbpCurrencyPair, 
        usdAmount:dollarsFromGBP,
        timestamp: new Date(),
        rate: gbpXRate
      }
      trades.push(gbpTrade)
    }
  
    if (dollarsFromNZD > 0) {
      let nzdTrade = <Trade>{
        currencyPair:nzdCurrencyPair, 
        usdAmount:dollarsFromNZD,
        timestamp: new Date(),
        rate: nzdXRate
      }
      trades.push(nzdTrade)
    }

    // let trades = [eurTrade, gbpTrade, nzdTrade]
    if (trades.length > 0) { 
      await this.traderService.trades(trades)
    }
    this.ngOnInit();
  }

  executeTrade(currencyPairId: number, buyUSD=true) {
    if (buyUSD) {
      this.cp.id = currencyPairId;
      this.outCurrency = this.cgService.Market[currencyPairId-1].CurrencyPair.substring(0,3)
    } else {
      this.cp.id = -currencyPairId;
      this.outCurrency = 'USD'
    }
    this.cp.currencyPair = this.cgService.Market[currencyPairId-1].CurrencyPair
    this.trade.currencyPair = this.cp;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TradeComponent, {
    //   width: '350px',
    //   height: '250px',
      data: {
        trader: this.trader,
        trade : this.trade,
        outCurrency: this.outCurrency
        
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      // if this.trade.currencyPair.id < 0 - they're selling dollars
      if (result) {
      if (this.trade.currencyPair.id < 0) {
        let rate = this.cgService.Market[-this.trade.currencyPair.id-1].ExchangeRate
        this.trade.usdAmount = -result
        this.trade.currencyPair.id = -this.trade.currencyPair.id
        this.trade.rate = rate
      } else {
        let rate = this.cgService.Market[this.trade.currencyPair.id-1].ExchangeRate
        this.trade.usdAmount = result*rate
        this.trade.rate = rate
      }
      this.trade.timestamp = new Date();
      if (this.trade.rate > 0 && this.trade.usdAmount != 0) {
        const response = await this.traderService.trade(this.trade).toPromise();
        this.trade = <Trade>{};
        this.cp = <currencyPair>{};
        this.ngOnInit();
      }
    }
    this.trade = <Trade>{};
    this.cp = <currencyPair>{};
    });
  }
}
