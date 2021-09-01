
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Visitor } from '../visitor';
import { TraderService } from '../trader.service';

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
    this.traderService.loginVisitor(this.visitor)
    .subscribe(
      // direct to accounts page
      (res: any) => console.log(res),
      (err: any) => console.log(err)
    )
  }

  createNewAccount($myParam: string = ''): void {
    const navigationDetails: string[] = ['/register'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

}
