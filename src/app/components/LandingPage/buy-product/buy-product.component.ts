import { Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
import { Product } from './buy-product.model';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
})
export class BuyProductComponent implements OnInit {
  mainProduct: Product = new Product();
  ngForm!: FormGroup;
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
  hundred: number = 1000;
  proId: any;
  totalPrice: any;
  checkOutData: any;
  checkoutDetail: any;
  orderCurrency: any;
  paymentId: any;
  signature: any;
  loginCheck: any;
  cartItems: any[] = [];
  cartSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private landingService: LandingPageService,
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getCartByUserId();
    this.isLoggedIn();
  }
  isUserAuthenticated() {
    return this.landingService.isAuthenticated();
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('login') !== null;
  }
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
  getCartByUserId(): void {
    this.cartSubscription = this.landingService.getCartByUserId().subscribe(
      (res: any) => {
        this.cartItems = res.data.items;
        this.totalPrice = res.data.totalPrice;
        this.checkOutData = { amount: this.totalPrice };
        this.images = this.cartItems.map((item) => ({
          ...item,
          imageUrl: `${environment.apiUrl}/image/${item.images[0]}`,
        }));
      },
      (error) => {
        console.error('Error fetching cart:', error);
        this.toaster.error('Failed to fetch cart items');
      },
      () => {
        // Recalculate total price here
        this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
        this.checkOutData = { amount: this.totalPrice };
      }
    );
  }


  removeItem(modelId: any): void {
    this.landingService.removeCartItem(modelId).subscribe(
      (res: any) => {
        this.cartItems = res.data.items;
        console.log('this.cartItem', this.cartItems);
        this.toaster.success('Item deleted successfully');
        this.images = this.cartItems.map((item) => ({
          ...item,
          imageUrl: `${environment.apiUrl}/image/${item.images[0]}`,
        }));

        // Recalculate total price after item removal
        this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
        this.checkOutData = { amount: this.totalPrice };
      },
      (error) => {
        console.error('Error removing item from cart:', error);
        this.toaster.error('Failed to remove item from cart');
      }
    );
  }


  checkoutOrder(): void {
    this.landingService.createTransaction(this.checkOutData).subscribe(
      (res: any) => {
        console.log('Checkout response:', res);
        // Handle successful checkout
      },
      (error) => {
        console.error('Error during checkout:', error);
        this.toaster.error('Failed to initiate checkout process');
      }
    );
  }

  initializePayment(orderId: string): void {
    const options = {
      key: 'rzp_test_xLCW1I4G9opoDk',
      amount: this.totalPrice,
      currency: 'INR',
      name: 'My Store',
      description: 'Payment for your order',
      image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
      order_id: orderId,
      prefill: {
        name: 'Test',
        email: 'test@example.com',
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
        this.orderId = response.razorpay_order_id;
        this.signature = response.razorpay_signature;
        this.landingService.verifyOrder(response).subscribe(
          (verificationResponse: any) => {
            console.log(
              'verificationResponse.success',
              verificationResponse.success
            );

            if (verificationResponse.success) {
              console.log(
                'Order verification successful:',
                verificationResponse
              );
              this.router.navigate(['/success-payment'], {
                queryParams: { reference: this.paymentId },
              });
            } else {
              console.log('Order verification failed:', verificationResponse);
              console.error('Verification Response:', verificationResponse);
            }
          },
          (error) => {
            console.error('Error verifying order:', error);
          }
        );
      },
    };

    const razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  Order() {
    this.http
      .post('http://localhost:8080/createOrder', this.checkOutData)
      .subscribe((res) => {
        console.log('createOrder response', res);
        this.orderId = res;
        this.order = this.orderId.order.id;
        this.orderAmt = this.orderId.order.amount;
        this.initializePayment(this.order);
      });
  }
}
