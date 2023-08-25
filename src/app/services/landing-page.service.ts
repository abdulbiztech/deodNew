import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  onlyToken: any;
  dataStore: any;
  tokey_key: any;
  productId: any;
  userIdd: any;
  // private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {
    this.getLoginDetail();
  }

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }
  // login(){
  //     this.loggedIn.next(true);
  // }

  // logout() {
  //   this.loggedIn.next(false);
  // }
  public getCardDetails() {
    return this.http.get(`${environment.apiUrl}` + `/getAll3DModels`);
  }

  public getLoginDetail() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.productId = this.tokey_key._id;
    this.onlyToken = this.tokey_key.token;
    this.userIdd = this.tokey_key.userId;
    // console.log("user id",this.userIdd);
  }
  public logoutFun() {
    const headers = new HttpHeaders({
      Authorization: `${this.onlyToken}`,
    });
    return this.http.post(`${environment.apiUrl}` + `/logOut`, null, {
      headers,
    });
  }
  public cartProduct(id: any) {
    const headers = new HttpHeaders()
      .set('Authorization', ` ${this.userIdd}`)
      .set('Content-Type', 'application/json');
    const requestBody = {
      modelId: id,
    };
    return this.http.post(
      `${environment.apiUrl}` + `/addToCart/` + `${this.userIdd}`,
      requestBody
    );
  }

  public getCartByUserId() {
    return this.http.get(
      `${environment.apiUrl}` + `/getCart/` + `${this.userIdd}`
    );
  }

  public removeCartItem(id: any) {
    return this.http.delete(
      `${environment.apiUrl}` + `/removeCartItem/` + `${this.userIdd}/` + id
    );
  }
  public createTransaction(amount: number) {
    return this.http.post(`${environment.apiUrl}` + `/createOrder/`, amount);
  }
  public verifyOrder(res:any) {
    return this.http.post(`${environment.apiUrl}` + `/verifyOrder/`, res);
  }
  // public TotalAmout() {
  //   this.ShowProductDetail();
  //   console.log();
  // }
  // public deleteProduct(id: any) {
  //   const apiUrl =
  //     `${environment.apiUrl}` + `/deleteCart/` + `${this.productId}`;
  //   this.getLoginDetail();
  //   const body = {
  //     cartId: id,
  //   };
  //   return this.http.post(apiUrl, body);
  // }
}
