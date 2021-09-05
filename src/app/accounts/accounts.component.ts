import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../trader.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeComponent } from '../trade/trade.component';
import { Trade } from '../trade';
import { currencyPair } from '../currencyPair';

export interface DialogData{
  trade: Trade
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
    public dialog: MatDialog
    ) { }

  executeTrade(currencyPairId: number) {
    this.cp.id = currencyPairId;
    this.trade.currencyPair = this.cp;
    console.log(this.trade);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TradeComponent, {
      width: '250px',
      data: {
        trade : this.trade
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      this.trade.usdAmount = result;
      if (this.trade.usdAmount) {
        const response = await this.traderService.trade(this.trade).toPromise();
        // .subscribe makes page reload before the trade is persisted, need to persist, then reload
        // this.traderService.trade(this.trade)
        //   .subscribe(
        //     res => console.log(res),
        //     err => console.log(err)
        //   )
        this.trade = <Trade>{};
        this.cp = <currencyPair>{};
        this.ngOnInit();
      }
      this.trade = <Trade>{};
      this.cp = <currencyPair>{};
    });
  }

  ngOnInit(): void {
    this.getTrader();
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


  // getTrader(): void {
  //   // this.trader = this.traderService.loggedInTrader;
  //   // localStorage.setItem('loggedInTrader', JSON.stringify(this.trader))
  //   var loggedIn = localStorage.getItem('loggedInTrader');
  //   if (!!loggedIn) {
  //     this.trader = JSON.parse(loggedIn);
  //   }
  // }

}



