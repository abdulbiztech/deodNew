import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LandingPageService } from 'src/app/services/landing-page.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environement';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  userDetail: any;
  tokey_key: any;
  userState: any;
  errorMessage: string = '';
  constructor(
    private http: HttpClient,
    private landgingService: LandingPageService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.myForm) {
      this.http
        .post<any>(`${environment.apiUrl}` + `/loginUser`, this.myForm.value)
        .subscribe(
          (res) => {
            if (res.status === true) {
              console.log('res message', res.status);
              this.userState = res;
              const jsonData = JSON.stringify(this.userState);
              // console.log("jsonData",jsonData);
              this.tokey_key = this.userState.data;
              this.toaster.success('You are successfully Login');
              this.myForm.reset();
              this.router.navigate(['']);
              this.landgingService.loggedIn.next(true);
              localStorage.setItem('login', jsonData);
              // localStorage.setItem('login', 'true');
            } else {
              alert('something went');
              // Invalid login, show alert message
              // this.errorMessage = res.message;
            }
          },
          (err) => {
            if (err.status == 400) {
              this.toaster.error(err.error.message);
              console.error('An error occurred:', err.error.message);
            }
          }
        );
    } else {
      this.errorMessage = 'Please fill in both email and password fields.';
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokey_key);
    // console.log("token getting ehere");
  }
}
