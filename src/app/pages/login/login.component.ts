import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { noWhitespace } from 'src/app/services/custom.validations';
import { ValidatorsServiceService } from 'src/app/services/validators-service.service';
import { noExtraWhiteSpace } from 'src/app/services/custom.validations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  errorMsg: string = '';
  formSubmitAttempt: boolean = false;
  password='password';
  show = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private appCookieService: AppCookieService,
    private sharedService: SharedService,
    private router: Router,
    public validators:ValidatorsServiceService
  ) {}

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required,noWhitespace]],
    rememberMe: [true],
  });
 
  ngOnInit(): void {
    if (localStorage.getItem('userData')) {
      this.loginForm.patchValue(JSON.parse(localStorage.getItem('userData')));
    }
    this.password = 'password';
  }

  login() {
    this.formSubmitAttempt = true;

    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.get('rememberMe').value) {
      localStorage.setItem('userData', JSON.stringify(this.loginForm.value));
    }
    this.spinnerService.show();
    let payload = this.loginForm.value;
    payload.username=payload.username.toLowerCase();
    payload.username=payload.username.trim();
    this.httpService.postData(PATH.LOGIN,payload).subscribe((res) => {
      this.spinnerService.hide();
      this.appCookieService.set('digiToken', res.token);
      this.appCookieService.set('digiUser', JSON.stringify(res));
      // this.appCookieService.set('digiLogo', JSON.stringify(res.payload.companyLogo));
      this.sharedService.loggedIn(res);
      this.toastrService.success('Login Successfully');
      let role = res.roles[0];
      if (role == 'ROLE_ADMIN') {
        this.router.navigate(['/admin', 'dashboard']);
      }
      if(role == 'ROLE_VENDOR'){
        this.router.navigate(['/vendor', 'vendor-info']);
      }
      if(role == 'ROLE_CUSTOMER'){
        this.router.navigate(['/customer', 'dashboard']);
      }
    },(err) => {
          this.spinnerService.hide();
          this.error = true;
          this.errorMsg = err.message.message;
          this.toastrService.error(this.errorMsg);
        }
      );
  }

  get f() {
    return this.loginForm.controls;
  }

  getCompanyInfo(user) {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          if (!res) {
            this.router.navigate(['/vendor', 'vendor-info']);

            this.spinnerService.hide();
            return;
          }
          this.spinnerService.hide();
          switch (res.step) {
            case 1:
              this.router.navigate(['vendor', 'vendor-info', 'company-info']);
              break;
            case 2:
              this.router.navigate(['vendor', 'vendor-info', 'upload-docs']);
              break;
            case 4:
              this.router.navigate(['vendor', 'vendor-info', 'questionnaire']);
              break;
            case 5:
              this.router.navigate(['vendor', 'vendor-info', 'esg']);
              break;
            case 6:
              this.router.navigate(['vendor', 'vendor-info', 'regulations']);
              break;
            default:
              this.router.navigate(['vendor', 'dashboard']);
              break;
          }
          
          // this.toastrService.success('Company Information Updated Successfully');
        },
        (error) => {
          this.spinnerService.hide();
          
          // this.toastrService.error(error.message?.error);
        }
      );
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }


 

}
