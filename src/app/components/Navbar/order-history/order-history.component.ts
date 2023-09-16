import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  show: boolean = false;
  date: Date;
  products: any;
  allProduct:any[] = [];
  images:any;
  image:any;
  createdAt: string = "2023-09-14T11:36:14.707Z"; // Your date string
  formattedDate: any;
  currentDate = new Date();
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    private datePipe: DatePipe
  ) {
    this.date = new Date();
  }
  ngOnInit(): void {
    this.getProductDetail();

  }

  getProductDetail() {
    this.landingService.getProduct().subscribe((res: any) => {
      this.products = res;
      const data = this.products.data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.createdAt = element.createdAt;
        const items = element.items;
        for (let index = 0; index < items.length; index++) {
          const element1 = items[index];
          this.images = element1.images[0];
          element1.image = `${environment.apiUrl}/image/${this.images}`;
          this.allProduct.push(element1);
        }
      }
    });
  }
  redirect(){
    this.router.navigate(['downloads'])
  }
}
