import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trader } from './trader';
import { Visitor } from './visitor';

@Injectable({
  providedIn: 'root'
})
export class TraderService {
  
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private tradersUrl = 'http://localhost:8080/api/trader';
  private loginUrl = 'http://localhost:8080/api/trader/login';
  private registerUrl = 'http://localhost:8080/api/trader/register';

  getTraders(): Observable<Trader[]> {
    return this.http.get<Trader[]>(this.tradersUrl)
  }

  loginVisitor(visitor: {}) {
    return this.http.post<any>(this.loginUrl, visitor, this.httpOptions);
  }
  
  registerTrader(trader: {}): Observable<Trader> {
    return this.http.post<any>(this.registerUrl, trader, this.httpOptions);
  }

}
