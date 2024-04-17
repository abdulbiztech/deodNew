import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
})
export class DownloadsComponent implements OnInit {
  products: any = [];
  receivedData: any;
  images: any;
  checkData: any;
  dataStore: any;
  tokey_key: any;
  userIdd!: string;
  allProduct: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService
  ) {}
  ngOnInit(): void {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    console.log('this.userIdd', this.userIdd);
    this.landingService
      .getAllUserDownload(this.userIdd)
      .subscribe((res: any) => {
        console.log('Download response:', res);
        if (res && res.status && Array.isArray(res.data)) {
          this.allProduct = res.data;
          console.log("this.allProduct",this.allProduct);

        } else {
          // Handle the case where res does not have the expected structure
          console.error('Invalid response format:', res);
        }
      });
  }
}
