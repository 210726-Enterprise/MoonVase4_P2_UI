import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { Router } from '@angular/router';
import { TraderService } from '../trader.service';
  
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  trader: Trader = <Trader>{};
  loggedIn: Trader = <Trader>{};

  constructor(
    private router: Router,
    private traderService: TraderService
    ) { }

  ngOnInit(): void {
  }

  register() {
    this.traderService.registerTrader(this.trader)
    .subscribe(
      // redirect to login
      res => {
        this.trader = res;
        console.log(this.trader);

      },
      err => console.log(err)
    )
    this.router.navigate(['/login']);
  }

}
