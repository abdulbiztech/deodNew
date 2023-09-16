import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  products: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private landingService: LandingPageService,
  ) {}
  ngOnInit(): void {
    this.getProductDetail();
  }

  getProductDetail(){
    this.landingService.getProduct().subscribe((res)=>{
      console.log("res",res);
    })
  }
}
