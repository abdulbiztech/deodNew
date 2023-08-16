import { Injectable } from '@angular/core';
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
  userIdd:any
  // public cartItemList : any =[]
  private loggedIn = new BehaviorSubject<boolean>(false);
  // public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient, private router: Router) {}
  // getProducts(){
  //   return this.productList.asObservable();
  // }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  login(){
      this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }
  public getCardDetails() {
    return this.http.get(`${environment.apiUrl}` + `/getAll3DModels`);
  }


  public getLoginDetail(){
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.productId = this.tokey_key._id;
    this.onlyToken = this.tokey_key.token;
    this.userIdd = this.tokey_key.userId
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
    const headers = new HttpHeaders()
      .set('Authorization', ` ${this.userIdd }`)
      .set('Content-Type', 'application/json');
    const requestBody = {
      modelId: id,
    };
    return this.http.post(`${environment.apiUrl}` + `/addToCart/`+`${this.userIdd}`,requestBody)
  }

public getCartByUserId(){
  return this.http.get(`${environment.apiUrl}` + `/getCart/`+`${this.userIdd}`);
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

  public removeCartItem(id:any){
    return this.http.delete(`${environment.apiUrl}` + `/removeCartItem/`+`${this.userIdd}/`+id);
    // this.productList.next(this.cartItemList);
  }

}
