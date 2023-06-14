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
  // private rzp: any;
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
  amount: any;
  getProduct: any;
  pro: any;
  res:any
  amt:any
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.http
      .get('http://192.168.1.42:3000/api/getproducts')
      .subscribe((rip) => {
        this.getProduct = rip;
        this.pro = this.getProduct.getProducts;
        console.log('rip', this.pro);
      });
    // this.loadRazorpayScript();
    // this.initializePayment();
    this.showProduct(this.id);
    // this.ngForm = this.fb.group({
    //   amount: [],
    //   reciept: [''],
    //   description: [''],
    // });

    // this.initializePayment();
    // this.placeOrder(this.id);
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
    // this.razorpayPayment = new Razorpay({
    //   key: environment.razorpayKey, // Replace with your Razorpay key ID
    //   amount: this.amount * 100, // The amount to be charged (in paisa or your currency's smallest unit)
    //   currency: 'INR', // The currency code
    //   name: 'My Store',
    //   description: 'Payment for your order',
    //   image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
    //   order_id: this.orderId,
    //   prefill: {
    //     name: 'John Doe',
    //     email: 'john@example.com',
    //     contact: '9876543210',
    //   },
    //   // callback_url: 'http://http://localhost:5000/verifyOrder',
    //   // handler: (response:any) => {
    //   //   this.capturePayment();
    //   // },
    //   handler: (response:any) => {
    //     this.capturePayment(response);
    //   },
    // });
    const option = {

      key: 'rzp_test_rctEhk9DkJO7hU', // Replace with your Razorpay key ID
      amount: this.amt*100, // The amount to be charged (in paisa or your currency's smallest unit)
      currency: 'INR', // The currency code
      name: 'My Store',
      description: 'Payment for your order',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: this.id,
      callback_url: 'http://192.168.1.42:3000/api/paymentVerification',
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#121212',
      },
    };
    var razorPayObject = new Razorpay(option);
    razorPayObject.open();
    // this.razorpayPayment.open();

  }
  // capturePayment(resp: any) {
  //   console.log('response', resp);

  // const paymentData = {
  //   orderId: this.orderId,
  //   amount: this.amount,
  //   paymentId: paymentId,
  //   signature: signature,
  // };
  // this.http
  // .post<any>('http://localhost:5000/verifyOrder', paymentData)
  // .subscribe((data) => {
  //   console.log(data);
  //   alert('Payment successful!');
  // });
  // }

  placeOrder(ngForm: FormGroup) {
    // this.razorpayPayment.open();

    this.landingService.createTransaction(ngForm.value).subscribe((res) => {
      this.orderId = res;
      this.order = this.orderId.order.id;
      console.log('this.order', this.order);
      this.orderAmt = this.orderId.order.amount;
      console.log(' this.order', this.orderAmt);
    });
    this.initializePayment();
  }

  buyNow(id: any) {
    // console.log("id",id);

    this.http
      .post('http://192.168.1.42:3000/api/checkout', {"amount":id})
      .subscribe((res) => {
        console.log('checkout', res);
        this.res = res
        this.amt =this.res.order.amount
        this.id = this.res.order.id
        console.log("this.amt ",this.amt );

      });
      this.initializePayment();
  }
}
