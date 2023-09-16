import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
// import { confirmPasswordValidator } from './confirm-password.validator';
@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss'],
})
export class NewPassComponent implements OnInit {
//   userId: any;
//   user: any;
//   newPassword: any;
//   cnfPassword: any;
//   token1: any;
//   token: any;
//   password: string = '';
//   confirmPassword: string = '';
//   myForm!: FormGroup;

//   constructor(
//     private activatedRoute: ActivatedRoute,
//     private http: HttpClient,
//     private router: Router,
//     private fb: FormBuilder,
//     private toaster: ToastrService
//   ) {}
//   ngOnInit(): void {
//     this.myForm = this.fb.group(
//       {
//         password: [''],
//         confirmPassword: [''],
//       }
//     );
//     this.activatedRoute.params.subscribe((val) => {
//       this.userId = val['userId'];
//       let token = val['token'];
//       this.token = token.replace(/ /g, '+');
//       console.log('this.userId', this.userId);
//       console.log('this.token', this.token);
//     });
//   }
//   reset() {
//     this.user = this.userId;
//     this.newPassword = this.myForm.value.pasword;
//     this.cnfPassword = this.myForm.value.confirmPassword;
//     this.token1 = this.token;
//     const requestBody = {
//       password:this.newPassword,
//       confirmPassword:this.cnfPassword,
//       token: this.token1,
//     };

//     this.http
//       .post<any>(
//         `${environment.apiUrl}` + `/reset-password/${this.user}`,
//         requestBody
//       )
//       .subscribe((res) => {
//         console.log('reset', res);
//       });
//   }
// }

///////////////new code
myForm!: FormGroup;
userId: any;
token: any;
user: any;
newPassword: any;
cnfPassword: any;
token1: any;

constructor(
  private fb: FormBuilder,
  private activatedRoute: ActivatedRoute,
  private http: HttpClient,
  private toaster: ToastrService,
  private router:Router
) {}

ngOnInit() {
  this.myForm = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    // {
    //   validator: confirmPasswordValidator("password", "confirmPassword")
    // }
  );

  this.activatedRoute.params.subscribe((val) => {
    this.userId = val['userId'];
    let token = val['token'];
    this.token = token.replace(/ /g, '+');
    console.log('this.userId', this.userId);
    console.log('this.token', this.token);
  });
}

reset() {
  this.user = this.userId;
  this.newPassword = this.myForm.value.password;
  this.cnfPassword = this.myForm.value.confirmPassword;
  this.token1 = this.token;

  const requestBody = {
    password: this.newPassword,
    cnfPassword: this.cnfPassword,
    verifyToken: this.token1,
  };

  this.http
    .post<any>(
      `${environment.apiUrl}/reset-password/${this.user}`,
      requestBody
    )
    .subscribe(
      (res:any) => {
        console.log('Reset successful', res);
        if (res.status === true) {
          this.toaster.success("Your password has been changed successfully!");
          this.router.navigate(['/login']);
        } else {
          console.log("Something went wrong");
        }
      },
      (error) => {
        console.error('Reset failed', error);
        // Handle errors and provide feedback to the user
      }
    );
}
}

// Validator function for matching password and confirmPassword
function confirmPasswordValidator(passwordKey: string, confirmPasswordKey: string) {
return (group: FormGroup) => {
  const password = group.controls[passwordKey];
  const confirmPassword = group.controls[confirmPasswordKey];

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    confirmPassword.setErrors(null);
  }
};
}
