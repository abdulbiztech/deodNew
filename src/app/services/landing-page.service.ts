import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environement';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';
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
  private cartSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  cart$: Observable<any> = this.cartSubject.asObservable();

  public loggedIn = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient, private router: Router) {
    const userLoggedIn = localStorage.getItem('login');
    this.loggedIn.next(userLoggedIn);
  }
  public getCardDetails(queryParams?: any): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get(`${environment.apiUrl}/getAll3DModels`, { params });
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
  getCartByUserId(): Observable<any> {
    try {
      const loginData = localStorage.getItem('login');
      let userId;

      if (loginData !== null) {
        const dataStore = JSON.parse(loginData);
        userId = dataStore.data.userId;
      } else {
        throw new Error('User not logged in');
      }

      return this.http.get<any>(`${environment.apiUrl}/getCart/${userId}`).pipe(
        tap((cartData) => this.cartSubject.next(cartData)),
        catchError((error) => {
          console.error('Error fetching cart data:', error);
          throw error;
        })
      );
    } catch (error) {
      console.error('Error parsing JSON data:', error);
      throw error;
    }
  }
  private getUserId(): any {
    const loginData = localStorage.getItem('login');
    let userId;

    if (loginData !== null) {
      const dataStore = JSON.parse(loginData);
      userId = dataStore.data.userId;
    } else {
      throw new Error('User not logged in');
    }

    return userId;
  }
public removeCartItem(modelId: any): Observable<any> {
  const userId = this.getUserId();
  const url = `${environment.apiUrl}/removeCartItem/${userId}/${modelId}`;
  return this.http.delete(url).pipe(
    tap(() => {
      this.getCartByUserId().subscribe();
    })
  );
}


  public createTransaction(amount: any) {
    return this.http.post(`${environment.apiUrl}` + `/createOrder/`, amount);
  }
  public verifyOrder(res: any) {
    this.dataStore = localStorage.getItem('login');
    // console.log("this.dataStore",this.dataStore);

    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    return this.http.post(
      `${environment.apiUrl}` + `/verifyOrder/${this.userIdd}`,
      res
    );
  }
  emptyCart() {
    console.log('cart is empty');
  }
  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public getProduct() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    return this.http.get(
      `${environment.apiUrl}` + `/getPyamentBy/${this.userIdd}`
    );
  }
  public getDownload(orderId: string, modelId: string) {
    const url = `${environment.apiUrl}/downloadOrder/${this.userIdd}/${orderId}/${modelId}`;
    return this.http.post(url, null); // Pass null if no request body is needed
  }
  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();
  setData(data: any) {
    this.dataSubject.next(data);
  }
  // API request to get all downloads for a specific user
  public getAllUserDownload(userId: string) {
    const url = `${environment.apiUrl}/getAllUserDownload/${userId}`;
    return this.http.get(url);
  }

  // API request to download a specific order model
  public downloadOrder(userId: string, orderId: string, modelId: string) {
    const url = `${environment.apiUrl}/downloadOrder/${userId}/${orderId}/${modelId}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  searchProducts(queryParams: any): Observable<any> {
    const params = new HttpParams({ fromObject: queryParams });
    return this.http.get(`${environment.apiUrl}/searchFilter?${params}`);
  }
  //GetCard Detail by Model Id Api
  public get3DModelByModelId(item: any) {
    const url = `${environment.apiUrl}/get3DModel/${item}`;
    return this.http.get(url);
  }
  private cardDetailsSubject = new BehaviorSubject<any>(
    this.getStoredCardDetails()
  );
  cardDetails$ = this.cardDetailsSubject.asObservable();
  private getStoredCardDetails(): any {
    const storedData = localStorage.getItem('cardDetails');
    return storedData ? JSON.parse(storedData) : null;
  }
  updateCardDetails(details: any) {
    this.cardDetailsSubject.next(details);
    localStorage.setItem('cardDetails', JSON.stringify(details));
  }
  getUserDetail() {
    this.dataStore = localStorage.getItem('login');
    this.tokey_key = JSON.parse(this.dataStore).data;
    this.userIdd = this.tokey_key.userId;
    const url = `${environment.apiUrl}/getUser/${this.userIdd}`;
    return this.http.get(url);
  }
  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('login');
    return !!authToken;
  }
}
