import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { TraderService } from '../trader.service';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {

  traders: Trader[] = [];

  constructor(private traderService: TraderService) { }

  ngOnInit(): void {
    // this.getTraders();
  }

  // getTraders(): void {
  //   this.traderService.getTraders()
  //   .subscribe(traders => this.traders=traders);
  // }

}
