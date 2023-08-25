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
  paymentId:any;
  signature:any;
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
      this.mainProduct.items = this.mainProduct.cartId.items
      for (let index = 0; index < this.mainProduct.items.length; index++) {
        const element = this.mainProduct.items[index];
        const imagesfirst = this.mainProduct.items[index].images[0];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        const allsubData = this.mainProduct.items[index];
        this.newData = { ...allsubData, imageUrl: this.image };
        this.images.push(this.newData);
      }

    });
  }

  // placeOrder(ngForm: FormGroup) {
  //   console.log("data coming",ngForm.value);
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
  },(error)=>{
      console.log(error);
  });
}

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
        console.log('Payment response:', response);
        this.paymentId = response.razorpay_payment_id;
        console.log("this.paymentId",this.paymentId);
        this.orderId = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
        this.landingService.verifyOrder(response).subscribe(
          (verificationResponse: any) => {
            if (verificationResponse.success) {
              console.log("Order verification successful:", verificationResponse);
              this.router.navigate(['/success-payment'], { queryParams: { reference: this.paymentId } });
            } else {
              console.log("Order verification failed:", verificationResponse);
            }
          },
          (error) => {
            console.error("Error verifying order:", error);
            // Handle error, show an error message
          }
        );
      },
    };

    const razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  // sendPaymentResponseToServer(response: any): void {
  // }

  Order() {
    this.http
      .post('http://localhost:8080/createOrder', this.checkOutData)
      .subscribe((res) => {
        console.log("reskgdsufg", res);
        this.orderId = res;
        this.order = this.orderId.order.id;
        console.log('this.order', this.order);
        this.orderAmt = this.orderId.order.amount;
        console.log('this.order', this.orderAmt);
        this.initializePayment(this.order);
      });
  }
  
  
}
