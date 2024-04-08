import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
  show: any;
  date: Date;
  products: any;
  allProduct: any[] = [];
  images: any;
  image: any;
  createdAt: string = '2023-09-14T11:36:14.707Z'; // Your date string
  formattedDate: any;
  currentDate = new Date();
  orderID: any;
  tokey_key: any;
  userIdd: any;
  dataStore: any;
  productDetails: any;
  productId: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
    private datePipe: DatePipe,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {
    this.date = new Date();
  }
  ngOnInit(): void {
    this.getProductDetail();
    this.route.paramMap.subscribe((params: ParamMap) => {});
  }

  getProductDetail() {
    this.landingService.getProduct().subscribe((res: any) => {
      this.products = res;
      // console.log('this.products ', this.products);
      const data = this.products.data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // console.log('element', element);
        this.orderID = element.orderId;
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

  downloadFile(item: any) {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    this.http
      .get(
        `${environment.apiUrl}/downloadOrder/${this.userIdd}/${this.orderID}/${item.modelId}`,
        {
          responseType: 'blob', // Important!
        }
      )
      .subscribe(
        (data: Blob) => {
          const modelName = item.modelName;
          console.log('modelName', modelName);
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${modelName}.zip`;
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
        },
        (error) => {
          if (error.status == 400) {
            this.toaster.error('Model has already been downloaded');
            // this.router.navigate(['downloads'])
          }
          console.error('Download error:');
        }
      );
  }
  navigateToInvoice(modelId: string) {
    console.log('id', modelId);

    // Navigate to the invoice page with the orderID as a route parameter
    this.router.navigate(['/invoice', modelId]);
  }
}
