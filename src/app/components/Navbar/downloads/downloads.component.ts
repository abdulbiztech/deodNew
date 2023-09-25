import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { environment } from 'src/environments/environement';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  products: any = [];
  receivedData: any;
  images:any;
  checkData:any;
  dataStore:any;
  tokey_key:any;
  userIdd:string | undefined;
  allProduct: any[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
  ) {}
  ngOnInit(): void {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    console.log("this.userIdd",this.userIdd);

    this.landingService.donwnloadApi(this.userIdd).subscribe((result:any)=>{
      console.log("donwload item come here",result);
      this.receivedData = result
      const data = this.receivedData.data;
      this.checkData = data
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const items = element.items
        for (let index = 0; index < items.length; index++) {
          const element1 = items[index];
          this.images = element1.images[0];
          element1.image = `${environment.apiUrl}/image/${this.images}`;
          this.allProduct.push(element1);
        }
        console.log("this.receivedData",this.allProduct);



      }

    })
  }

}
