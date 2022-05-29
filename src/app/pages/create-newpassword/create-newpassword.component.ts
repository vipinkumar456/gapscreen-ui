import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AppCookieService } from 'src/app/services/cookieService';
import { ConfirmedValidator } from 'src/app/services/custom.validations';
@Component({
  selector: 'app-create-newpassword',
  templateUrl: './create-newpassword.component.html',
  styleUrls: ['./create-newpassword.component.scss']
})
export class CreateNewpasswordComponent implements OnInit {

  formSubmitAttempt: boolean = false;
  password='password';
  show:boolean = false;
  error: boolean = false;
  errorMsg: string = '';
  verificationCode;
  reTypepassword='password';
  showReType:boolean=false;

  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private appCookieService:AppCookieService,
  private toastrService: ToastrService, private httpService:HttpService, private spinnerService: NgxSpinnerService,) { }
  public resetPasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    retypePassword: ['', Validators.required],
  },{
    validator:ConfirmedValidator('password','retypePassword')
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.verificationCode = params.code;
      this.appCookieService.set('digiToken', this.verificationCode);
    }
  );
  }
  get f() {
    return this.resetPasswordForm.controls;
  }



  sendForgot(){
    this.formSubmitAttempt=true;
    if(this.resetPasswordForm.invalid){
      return;
    }else{
      this.spinnerService.show();
      let payload = this.resetPasswordForm.value;
      
      this.httpService.patchData(PATH.FORGOT_PASSWORD,payload).subscribe((res)=>{
        this.spinnerService.hide();
        this.toastrService.success('Password Reset Successfully!');
        this.router.navigate(['/login'])
        this.formSubmitAttempt=false;
        this.resetPasswordForm.reset()
      },(err) => {
        this.spinnerService.hide();
        this.error = true;
        this.errorMsg = err.message.message;
        this.toastrService.error(this.errorMsg);
      })
    }
  }

  viewPassword() {

    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  viewRePassword() {
    if (this.reTypepassword === 'password') {
      this.reTypepassword = 'text';
      this.showReType = true;
    } else {
      this.reTypepassword = 'password';
      this.showReType = false;
    }
  }


}
