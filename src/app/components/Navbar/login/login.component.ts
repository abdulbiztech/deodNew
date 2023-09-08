import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environement';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm!: FormGroup;
  userDetail: any;
  tokey_key:any
  userState:any;
  constructor(
    private http: HttpClient,
    private landgingService:LandingPageService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  login(login:FormGroup) {
    this.http.post<any>(`${environment.apiUrl}`+`/loginUser`,this.myForm.value).subscribe((res)=> {
      this.userState = res;
      const jsonData = JSON.stringify(this.userState)
      console.log("jsonData",jsonData);
      this.tokey_key = this.userState.data
      this.toaster.success('You are successfully Login');
      this.myForm.reset();
      this.router.navigate(['']);
      this.landgingService.loggedIn.next(true);
      localStorage.setItem('login', jsonData);
      // localStorage.setItem('login', 'true');
      }

    );
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokey_key);
    console.log("token getting ehere");

  }
}
