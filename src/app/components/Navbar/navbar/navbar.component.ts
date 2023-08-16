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
  isSignedIn: boolean = false;
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
  ) {}
  ngOnInit(): void {
    this.getToken();
    this.checkLoginStatus();
  }

checkLoginStatus(){

  const getValue = localStorage.getItem('login');
    if (getValue) {
      this.isSignedIn = true;
      this.isLoggedIn = true;
    }
    else {
      this.isSignedIn = false;
      this.isLoggedIn = false;
    }
}

  getToken() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    const getID = this.tokey_key._id
    this.onlyToken = this.tokey_key.token;
  }
  Logout() {
    this.landingService.logoutFun().subscribe(
      (response) => {
        console.log('responses', response);
        alert('User logout successfully');
        localStorage.removeItem('login');
        this.router.navigate(['/']);
        console.log('logout');
      },
      (error) => {
        console.log('Error coming');
      }
    );
  }
  orderBtn() {
    this.router.navigate(['order-detail']);
  }
  myProduct(){
    this.router.navigate(['my-product']);
  }
  showItem() {
    this.landingService.ShowProductDetail().subscribe(
      (resp) => {
        // console.log('resp', resp);
        this.idResponse = resp;
        this.cartDetail = this.idResponse.data.carts;
        this.productImage = this.cartDetail;
        this.userId = this.idResponse.data._id;
        // console.log('userId', this.userId);
        for (let index = 0; index < this.productImage.length; index++) {
          const imagesfirst = this.productImage[index].imageUrls[0];
          this.productImages = `${environment.apiUrl}/image/${imagesfirst}`;
          this.newImageData = {
            productUrl: this.productImages,
            ...this.productImage[index],
          };
          this.cartProductID = this.productImage[index]._id;
          this.cartProductImages.push(this.newImageData);
        }
        this.noOfProduct = this.cartProductImages.length;
      },
      (error) => {
        console.log('Error retrieving product details:', error);
      }
    );
  }
  deleteItem(id: any) {
    this.landingService.deleteProduct(id).subscribe((res) => {
      // console.log('res delete', res);
      alert('Cart Remove successfully');
      this.ngOnInit();
    });
  }

  ngAfterViewInit() {
    this.showItem();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.showItem();
}
navigateToproduct(){
  this.router.navigate(['/my-product'])
}
navigateToCart() {
  this.router.navigate(['/login']);
}
NavigateBuy(){
  this.router.navigate(['/buy-product']);
}
}
