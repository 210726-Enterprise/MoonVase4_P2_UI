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

  constructor(
    private traderService: TraderService,
    private cgService: CityindexService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.getTrader()
  }

  getTrader(): void {
    let jwt = localStorage.getItem('token')
    if (jwt) {
      this.traderService.getAuthenticatedTrader(jwt)
      .subscribe(
        res => this.trader = res,
        err => console.log(err)
      )
    }
  }

  executeTrade(currencyPairId: number, buyUSD=true) {
    if (buyUSD) {
      this.cp.id = currencyPairId;
      this.cp.currencyPair = this.cgService.Market[currencyPairId-1].CurrencyPair.substring(0,3)
      this.trade.currencyPair = this.cp;
    } else {
      this.cp.id = -currencyPairId;
      this.cp.currencyPair = 'USD'
      this.trade.currencyPair = this.cp;
    }
    
    // this.trade.rate = this.cgService.Market[currencyPairId-1].ExchangeRate;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TradeComponent, {
    //   width: '350px',
    //   height: '250px',
      data: {
        trader: this.trader,
        trade : this.trade
        
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
      console.log(this.trade)
      const response = await this.traderService.trade(this.trade).toPromise();
      this.trade = <Trade>{};
      this.cp = <currencyPair>{};
      this.ngOnInit();
    }
    this.trade = <Trade>{};
    this.cp = <currencyPair>{};
    });
  }
}
