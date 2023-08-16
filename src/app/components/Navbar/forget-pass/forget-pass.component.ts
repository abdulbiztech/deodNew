import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {
  myForm!: FormGroup;
constructor(private http: HttpClient,private router: Router,private fb: FormBuilder,private toaster: ToastrService){}
ngOnInit() {
  this.myForm = this.fb.group({
    email: [''],
  });
}
  reset(reset:FormGroup){
    this.http.post<any>(`${environment.apiUrl}`+`/forgetPassword`,this.myForm.value).subscribe((res)=>{
      console.log("reset", res);
      this.toaster.success('Password reset email sent!', 'Success');
    })
  }
}
