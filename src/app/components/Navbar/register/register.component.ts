import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm!: FormGroup;
  userDetail: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cnfPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }
  signUp() {
    if (this.userForm.valid) {
      this.userDetail = this.userForm.value.email;
      this.http
        .post<any>(`${environment.apiUrl}` + `/createUser`, this.userForm.value)
        .subscribe(
          (res: any) => {
            console.log(res, 'response');
            this.toaster.success('You are successfully signup');
            this.userForm.reset();
            this.router.navigate(['login']);
          },
          (err) => {
            if (err.status == 400) {
              this.toaster.error(err.error.message);
              console.error('An error occurred:', err.error.message);
            }
          }
        );
    }
  }
}
