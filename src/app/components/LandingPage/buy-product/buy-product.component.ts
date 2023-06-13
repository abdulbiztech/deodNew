import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
})
export class BuyProductComponent implements OnInit {
  razorpayPayment: any;
  ngForm!: FormGroup;
  id: any;
  productDetail: any;
  product: any;
  productImages: any;
  newImageData: any;
  productImage: any;
  image: any = [];
  images: any = [];
  newData: any = [];
  date: any;
  productDate: any;
  latest_date: any;
  total: any = [];
  products: any[] = [];
  orderId: any;
  order: any;
  orderAmt: any;
  amount: number = 10;
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.landingService.verifyOrder(this.id).subscribe((ress)=>{
      console.log("resss",ress);

    })
    this.initializePayment();
    this.showProduct(this.id);
    this.ngForm = this.fb.group({
      amount: [],
      reciept: [''],
      description: [''],
    });

    // this.initializePayment();
    this.placeOrder(this.id);
  }
  showProduct(id: any) {
    this.landingService.ShowProductDetail().subscribe((res) => {
      this.product = res;
      this.productDetail = this.product.data.carts;
      this.productDate = this.productDetail.updatedAt;
      this.productDate = new Date().toLocaleDateString();
      for (let index = 0; index < this.productDetail.length; index++) {
        const imagesfirst = this.productDetail[index].imageUrls[0];
        const TotalPrice = this.productDetail[index].price;
        this.total = TotalPrice;
        this.products.push(this.total);
        const allsubData = this.productDetail[index];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        this.newData = { ...allsubData, imageUrl: this.image };
        this.images.push(this.newData);
      }
    });
  }
  getTotalPrice(): number {
    return this.products.reduce((total, product) => total + product, 0);
  }

  // // ..............
  initializePayment(): void {
    this.razorpayPayment = new Razorpay({
      key: environment.razorpayKey, // Replace with your Razorpay key ID
      amount: this.amount * 100, // The amount to be charged (in paisa or your currency's smallest unit)
      currency: 'INR', // The currency code
      name: 'My Store',
      description: 'Payment for your order',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: this.orderId,
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9876543210',
      },
      handler: this.paymentCallback.bind(this),
      callback_url: this.landingService.verifyOrder(this.id).subscribe((ress)=>{
        console.log("resss",ress);

      })
    });
  }

  paymentCallback(response: any) {
    console.log(response);
  }

  placeOrder(ngForm: FormGroup) {
    this.razorpayPayment.open();
    this.landingService.createTransaction(ngForm.value).subscribe((res) => {
      this.orderId = res;
      this.order = this.orderId.order.id;
      this.orderAmt = this.orderId.order.amount;
      console.log(' this.order', this.orderAmt);
    });
  }
}
