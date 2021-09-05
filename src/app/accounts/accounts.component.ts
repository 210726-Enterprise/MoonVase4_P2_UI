import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../trader.service';
import { MatDialog } from '@angular/material/dialog';
import { TradeComponent } from '../trade/trade.component';
import { Trade } from '../trade';

export interface DialogData{
  amount: number
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  trade!: Trade;
  amount!: number;

  trader: Trader = <Trader>{};

  constructor(
    private traderService: TraderService,
    public dialog: MatDialog
    ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(TradeComponent, {
      width: '250px',
      data: {
        amount : this.amount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.amount = result;
      console.log(`they selected to trade ${this.amount}`)
      // this.traderService.trade(this.trade)
    });
  }

  ngOnInit(): void {
    this.getTrader();
  }

  getTrader(): void {
    let jwt = localStorage.getItem('token')
    if (jwt) {
      // console.log(jwt)
      this.traderService.getAuthenticatedTrader(jwt)
      .subscribe(
        (res: any) => {
          // console.log(res);
          this.trader = res;
        },
        (err: any) => console.log(err)
      )
    }
    else {
      console.log("IN ELSE BLOCK")
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



