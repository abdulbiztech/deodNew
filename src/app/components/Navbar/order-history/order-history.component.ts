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
      const data = this.products.data;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const orderId = element.orderId; // Assign orderId here
        this.createdAt = element.createdAt;
        const items = element.items;
        for (let index = 0; index < items.length; index++) {
          const element1 = items[index];
          element1.orderId = orderId; // Assign orderId to each item
          element1.image = `${environment.apiUrl}/image/${element1.images[0]}`;
          this.allProduct.push(element1);
        }
      }
    });
  }

  downloadFile(item: any) {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    const userId = this.tokey_key.userId;
    const orderId = item.orderId;
    const url = `${environment.apiUrl}/downloadOrder/${userId}/${orderId}/${item.modelId}`;

    this.http.get(url, { responseType: 'blob' }).subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${item.modelId}.zip`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      },
      (error) => {
        // if (
        //   error.status == 400 &&
        //   error.error?.message === 'Model has already been downloaded'
        // ) {
          this.toaster.info('Model has already been downloaded');
        // } else {
        //   this.toaster.error('Failed to download the model');
        // }
        console.error('Download error:', error);
      }
    );
  }

  checkDownloadFile(item: any) {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    console.log('this.userIdd', this.userIdd);
    this.landingService
      .getAllUserDownload(this.userIdd)
      .subscribe((res: any) => {
        console.log('Download response:', res);
      });
  }

  navigateToInvoice(modelId: string) {
    console.log('id', modelId);
    this.router.navigate(['/invoice', modelId]);
  }
}
