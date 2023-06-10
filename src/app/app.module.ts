import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './components/LandingPage/landingpage/landingpage.component';
import { NavbarComponent } from './components/Navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/Navbar/login/login.component';
import { RegisterComponent } from './components/Navbar/register/register.component';
import { FooterComponent } from './components/Navbar/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductDetailComponent } from './components/LandingPage/product-detail/product-detail.component';
import { TestPaymentComponent } from './components/LandingPage/test-payment/test-payment.component';
import { BuyProductComponent } from './components/LandingPage/buy-product/buy-product.component';
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProductDetailComponent,
    TestPaymentComponent,
    BuyProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut : 1000}),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
