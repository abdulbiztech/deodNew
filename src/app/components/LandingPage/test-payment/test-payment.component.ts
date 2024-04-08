import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-test-payment',
  templateUrl: './test-payment.component.html',
  styleUrls: ['./test-payment.component.scss']
})
export class TestPaymentComponent {
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
    this.showProduct(this.id);
  }
  showProduct(id: any) {
    this.landingService.ShowProductDetail().subscribe((res:any) => {
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
  checkoutHandler(total:any){
    console.log("rfdh",this.total);

  }

}
