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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailComponent } from './components/LandingPage/product-detail/product-detail.component';
import { BuyProductComponent } from './components/LandingPage/buy-product/buy-product.component';
import { DatePipe } from '@angular/common'
import { ToastrModule } from 'ngx-toastr';
import { SuccessPaymentComponent } from './components/LandingPage/success-payment/success-payment.component';
import { OrderHistoryComponent } from './components/Navbar/order-history/order-history.component';
import { MyComponentComponent } from './components/LandingPage/my-component/my-component.component';
import { ForgetPassComponent } from './components/Navbar/forget-pass/forget-pass.component';
import { NewPassComponent } from './components/Navbar/new-pass/new-pass.component';
import { AccountDetailComponent } from './components/Navbar/account-detail/account-detail.component';
import { SellModelComponent } from './components/Navbar/sell-model/sell-model.component';
import { NewArtistComponent } from './components/Navbar/new-artist/new-artist.component';
import { SupportComponent } from './components/Navbar/support/support.component';
import { DownloadsComponent } from './components/Navbar/downloads/downloads.component';
import { InvoiceComponent } from './components/Navbar/invoice/invoice.component';
import { SearchFilterPipe } from './components/LandingPage/landingpage/search-filter.pipe';
import { ProductComponent } from './components/LandingPage/product/product.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProductDetailComponent,
    BuyProductComponent,
    SuccessPaymentComponent,
    OrderHistoryComponent,
    MyComponentComponent,
    ForgetPassComponent,
    NewPassComponent,
    AccountDetailComponent,
    SellModelComponent,
    NewArtistComponent,
    SupportComponent,
    DownloadsComponent,
    InvoiceComponent,
    SearchFilterPipe,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    ToastrModule.forRoot({timeOut : 2000}),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
