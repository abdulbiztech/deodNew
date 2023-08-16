import { SuccessPaymentComponent } from './components/LandingPage/success-payment/success-payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/LandingPage/landingpage/landingpage.component';
import { LoginComponent } from './components/Navbar/login/login.component';
import { RegisterComponent } from './components/Navbar/register/register.component';
import { ProductDetailComponent } from './components/LandingPage/product-detail/product-detail.component';
import { BuyProductComponent } from './components/LandingPage/buy-product/buy-product.component';
import { OrderHistoryComponent } from './components/Navbar/order-history/order-history.component';
import { MyComponentComponent } from './components/LandingPage/my-component/my-component.component';
import { ForgetPassComponent } from './components/Navbar/forget-pass/forget-pass.component';
import { NewPassComponent } from './components/Navbar/new-pass/new-pass.component';

const routes: Routes = [

  { path: '', component: LandingpageComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
  },
  {
    path: 'success-payment',
    component: SuccessPaymentComponent,
  },
  {
    path: 'order-detail',
    component: OrderHistoryComponent,
  },
  {
    path: 'my-product',
    component: BuyProductComponent,
  },
    {
    path: 'forget-pass',
    component: ForgetPassComponent,
  },
  { path: 'http://localhost:5000/reset-password/64dcbb57caa79e71f8123af0/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRjYmI1N2NhYTc5ZTcxZjgxMjNhZjAiLCJpYXQiOjE2OTIxODc1MjQsImV4cCI6MTY5MjE4NzgyNH0.BMd8MwMmOviqJ-eyhDDKbY2W7zt2fj9zpvch54Uhf9M', component: NewPassComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
