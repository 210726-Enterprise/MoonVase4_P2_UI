import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Quote } from './quote';

export interface CgCreds {
  Password: string;
  UserName: string;
  AppKey: string;
}

@Injectable({
  providedIn: 'root'
})

export class CityindexService {

  private base = "https://ciapi.cityindex.com/TradingAPI"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private session!: string;
  private cgCreds!: CgCreds;

  public lastUpdate = new Date();
  public Market: Quote[] = [
    {CurrencyPair:'eurusd', MarketId:'401484347', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
    {CurrencyPair:'gbpusd', MarketId:'401484392', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
    {CurrencyPair:'nzdusd', MarketId:'401484402', ExchangeRate:0.0, Timestamp: new Date(), Delta: 0},
  ]
  
  constructor(
    private http: HttpClient
  ) { }

  async getCgCredentials(): Promise<any>{
    let url = "http://fauxrexapi-env.eba-xgpwevmr.us-east-2.elasticbeanstalk.com/api/trade/cg"
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(url, httpOptions).toPromise()
  }


  async getSessionId(data: any): Promise<any> {
    let url = `${this.base}/session`;
    return this.http.post<any>(url, data, this.httpOptions).toPromise();
  }

  streamQuotes() {
    this.getCgCredentials().then(
        (data)=>this.getSessionId(data)
          .then((data)=>{
            this.session = data.Session;
            setInterval(() => this.getQuote(0), 2000)
            setInterval(() => this.getQuote(1), 2000)
            setInterval(() => this.getQuote(2), 2000)
          }
        ) 
    )
  }

  getQuote(currencyPairIndex: number) {
    this.lastUpdate = new Date();
    let marketId = this.Market[currencyPairIndex].MarketId;
    let url = `${this.base}/market/${marketId}/tickhistory?PriceTicks=1&priceType=MID&UserName=${this.cgCreds.UserName}&Session=${this.session}`
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

}

