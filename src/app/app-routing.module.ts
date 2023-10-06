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
import { AccountDetailComponent } from './components/Navbar/account-detail/account-detail.component';
import { SellModelComponent } from './components/Navbar/sell-model/sell-model.component';
import { NewArtistComponent } from './components/Navbar/new-artist/new-artist.component';
import { SupportComponent } from './components/Navbar/support/support.component';
import { DownloadsComponent } from './components/Navbar/downloads/downloads.component';
import { InvoiceComponent } from './components/Navbar/invoice/invoice.component';
import { ProductComponent } from './components/LandingPage/product/product.component';
import { AuthGuard } from './services/auth.guard';

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
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'buy-product',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'success-payment',
    component: SuccessPaymentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order-detail',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-product',
    component: BuyProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forget-pass',
    component: ForgetPassComponent,
  },
  {
    path: 'account-detail',
    component: AccountDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sell-model',
    component: SellModelComponent,
  },
  {
    path: 'new-artist',
    component: NewArtistComponent,
  },
  {
    path: 'support',
    component: SupportComponent,
  },
  {
    path: 'downloads',
    component: DownloadsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password/:userId/:token', component: NewPassComponent },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'invoice/:modelId',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
