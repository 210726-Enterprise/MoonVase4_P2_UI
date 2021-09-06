import { Component, OnInit } from '@angular/core';
import { CityindexService } from './cityindex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  constructor(
    public cgService: CityindexService
  ) {}

  ngOnInit(): void {
    this.cgService.streamQuotes();
  }

  title = 'fauxrex';
}
