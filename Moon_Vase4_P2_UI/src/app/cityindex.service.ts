import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { credentials } from './apicredentials';
import { Observable, Subscription } from 'rxjs';
import { Quote } from './quote';


@Injectable({
  providedIn: 'root'
})
export class CityindexService {

  private base = "https://ciapi.cityindex.com/TradingAPI"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private session!: string;

  public lastUpdate = new Date();
  public Market: Quote[] = [
    {CurrencyPair:'eurusd', MarketId:'401484347', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
    {CurrencyPair:'gbpusd', MarketId:'401484392', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
    {CurrencyPair:'nzdusd', MarketId:'401484402', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
  ]
  
  constructor(
    private http: HttpClient
  ) { }

  getSessionId(): Promise<any> {
    let payload = {
      Password: credentials.pword,
      AppVersion: "1",
      UserName: credentials.user,
      AppKey: credentials.appkey
    }
    let url = `${this.base}/session`;
    return this.http.post<any>(url, payload, this.httpOptions).toPromise();
  }

  getQuote(currencyPairIndex: number) {
    this.lastUpdate = new Date();
    let marketId = this.Market[currencyPairIndex].MarketId;
    let url = `${this.base}/market/${marketId}/tickhistory?PriceTicks=1&priceType=MID&UserName=${credentials.user}&Session=${this.session}`
    this.http.get<any>(url, this.httpOptions)
      .subscribe(
        result => {
          this.Market[currencyPairIndex].Delta = result.PriceTicks[0].Price - this.Market[currencyPairIndex].ExchangeRate;
          this.Market[currencyPairIndex].ExchangeRate = result.PriceTicks[0].Price
          this.Market[currencyPairIndex].Timestamp = new Date(parseInt(result.PriceTicks[0].TickDate.substring(6,19)))
        }
      )
  }

  _isIncreasing(currentRate: number, cpidx: number): boolean {
    if (currentRate > this.Market[cpidx].ExchangeRate) {
      return true;
    } else {
      return false;
    }
  }

  streamQuotes() {
    this.getSessionId().then((data)=>{
      this.session = data.Session;

      setInterval(() => this.getQuote(0), 10000)
      setInterval(() => this.getQuote(1), 10000)
      setInterval(() => this.getQuote(2), 10000)
    })
  }

}
