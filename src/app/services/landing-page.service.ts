import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LandingPageService {
  onlyToken: any;
  dataStore: any;
  tokey_key: any;
  productId: any;
  userIdd: any;
  useId: any;
  loggedIn = new BehaviorSubject<boolean>(false);
  delete = new Subject<any>();
  constructor(private http: HttpClient, private router: Router) {}
  get loggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  public getCardDetails() {
    return this.http.get(`${environment.apiUrl}` + `/getAll3DModels`);
  }

  public getLoginDetail() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.productId = this.tokey_key._id;
    this.onlyToken = this.tokey_key.token;
    this.userIdd = this.tokey_key.userId;
    console.log('user id', this.userIdd);
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
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.productId = this.tokey_key._id;
    this.onlyToken = this.tokey_key.token;
    this.userIdd = this.tokey_key.userId;
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
    try {
      const loginData = localStorage.getItem('login');

      if (loginData !== null) {
        this.dataStore = JSON.parse(loginData);
        this.useId = this.dataStore.data.userId;
      } else {
        // alert('Please Login first');
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      this.dataStore = {};
    }
    return this.http.get(
      `${environment.apiUrl}` + `/getCart/` + `${this.useId}`
    );
  }

  public removeCartItem(id: any): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}` + `/removeCartItem/` + `${this.useId}/` + id
    );
  }
  public createTransaction(amount: any) {
    return this.http.post(`${environment.apiUrl}` + `/createOrder/`, amount);
  }
  public verifyOrder(res: any) {
    return this.http.post(`${environment.apiUrl}` + `/verifyOrder/`, res);
  }
  emptyCart() {
    console.log('cart is empty');
  }
}
