import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean | undefined ;
  isLoggedIn: boolean = false;
  showDropDown: boolean = false;
  tokey_key: any = [];
  dataStore: any;
  onlyToken: any;
  productId: any;
  tempData: any;
  totalItem: any;
  idResponse: any;
  cartDetail: any;
  productImage: any;
  userId: any;
  productImages: any = [];
  cartProductImages: any = [];
  newImageData: any;
  cartProductID: any;
  noOfProduct: any;
  apiCall: any;
  isAuthenticated = false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private landingService: LandingPageService
  ) {
  }
  ngOnInit(): void {
    this.landingService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.isSignedIn! = loggedIn;
    });
  }


  getToken() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.onlyToken = this.tokey_key.token;
  }
  Logout() {
    this.landingService.logoutFun().subscribe(
      (response) => {
        alert('User logout successfully');
        this.router.navigate(['/']);
        this.landingService.loggedIn.next(false);
        localStorage.removeItem('login');
      },
      (error) => {
        console.log('Error coming');
      }
    );
  }
  orderBtn() {
    this.showDropDown =true;
    this.router.navigate(['order-detail']);
  }
  myProduct(){
    this.router.navigate(['my-product']);
  }
navigateToCart() {
  this.router.navigate(['/login']);
}
NavigateBuy(){
  this.router.navigate(['/buy-product']);
}
}
