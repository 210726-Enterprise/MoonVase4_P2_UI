import { Component, OnInit } from '@angular/core';
import { TraderService } from '../trader.service';

@Component({
  selector: 'app-tradehist',
  templateUrl: './tradehist.component.html',
  styleUrls: ['./tradehist.component.css']
})
export class TradehistComponent implements OnInit {


  hide = true;

  constructor(
    public traderService: TraderService,
  ) { }

  ngOnInit(): void {
    this.traderService.getTrades()
  }

  toggleTradeHistory() {
    this.hide = !this.hide
  }


}
