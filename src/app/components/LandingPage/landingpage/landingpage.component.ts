import { CommonApiService } from './../../../services/common-api.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
const ItemModel = {
  modelName: '',
  price: 0
};
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
  searchText: any;
  cardDetail: any;
  items: typeof ItemModel[] = [];
  sortBy: string = 'priceHighToLow';
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
    this.fetchItems();
  }
  sortItems(): void {
    switch (this.sortBy) {
      case 'priceLowToHigh':
        this.filteredImagess.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
      default:
        this.filteredImagess.sort((a, b) => b.price - a.price);
        break;
    }
  }
  fetchItems(): void {
    this.http.get<typeof ItemModel[]>(`${environment.apiUrl}/items`).subscribe(
      (data) => {
        this.items = data;
        // Apply initial sorting
        this.sortItems();
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
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

  getCartDetail(searchCriteria?: any) {
    this.landingService.getCardDetails(searchCriteria).subscribe((res) => {
      this.cardList = res;
      this.filteredImagess = [];
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
    const loginInfo = localStorage.getItem('login');
    if (loginInfo) {
      this.landingService.cartProduct(id).subscribe(
        (res: any) => {
          this.cartData = res;
          this.toastr.success('Product added to cart successfully');
          this.router.navigate(['/buy-product']);
        },
        (err) => {
          if (err.status == 400) {
            this.landingService.getProduct().subscribe((res: any) => {
              this.cartData === res;
            });
            this.toastr.error(
              'Failed to add product to cart: ' + err.error.message
            );
            this.router.navigate(['/order-detail']);
          }
        }
      );
    } else {
      this.toastr.info('Please log in to add the product to your cart');
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
            this.searchResults.some(
              (result) => result.modelName.toLowerCase() === item.modelName.toLowerCase()
            )
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

  getProduct(modelId: any) {
    this.landingService.get3DModelByModelId(modelId).subscribe((res: any) => {
      console.log('res', res);
      this.cardDetail = res;
      this.landingService.updateCardDetails(this.cardDetail);
    });
  }
}
