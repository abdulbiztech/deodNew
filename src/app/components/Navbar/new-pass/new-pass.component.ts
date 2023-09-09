import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { confirmPasswordValidator } from './confirm-password.validator';
@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent implements OnInit {
  userId: any;
  user:any
  newPassword:any;
  cnfPassword:any;
  token1:any
  token: any ;
  password: string = '';
  confirmPassword:string='';
  myForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private router: Router,private fb: FormBuilder,private toaster: ToastrService) {}
  ngOnInit(): void {
  this.myForm = this.fb.group({
    password: [''],
    confirmPassword: [''],
  },{
    validator:confirmPasswordValidator("password","confirmPassword")
  });
  this.activatedRoute.params.subscribe(val=>{
    this.userId= val['userId'];
    let token = val['token']
    this.token= token.replace(/ /g,'+')
    console.log("this.userId",this.userId);
    console.log("this.token",this.token);

  })
  }
  reset(){
    this.user = this.userId
    this.newPassword = this.myForm.value.pasword;
    this.cnfPassword = this.myForm.value.confirmPassword;
    this.token1 = this.token;

    this.http.get<any>(`${environment.apiUrl}`+`/reset-password/${this.user}/${this.token1}`,this.myForm.value).subscribe((res)=>{
    console.log("reset", res);
    // this.toaster.success('Password reset email sent!', 'Success');
    });
    // if(this.myForm.valid){
    //   console.log("Please");

    // }else{
    //   console.log("Please fill the field");

    // }
  }
  // newset(reset:FormGroup){}
  // resetPassword(): void {
  //   if (this.userId && this.token && this.password) {
  //     const requestBody = {
  //       userId: this.userId,
  //       token: this.token,
  //       newPassword: this.password
  //     };
  //     this.http.post(`${environment.apiUrl}` + `/reset-password/:id/:verifyToken`, requestBody)
  //       .subscribe(
  //         (response) => {
  //           console.log('Password reset successful', response);
  //         },
  //         (error) => {
  //           console.error('Password reset failed', error);
  //         }
  //       );
  //   } else {
  //   }
  // }
}
