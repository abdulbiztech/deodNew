import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environement';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})
export class NewPassComponent {

//   myForm!: FormGroup;
// constructor(private http: HttpClient,private router: Router,private fb: FormBuilder,private toaster: ToastrService){}
// ngOnInit() {
//   this.myForm = this.fb.group({
//     password: [''],
//     cnfPassword: [''],
//   });
// }
//   newset(reset:FormGroup){
//     this.http.post<any>(`${environment.apiUrl}`+`/forgetPassword`,this.myForm.value).subscribe((res)=>{
//       console.log("reset", res);
//       this.toaster.success('Password reset email sent!', 'Success');
//     })
//   }
}
