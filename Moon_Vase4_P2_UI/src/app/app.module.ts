import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradersComponent } from './traders/traders.component';
import { AccountsComponent } from './accounts/accounts.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TradeComponent } from './trade/trade.component';
import { MatSliderModule } from '@angular/material/slider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'
import { MatMenuModule } from '@angular/material/menu';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatIconModule } from '@angular/material/icon';
import { QuotechartComponent } from './quotechart/quotechart.component';
import { TradehistComponent } from './tradehist/tradehist.component';
import { AccountGuard } from './account.guard';

@NgModule({
  declarations: [
    AppComponent,
    TradersComponent,
    AccountsComponent,
    RegisterComponent,
    LoginComponent,
    TradeComponent,
    QuotechartComponent,
    TradehistComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    FlashMessagesModule.forRoot(),
    MatIconModule
  ],
  providers: [AccountGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
