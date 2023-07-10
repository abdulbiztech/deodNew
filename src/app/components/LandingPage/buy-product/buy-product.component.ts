import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
})
export class BuyProductComponent implements OnInit {
  // private rzp: any;
  ngForm!:FormGroup
  razorpayPayment: any;
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
 orderAmt: number = 0;
  amount: any;
  getProduct: any;
  pro: any;
  res: any;
  amt: any;
  redirect: any;
  hundred:number=1000
  proId:any
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.showProduct(this.id);
    // this.http
    //   .get('http://192.168.1.42:3000/api/getproducts')
    //   .subscribe((rip) => {
    //     this.getProduct = rip;
    //     this.pro = this.getProduct.getProducts;
    //     console.log('rip', this.pro);
    //   });

    this.ngForm = this.fb.group({
      amount: [],
      reciept: [],
      description: [],
    });
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
        // console.log("this.products",this.products);

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
  initializePayment():void {
    const option = {
      key: 'rzp_test_rctEhk9DkJO7hU',
      amount: this.orderAmt * 100,
      currency: 'USD',
      name: 'My Store',
      description: 'Payment for your order',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: this.order,
      callback_url: 'http://localhost:5000/verifyOrder',
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
  }

  // placeOrder(ngForm: FormGroup) {
  //   this.landingService.createTransaction(ngForm.value).subscribe((res) => {
  //     this.orderId = res;
  //     this.order = this.orderId.order.id;
  //     console.log('this.order', this.order);
  //     this.orderAmt = this.orderId.order.amount;
  //     console.log(' this.order', this.orderAmt);
  //   });
  //   this.initializePayment();
  // }
  placeOrder(ngForm: FormGroup) {
    console.log("data coming",ngForm.value);
    // this.http
    // .post('http://localhost:5000/createOrder', { amount: 150000},ngForm.value)
    // .subscribe((res) => {
    //   // console.log("reskgdsufg",res);
    //   this.orderId = res;
    //   this.order = this.orderId.order.id;
    //   console.log('this.order', this.order);
    //   this.orderAmt = this.orderId.order.amount;
    //   console.log(' this.order', typeof(this.orderAmt));
    // });
    this.initializePayment();
  }

  // buyNow(id: any) {
  //   this.http
  //     .post('http://192.168.1.42:3000/api/checkout', { amount: id })
  //     .subscribe((res) => {
  //       console.log('checkout', res);
  //       this.res = res;
  //       this.amt = this.res.order.amount;
  //       this.id = this.res.order.id;
  //       console.log('this.amt ', this.amt);
  //     });
  //   this.initializePayment();
  // }
  Order(id: any) {
  //   console.log("idd",id);

  //   this.http
  //     .post('http://localhost:5000/createOrder', { amount: id })
  //     .subscribe((res) => {
  //       this.orderId = res;
  //       this.order = this.orderId.order.id;
  //       console.log('this.order', this.order);
  //       this.orderAmt = this.orderId.order.amount;
  //     });
  //   this.initializePayment();
  // }
  this.http
  .post('http://localhost:5000/createOrder', { amount: id })
  .subscribe((res) => {
    console.log("reskgdsufg",res);

    this.orderId = res;
    this.order = this.orderId.order.id;
    console.log('this.order', this.order);
    this.orderAmt = this.orderId.order.amount;
    console.log(' this.order', this.orderAmt);
  });
this.initializePayment();
}
remove(){
  console.log("remove");

}

}
