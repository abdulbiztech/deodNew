import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
import { Product } from './buy-product.model';
declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
})
export class BuyProductComponent implements OnInit {
  mainProduct:Product=new Product();
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
  totalPrice:any
  checkOutData:any
  checkoutDetail:any
  orderCurrency:any
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.getProductByUserId();
    this.ngForm = this.fb.group({
      amount: [],
      reciept: [],
      description: [],
    });
    // this.initializePayment();
  }

  getProductByUserId(){
    this.landingService.getCartByUserId().subscribe((res)=>{
      this.mainProduct.response = res
      this.mainProduct.data = this.mainProduct.response.data;
      this.mainProduct.cartId = this.mainProduct.data;
      this.totalPrice = this.mainProduct.cartId.totalPrice
      this.checkOutData = {
        amount: this.totalPrice,
      };
      console.log("this.checkOutData",this.checkOutData);
      // this.amount=`"amount:"${this.totalPrice}`
      this.mainProduct.items = this.mainProduct.cartId.items
      for (let index = 0; index < this.mainProduct.items.length; index++) {
        const element = this.mainProduct.items[index];
        const imagesfirst = this.mainProduct.items[index].images[0];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        const allsubData = this.mainProduct.items[index];
        this.newData = { ...allsubData, imageUrl: this.image };
        this.images.push(this.newData);
        // console.log("images",this.images);
      }

    });
  }
  // showProduct(id: any) {
  //   this.landingService.ShowProductDetail().subscribe((res) => {
  //     this.product = res;
  //     this.productDetail = this.product.data.carts;
  //     this.productDate = this.productDetail.updatedAt;
  //     this.productDate = new Date().toLocaleDateString();
  //     for (let index = 0; index < this.productDetail.length; index++) {
  //       const imagesfirst = this.productDetail[index].imageUrls[0];
  //       const TotalPrice = this.productDetail[index].price;
  //       this.total = TotalPrice;
  //       this.products.push(this.total);
  //       // console.log("this.products",this.products);

  //       const allsubData = this.productDetail[index];
  //       this.image = `${environment.apiUrl}/image/${imagesfirst}`;
  //       this.newData = { ...allsubData, imageUrl: this.image };
  //       this.images.push(this.newData);
  //     }
  //   });
  // }



  // getTotalPrice(): number {
  //   return this.products.reduce((total, product) => total + product, 0);
  // }



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
    // this.initializePayment();
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
  // Order(id: any) {
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
//   this.http
//   .post('http://localhost:5000/createOrder', { amount: id })
//   .subscribe((res) => {
//     console.log("reskgdsufg",res);

//     this.orderId = res;
//     this.order = this.orderId.order.id;
//     console.log('this.order', this.order);
//     this.orderAmt = this.orderId.order.amount;
//     console.log(' this.order', this.orderAmt);
//   });
// this.initializePayment();
// }

removeItem(item:any){
  console.log("item",item);

  this.landingService.removeCartItem(item.modelId).subscribe((res:any)=>{
      alert("item deleted successfully!")
      this.images.next()

  })
}
checkoutOrder(){
  this.landingService.createTransaction(this.checkOutData ).subscribe((res)=>{
    console.log("checkout",res);
      this.checkoutDetail = res;
      this.orderId = this.checkoutDetail.order.id;
      console.log("order_id",this.orderId);
      this.orderAmt = this.checkoutDetail.order.amount;
      this.orderCurrency = this.checkoutDetail.order.currency
      // this.initializePayment();
  },(error)=>{
      console.log(error);

  });


}
  // // ..............
  // initializePayment() {
  //   const option = {

  //     key: 'rzp_test_TJzTN2WSRPKOf1',
  //     amount: this.totalPrice * 100,
  //     currency: 'INR',
  //     order_id: this.orderId,
  //     name: 'My Store',
  //     description: 'Payment for your order',
  //     image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
  //     handler:(response:any)=>{
  //       if(response! = null && response.razorpay_payment_id !=null){
  //         this.processRes(response);
  //       }else{
  //         alert("Payment Failed..")
  //       }
  //     },

  //     callback_url: 'http://localhost:5000/verifyOrder',
  //     prefill: {
  //       name: 'Gaurav Kumar',
  //       email: 'gaurav.kumar@example.com',
  //       contact: '9999999999',
  //     },
  //     notes: {
  //       address: 'Razorpay Corporate Office',
  //     },
  //     theme: {
  //       color: '#121212',
  //     },
  //   };

  //   var razorPayObject = new Razorpay(option);
  //   razorPayObject.open();
  // }

  // processRes(res:any){
  //   console.log("res",res);

  // }
  initializePayment(orderId: string): void {
    const options = {
      key: 'rzp_test_xLCW1I4G9opoDk',
      amount: this.totalPrice * 100,
      currency: 'INR',
      name: 'My Store',
      description: 'Payment for your order',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: orderId, // Use the order_id received from the server
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
      handler: (response: any) => {
        // Handle payment response here
        console.log('Payment response:', response);

        // You don't have direct access to razorpay_signature and razorpay_order_id here
        // You will need to send the response to the server for further verification
        this.sendPaymentResponseToServer(response);
      },
    };

    const razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  sendPaymentResponseToServer(response: any): void {
    // Make a request to your server to verify the signature using the entire payment response
    // You should perform this step on the backend for security reasons
  }

  Order() {
    this.http
      .post('http://localhost:5000/createOrder', this.checkOutData)
      .subscribe((res) => {
        console.log("reskgdsufg",res);

        this.orderId = res;
        this.order = this.orderId.order.id;
        console.log('this.order', this.order);
        this.orderAmt = this.orderId.order.amount;
        console.log(' this.order', this.orderAmt);
      });
    this.initializePayment(this.order);
  }
}
