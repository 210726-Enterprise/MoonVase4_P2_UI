import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Trader } from './trader';
import { TraderService } from './trader.service';
import { Visitor } from './visitor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) {}

  title = 'fauxrex';
}
