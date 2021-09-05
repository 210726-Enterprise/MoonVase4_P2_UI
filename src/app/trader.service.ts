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

  private baseUrl = 'http://localhost:8080/api';
  // private tradersUrl = 'http://localhost:8080/api/trader';
  // private traderUrl = `${this.baseUrl}/trader/username`
  private authUrl = 'http://localhost:8080/api/trader/authenticate';
  private registerUrl = 'http://localhost:8080/api/trader/register';
  private tradeUrl = 'http://localhost:8080/api/trade';

  

  // private streamUrl = 'http://push.cityindex.com/lightstreamer/create_session.txt?LS_protocol=TLCP-2.2.0&LS_cid=mgQkwtwdysogQz2BJ4Ji kOj2Bg&LS_adapter_set=STREAMINGALL&LS_data_adapter=PRICES.PRICE.154297&LS_user={{userxname}}&LS_password={{sessionxtoken}}'

  // loggedInTrader: Trader = <Trader>{};

  // getTraders(): Observable<Trader[]> {
  //   return this.http.get<Trader[]>(this.tradersUrl)
  // }

  trade(trade: {}) {
    this.http.post<any>(`${this.baseUrl}/trade`, trade, this.httpOptions)
  }

  registerTrader(trader: {}): Observable<Trader> {
    return this.http.post<any>(this.registerUrl, trader, this.httpOptions);
  }

  authenticateVisitor(visitor: {}) {
    return this.http.post<any>(this.authUrl, visitor, this.httpOptions);
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


// currencyPair:
// usdAmount: