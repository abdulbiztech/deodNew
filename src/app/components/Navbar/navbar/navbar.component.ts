import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSignedIn: boolean = false;
  isLoggedIn: boolean = false;
  showDropDown: boolean = false;
  tokey_key: any = [];
  dataStore: any;
  onlyToken:any
  productId:any
  tempData:any
  totalItem:any
  constructor(
    private router: Router,
    private http: HttpClient,
    private landingService:LandingPageService){}
    ngOnInit(): void {
      this.getToken();
      this.checkLocalStorageLoginStatus();
    }
    checkLocalStorageLoginStatus() {
      const loginInfo = localStorage.getItem('login');
      if (loginInfo) {
        this.isSignedIn = true;
        this.isLoggedIn = false;
      } else {
        this.isSignedIn = false;
        this.isLoggedIn = true;
      }
    }
    navigateToCart() {
      this.router.navigate(['/login']);
    }
    getToken() {
      this.dataStore = localStorage.getItem('login');
      this.tokey_key = JSON.parse(this.dataStore).data;
      const getID = JSON.parse(this.dataStore).data;
      this.productId = getID.checkValidUser._id
      this.onlyToken = this.tokey_key.token
    }
    Logout() {
      this.landingService.logoutFun().subscribe((response)=>{
        console.log("responses",response);
        alert("User logout successfully")
        localStorage.removeItem('login');
        this.router.navigate(['/']);
        console.log('logout');
      },
      (error) => {
        console.log('Error coming');
      });
    }
}

