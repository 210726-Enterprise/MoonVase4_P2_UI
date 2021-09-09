
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor } from '../visitor';
import { TraderService } from '../trader.service';
import { Trader } from '../trader';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CityindexService } from '../cityindex.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visitor: Visitor = <Visitor>{};
  hide = true;

  constructor(
    private traderService: TraderService,
    public cgService: CityindexService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit(): void {
  }


  login() {
    this.traderService.authenticateVisitor(this.visitor)
    .subscribe(
      (res: any) => {
        localStorage.setItem('token', res.jwt);
        this.cgService.streamQuotes();
        this.router.navigate(['/account']);

      },
      (err: any) => {
        this.flashMessagesService.show('Invalid credentials', { cssClass: 'alert-danger', timeout: 3000 });
        console.log(err)
      }
    )
  }

  createNewAccount(): void {
    this.router.navigate(['/register']);
  }

  // createNewAccount($myParam: string = ''): void {
    // const navigationDetails: string[] = ['/register'];
    // if($myParam.length) {
    //   navigationDetails.push($myParam);
    // }
  //   this.router.navigate(['/register']);
  // }
}
