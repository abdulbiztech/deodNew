import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss'],
})
export class ForgetPassComponent {
  myForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  reset(reset: FormGroup) {
    if (this.myForm.valid) {
    this.http
      .post<any>(`${environment.apiUrl}` + `/forgetPassword`, this.myForm.value)
      .subscribe((res) => {
        console.log('reset', res);
        this.toaster.success(
          'We have e-mailed your password reset link!',
          'Success'
        );
        this.router.navigate(['/login']);
      },
      (err)=>{
        console.log("err",err);

        this.toaster.error("Email not found!", "Error");
      });
  }
}
}
