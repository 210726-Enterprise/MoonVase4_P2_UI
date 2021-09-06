import { Component, OnInit } from '@angular/core';
import { CityindexService } from '../cityindex.service';

@Component({
  selector: 'app-quotechart',
  templateUrl: './quotechart.component.html',
  styleUrls: ['./quotechart.component.css']
})
export class QuotechartComponent implements OnInit {

  constructor(public cgService: CityindexService) { }

  ngOnInit(): void {
  }

}
