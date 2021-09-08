import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TraderService } from './trader.service';

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {

  constructor(
    private traderService: TraderService,
    private router: Router
    ) {}

  canActivate(): boolean {
    if (this.traderService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
  
}
