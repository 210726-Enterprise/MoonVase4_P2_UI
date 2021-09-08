import { Component, OnInit } from '@angular/core';
import { CityindexService } from './cityindex.service';
import { TraderService } from './trader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    public cgService: CityindexService,
    public traderService: TraderService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    this.cgService.streamQuotes();
  }

  title = 'fauxrex';
}
