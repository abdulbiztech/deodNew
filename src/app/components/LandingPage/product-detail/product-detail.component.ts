import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
let slideIndex = 1;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  image: any;
  isSignedIn: boolean = false;
  isLoggedIn: boolean = false;
  cardDetails: any;
  modelPrice: any;
  userIdd: any;
  private subscription!: Subscription;
  dataStore: any;
  productId:any;
  tokey_key:any;
  onlyToken:any;
  userId:any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private landingService: LandingPageService,
    private router: Router
  ) {
    this.subscription = this.landingService.cardDetails$.subscribe((result) => {
      this.cardDetails = result;
      const data = this.cardDetails.data;
      const storedDataString = localStorage.getItem('cardDetails');
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString);
        const price = storedData.data.price;
        const id = storedData.data.price;
        console.log('Price:', price);
      } else {
        console.log('Data not found in local storage');
      }

      this.modelPrice = data.price;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  parentData: any = '';
  card: any;
  mainImage: any;
  multipleImages: any = [];
  firstImage: any;
  clickMessage: any;
  productImage: any;
  visibleImages: any[] = [];
  cartData: any;
  ngOnInit() {
    window.scrollTo(1, 1);
    this.currentSlide(1);
    this.route.queryParams.subscribe((params) => {
      const receivedData = params['data'];
      this.firstImage = `${environment.apiUrl}/image/${receivedData[0]}`;
      for (let index = 0; index < receivedData.length; index++) {
        const element = receivedData[index];
        this.image = `${environment.apiUrl}/image/${element}`;
        this.multipleImages.push(this.image);
        this.productImage = this.multipleImages[0];
      }
    });
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
  currentSlide(n: number): void {
    this.showSlides((slideIndex = n));
  }

  showSlides(n: number): void {
    let i: number;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('demo');
    let captionText = document.getElementById('caption') as HTMLElement;
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      (dots[i] as HTMLElement).className = (
        dots[i] as HTMLElement
      ).className.replace(' active', '');
    }
    (slides[slideIndex - 1] as HTMLElement).style.display = 'block';
    (dots[slideIndex - 1] as HTMLElement).className += ' active';
  }

  showImage(image: any) {
    this.productImage = image;
  }
  showPreviousImage() {
    const currentIndex = this.multipleImages.indexOf(this.productImage);
    const previousIndex =
      (currentIndex - 1 + this.multipleImages.length) %
      this.multipleImages.length;
    this.productImage = this.multipleImages[previousIndex];
  }
  showNextImage() {
    const currentIndex = this.multipleImages.indexOf(this.productImage);
    const nextIndex = (currentIndex + 1) % this.multipleImages.length;
    this.productImage = this.multipleImages[nextIndex];
  }
  AddtoCartBtn() {
    const loginInfo = localStorage.getItem('login');
    if (loginInfo) {
      // this.dataStore = localStorage.getItem('login');
      this.tokey_key = JSON.parse(loginInfo).data;
      console.log('this.tokey_key', this.tokey_key);
      this.productId = this.tokey_key._id;
      this.onlyToken = this.tokey_key.token;
      this.userIdd = this.tokey_key.userId;
      console.log('this.userIdd', this.userIdd);
      this.landingService.cartProduct(this.userIdd).subscribe(
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
      this.router.navigate(['/login']);
    }
    // const loginInfo = localStorage.getItem('login');
    // if (loginInfo) {
    //   console.log("you can buy");

    // } else {
    //   this.isSignedIn = false;
    //   this.isLoggedIn = true;
    // }
  }
  navigateToBuyProduct() {
    this.router.navigate(['/buy-product']);
  }
}
