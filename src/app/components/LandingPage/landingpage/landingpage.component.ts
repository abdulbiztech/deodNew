import { CommonApiService } from './../../../services/common-api.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {
  mySubject = '';
  subjectData = '';
  totalProduct: any;
  isSignedIn: boolean = false;
  isLoggedIn: boolean = false;
  cardList: any = [];
  newData: any = [];
  image: any = [];
  imagess: any = [];
  newImageData: any;
  productImages: any = [];
  cartProductImages: any = [];
  imageUrls: any;
  cartData: any;
  idResponse: any;
  userId: any;
  cartDetail: any;
  productImage: any;
  cartProductID: any;
  noOfProduct: any;
  card: any;
  parentData: any = '';
  searchResults: any[] = [];
  filteredImagess: any[] = [];
  searchText: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    private toastr: ToastrService,
    private commonapi: CommonApiService
  ) {}

  ngOnInit(): void {
    this.getCartDetail();
    this.checkLocalStorageLoginStatus();
  }

  checkLocalStorageLoginStatus() {
    const loginInfo = localStorage.getItem('login');
    if (loginInfo) {
      this.isSignedIn = true;
      this.isLoggedIn = false;
    } else {
      this.isSignedIn = false;
      this.isLoggedIn = true;
    }
  }
  // getCartDetail() {
  //   this.landingService.getCardDetails().subscribe((res) => {
  //     this.cardList = res;
  //     for (let index = 0; index < this.cardList.data.length; index++) {
  //       const imagesfirst = this.cardList.data[index].images[0];
  //       const allsubData = this.cardList.data[index];
  //       this.image = `${environment.apiUrl}/image/${imagesfirst}`;
  //       this.newData = { ...allsubData, imageUrl: this.image };
  //       this.imagess.push(this.newData);
  //     }
  //   });
  // }
  getCartDetail(searchCriteria?: any) {
    this.landingService.getCardDetails(searchCriteria).subscribe((res) => {
      this.cardList = res;
      this.filteredImagess = []; // Clear the existing filteredImagess array
      for (let index = 0; index < this.cardList.data.length; index++) {
        const imagesfirst = this.cardList.data[index].images[0];
        const allsubData = this.cardList.data[index];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        this.newData = { ...allsubData, imageUrl: this.image };
        this.filteredImagess.push(this.newData);
      }
    });
  }

  addToCart(id: any) {
    console.log('id coming right now', id);

    const loginInfo = localStorage.getItem('login');
    if (loginInfo) {
      console.log('id coming', id);

      this.landingService.cartProduct(id).subscribe(
        (res: any) => {
          this.cartData = res;
          alert('product added successfully');
          this.router.navigate(['/buy-product']);
        },
        (err) => {
          if (err.status == 400) {
            alert('Product is already in the cart');
            this.router.navigate(['/buy-product']);
          }
        }
      );
    } else {
      alert('please Login to buy a product');
    }
  }
  routerToLogin() {
    this.router.navigate(['/login']);
  }
  routerProduct() {
    this.router.navigate(['/product-detail']);
  }
  navigateToBuyProduct() {
    this.router.navigate(['/buy-product']);
  }
  getCard(index: number): void {
    this.http
      .get(`${environment.apiUrl}` + `/getAll3DModels`)
      .subscribe((response) => {
        this.card = response;
        const filterDetail = this.card.data[index];
        this.parentData = filterDetail.images;
        const dataToSend = this.parentData;
        this.router.navigate(['/product-detail'], {
          queryParams: { data: dataToSend },
        });
      });
  }

  onSubmit(formValue: any) {
    this.landingService.searchProducts(formValue).subscribe(
      (data) => {
        if (data.status) {
          this.searchResults = data.data;
          this.filteredImagess = this.imagess.filter((item: any) =>
          this.searchResults.some((result) => result.modelName === item.modelName)
        );

        } else {
          console.error(data.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
