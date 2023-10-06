import { Component, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/services/landing-page.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  dataStore:any;
  userEmail:any;
  userPass:any;
  constructor(private landingService:LandingPageService){}
  ngOnInit(): void {
    this.landingService.getUserDetail().subscribe((res)=>{
      this.dataStore = res
      const data = this.dataStore.data
      this.userEmail = data.email;
      this.userPass = data.password;
    });
  }
}
