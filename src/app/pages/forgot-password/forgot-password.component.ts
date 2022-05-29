import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.service';

import { businessEmail, email } from 'src/app/services/custom.validations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formSubmitAttempt: boolean = false;
  isForgotPass:boolean=false;
  errorMsg: any;

  constructor( private formBuilder: FormBuilder,private httpService:HttpService, 
    private spinnerService: NgxSpinnerService, private toastrService:ToastrService,) { }
  public forgotPassword = this.formBuilder.group({
    userName: ['', [Validators.required,email]],
  });

  ngOnInit(): void {
  }
  get f() {
    return this.forgotPassword.controls;
  }
  
  sendForgot(){
    this.formSubmitAttempt=true;
    if(this.forgotPassword.invalid){
      return;
    }else{
      let userName= this.forgotPassword.value
      this.spinnerService.show();
      this.httpService.getData(PATH.GET_USER_FORGOT_PASSWORD + userName.userName ).subscribe((res)=>{
        this.isForgotPass=true;
        this.spinnerService.hide();
      },(err) => {
        console.log(err.error.message);
        this.spinnerService.hide();
        this.errorMsg = err.error.message;
        this.toastrService.error(this.errorMsg);
      });
      this.formSubmitAttempt=false;
      // this.forgotPassword.reset()
    }
  }

}
