import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss'],
})
export class BuyProductComponent implements OnInit {
  ngForm:FormGroup |undefined
  id: any;
  productDetail: any;
  product: any;
  productImages: any;
  newImageData: any;
  productImage: any;
  cartProductImages: any = [];
  image: any = [];
  images: any = [];
  newData: any = [];
  date: any;
  productDate: any;
  latest_date: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    public datepipe: DatePipe,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.showProduct(this.id);
    this.ngForm = this.fb.group({
      firstName: [''],
      lastName: [''],
    })
  }

  showProduct(id: any) {
    this.landingService.ShowProductDetail().subscribe((res) => {
      this.product = res;
      this.productDetail = this.product.data.carts;
      this.productDate = this.productDetail.updatedAt;
      this.productDate = new Date().toLocaleDateString();
      for (let index = 0; index < this.productDetail.length; index++) {
        const imagesfirst = this.productDetail[index].imageUrls[0];
        const allsubData = this.productDetail[index];
        this.image = `${environment.apiUrl}/image/${imagesfirst}`;
        this.newData = { ...allsubData, imageUrl: this.image };
        this.images.push(this.newData);
        console.log('images', this.images);
      }
    });
  }

  public placeOrder(orderForm:NgForm){}
}
