import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './company-info.component.html',
})
export class CompanyInfo implements OnInit {
  style = 'width: 15%';
  progress = 15;
  user: any = {};
  companyInfo:string;
  message = 'YOU ARE IN STEP 1';
  companyName:any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private appCookieService: AppCookieService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/vendor/vendor-info') {
      this.style = 'width: 15%';
      this.message = 'YOU ARE IN STEP 1';
      this.progress = 0;
    } else {
      this.progress = 100;
      this.style = 'width: 100%';

      this.message = 'COMPLETED';
    }
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    if (this.router.url == '/vendor/vendor-info') {
      this.getCompanyInfo(this.user);
      this.style = 'width: 10%';
      this.progress = 10;
    } else {
      this.progress = 100;
      this.message = 'COMPLETED';
      this.style = 'width: 100%';
    }
    this.getCompanyDetails()
  }

  goTo() {
    // if ((this.message == 'COMPLETED')) {
    //   this.router.navigate(['admin', 'users']);
    // } else {
      this.router.navigate(['vendor', 'vendor-info',1]);
    // }
  }

  goHome(){
    this.router.navigate(['admin', 'dashboard']);
  }
  
  getCompanyInfo(user) {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe(
        (res: any) => {
          this.spinnerService.hide();
          this.router.navigate(['vendor', 'vendor-info', res.step]);
          localStorage.setItem('dashboardStep', res.step);
          // this.toastrService.success('Company Information Updated Successfully');
        },
        (error) => {
          this.spinnerService.hide();
          // this.toastrService.error(error.message?.error);
        }
      );
  }

  getCompanyDetails(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_VENDOR_DETAILS).subscribe((res: any) => {
      this.companyName = res.name;
      this.spinnerService.hide();
    },(error) => {
          this.spinnerService.hide();
    })
  }

}
