import { CommonApiService } from './../../../services/common-api.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
})
export class LandingpageComponent implements OnInit {
  mySubject='';
  subjectData=''
  totalProduct:any
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
  getCartDetail() {
    this.landingService.getCardDetails().subscribe((res) => {
      this.cardList = res;
      // console.log('cardList', this.cardList.data[0].images[0]);
      for (let index = 0; index < this.cardList.data.length; index++) {
        const imagesfirst = this.cardList.data[index].images[0];
        const allsubData = this.cardList.data[index];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        // console.log('image', this.image);
        this.newData = { ...allsubData, imageUrl: this.image };
        this.imagess.push(this.newData);
      }
    });
  }

  addToCart(id: any) {
    this.landingService.cartProduct(id).subscribe(
      (res:any) => {
        this.cartData = res;
        alert('product added successfully');
        this.router.navigate(['/buy-product'])
      },
      (err) => {
        if (err.status == 400) {
          alert("Product is already in the cart");
          this.router.navigate(['/buy-product'])
        }
      }
    );
  }

  // showProduct(id: any) {
  //   this.landingService.ShowProductDetail().subscribe(
  //     (resp) => {
  //       console.log('resp', resp);
  //       this.idResponse = resp;
  //       this.cartDetail = this.idResponse.data.carts;
  //       this.productImage = this.cartDetail;
  //       this.userId = this.idResponse.data._id;
  //       // console.log('userId', this.userId);
  //       for (let index = 0; index < this.productImage.length; index++) {
  //         const imagesfirst = this.productImage[index].imageUrls[0];
  //         this.productImages = `${environment.apiUrl}/image/${imagesfirst}`;
  //         this.newImageData = {
  //           productUrl: this.productImages,
  //           ...this.productImage[index],
  //         };
  //         this.cartProductID = this.productImage[index]._id;
  //         this.cartProductImages.push(this.newImageData);
  //       }
  //       this.noOfProduct = this.cartProductImages.length;
  //     },
  //     (error) => {
  //       console.log('Error retrieving product details:', error);
  //     }
  //   );
  // }
  getTotalValue(): number {
    let total = 0;
    for (const item of this.cartProductImages) {
      total += item.price;
    }
    return total;
  }
  // deleteItem(id: any) {
  //   this.landingService.deleteProduct(id).subscribe((res) => {
  //     console.log('res delete', res);
  //     alert('Cart Remove successfully');
  //     this.showProduct(id);
  //   });
  // }
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
        // console.log("this.card",this.card);

        const filterDetail = this.card.data[index];
        this.parentData = filterDetail.images;
        // console.log("this.parentData ",this.parentData );

        const dataToSend = this.parentData;
        this.router.navigate(['/product-detail'], {
          queryParams: { data: dataToSend },
        });
      });
  }
}
