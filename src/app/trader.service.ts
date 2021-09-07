import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trader } from './trader';
import { Trade } from './trade';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TraderService {

  private baseUrl = 'http://localhost:8080/api';
  private httpOptions = { // these headers for /authenticate and /register only, others should include jwt from local storage
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public tradeHist = <any>[];

  constructor(
    private http: HttpClient,
    private router: Router
    // private tradeHist: TradehistComponent
    ) { }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/'])
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getTrades() {
    this.tradeHistory().
      subscribe(
        result => this.tradeHist = result
      )
  }

  tradeHistory() {
    console.log("attempting .get .../trade")
    let requestOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      )
    }
    return this.http.get<any>(`${this.baseUrl}/trade/history`, requestOptions)
  }

  async trades(trades: Trade[]) {
    for (var trade of trades) {
      await this.trade(trade).toPromise();
    }
  }

  trade(trade: {}){
    let postOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      )
    }
    this.tradeHist.unshift(trade)
    return this.http.post<any>(`${this.baseUrl}/trade`, trade, postOptions);
  }

  registerTrader(trader: Trader): Observable<Trader> {
    return this.http.post<any>(`${this.baseUrl}/trader/register`, trader, this.httpOptions);
  }

  authenticateVisitor(visitor: {}) {
    return this.http.post<any>(`${this.baseUrl}/trader/authenticate`, visitor, this.httpOptions);
  }
  
  getAuthenticatedTrader(jwt: string): Observable<Trader> {
    let requestOptions = {
      headers: new HttpHeaders(
        { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${jwt}`
        }
      )
    };
    return this.http.get<Trader>(`${this.baseUrl}/trader/username`, requestOptions)
  }
}
