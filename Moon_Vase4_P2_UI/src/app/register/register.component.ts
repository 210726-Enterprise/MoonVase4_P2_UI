import { Component, OnInit } from '@angular/core';
import { Trader } from '../trader';
import { Router } from '@angular/router';
import { TraderService } from '../trader.service';
import { FlashMessagesService } from 'angular2-flash-messages';
  
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  trader: Trader = <Trader>{};
  verify: string | undefined;
  loggedIn: Trader = <Trader>{};

  constructor(
    private router: Router,
    private traderService: TraderService,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }

  register() {
    if (this.trader.password !== this.verify) {
      this.flashMessagesService.show('Passwords don\'t match', { cssClass: 'alert-warning', timeout: 3000 });
    } else {    
      this.traderService.registerTrader(this.trader)
      .subscribe(
        // redirect to login
        res => {
          this.trader = res;
          console.log(this.trader);
          this.router.navigate(['/login']);
  
        },
        err => {
        console.log(err)
        this.flashMessagesService.show('Invalid (try another username)', { cssClass: 'alert-warning', timeout: 3000 });
        }
      )
    }
  }

}
