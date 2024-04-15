import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean | undefined;
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
  totalItems!: number;
  apiCall: any;
  isAuthenticated = false;
  cartData: any;
  cartSubscription!: Subscription;
  constructor(
    private router: Router,
    private http: HttpClient,
    private landingService: LandingPageService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.landingService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.isSignedIn! = loggedIn;
    });
    this.cartSubscription = this.landingService.cart$.subscribe((cartData) => {
      if (cartData && cartData.data && cartData.data.items) {
        this.totalItems = cartData.data.items.length;
      }
    });
  }
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  getToken() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.onlyToken = this.tokey_key.token;
  }
  Logout() {
    this.landingService.logoutFun().subscribe(
      () => {
        this.toastr.success(
          'You have been successfully logged out.',
          'Logout Successful'
        );
        this.router.navigate(['/']);
        this.landingService.loggedIn.next(false);
        localStorage.removeItem('login');
      },
      (error) => {
        this.toastr.error(
          'Failed to log out. Please try again later.',
          'Logout Failed'
        );
        console.error('Error occurred during logout:', error);
      }
    );
  }

  orderBtn() {
    this.showDropDown = true;
    this.router.navigate(['order-detail']);
  }
  myProduct() {
    this.router.navigate(['my-product']);
  }
  navigateToCart() {
    this.router.navigate(['/login']);
  }
  NavigateBuy() {
    this.router.navigate(['/buy-product']);
  }
}
