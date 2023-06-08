import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
let slideIndex = 1;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  image: any;
  isSignedIn: boolean = false;
  isLoggedIn: boolean = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private landingService: LandingPageService
  ) {}
  parentData: any = '';
  card: any;
  mainImage: any;
  multipleImages: any = [];
  firstImage: any;
  clickMessage: any;
  productImage:any
  visibleImages: any[] = [];
  ngOnInit() {
    this.currentSlide(1);
    this.route.queryParams.subscribe((params) => {
      const receivedData = params['data'];
      this.firstImage = `${environment.apiUrl}/image/${receivedData[0]}`;
      // console.log("firstImage",this.firstImage);

      for (let index = 0; index < receivedData.length; index++) {
        const element = receivedData[index];
        this.image = `${environment.apiUrl}/image/${element}`;
        this.multipleImages.push(this.image);
        this.productImage=this.multipleImages[0]

      }
    });
    this.checkLocalStorageLoginStatus()
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
    // console.log('this.productImage', this.productImage);
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
  productAdd(id:any){
    this.landingService.getCardDetails().subscribe((res)=>{
      console.log("res pro",res);

    })

  }
}
