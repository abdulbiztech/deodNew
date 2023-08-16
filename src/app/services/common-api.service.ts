import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private http: HttpClient) {}


  getAllImages(){
    return this.http.get(`${environment.apiUrl}` + `/getAll3DModels`);
  }
}
