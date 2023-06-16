import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  onlyToken: any;
  dataStore: any;
  tokey_key: any;
  productId: any;

  constructor(private http: HttpClient, private router: Router) {}

  public getCardDetails() {
    return this.http.get(`${environment.apiUrl}` + `/getAllImages`);
  }

  public getLoginDetail(){
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    const getID = JSON.parse(this.dataStore).data;
    this.productId = getID.checkValidUser._id;
    this.onlyToken = this.tokey_key.token;
  }
  public logoutFun() {
    this.getLoginDetail();
    const headers = new HttpHeaders({
      Authorization: `${this.onlyToken}`,
    });
    return this.http.post(`${environment.apiUrl}` + `/logOut`, null, {
      headers,
    });
  }
  public cartProduct(id: any) {
    this.getLoginDetail();
    // console.log('this.token', this.onlyToken);

    const headers = new HttpHeaders()
      .set('Authorization', ` ${this.onlyToken}`)
      .set('Content-Type', 'application/json');
    const requestBody = {
      productId: id,
    };
    return this.http.post(`${environment.apiUrl}` + `/addToCart`, requestBody, {
      headers,
    });
  }

  public ShowProductDetail() {
    this.getLoginDetail();
    // console.log('thisproduct id', this.productId);
    return this.http.get(
      `${environment.apiUrl}` + `/getUserBy/` + `${this.productId}`
    );
  }
  public deleteProduct(id: any) {
    const apiUrl =
      `${environment.apiUrl}` + `/deleteCart/` + `${this.productId}`;
    this.getLoginDetail();
    const body = {
      cartId: id,
    };
    return this.http.post(apiUrl, body);
  }
  public TotalAmout() {
    this.ShowProductDetail();
    console.log();
  }
  public createTransaction(amount: number) {
    return this.http.post(`${environment.apiUrl}` + `/createOrder/`, amount);
  }
  public verifyOrder(amount: number) {
    return this.http.post(`${environment.apiUrl}` + `/verifyOrder/`, amount);
  }
}
