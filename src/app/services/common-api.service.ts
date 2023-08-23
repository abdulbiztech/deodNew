import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environement';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  constructor(private http: HttpClient) {

  }
  getProducts(){
    return this.productList.asObservable();
  }


}
