import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../accounts/accounts.component';
import { CityindexService } from '../cityindex.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent {

  constructor(
    public dialogRef: MatDialogRef<TradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public cgService: CityindexService
    ) { }

    currencySymbols = ['€','£','NZ$']

    public amountSold=1.00;
    
   onNoClick(): void {
    this.dialogRef.close();
  }

}