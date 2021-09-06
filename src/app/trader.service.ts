import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trader } from './trader';

@Injectable({
  providedIn: 'root'
})

export class TraderService {

  private baseUrl = 'http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private lsClient: any;

  constructor(
    private http: HttpClient
    ) { }

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
    return this.http.post<any>(`${this.baseUrl}/trade`, trade, postOptions);
  }

  registerTrader(trader: {}): Observable<Trader> {
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
