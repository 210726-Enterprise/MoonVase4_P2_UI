
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor } from '../visitor';
import { TraderService } from '../trader.service';
import { Trader } from '../trader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  visitor: Visitor = <Visitor>{};

  constructor(
    private traderService: TraderService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  login() {
    this.traderService.authenticateVisitor(this.visitor)
    .subscribe(
      (res: any) => {
        localStorage.setItem('token', res.jwt);
        this.router.navigate(['/account']);

      },
      (err: any) => console.log(err)
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
