import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/LandingPage/landingpage/landingpage.component';
import { LoginComponent } from './components/Navbar/login/login.component';
import { RegisterComponent } from './components/Navbar/register/register.component';
import { ProductDetailComponent } from './components/LandingPage/product-detail/product-detail.component';
import { TestPaymentComponent } from './components/LandingPage/test-payment/test-payment.component';
import { BuyProductComponent } from './components/LandingPage/buy-product/buy-product.component';

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
    path: 'test-payment',
    component: TestPaymentComponent,
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
