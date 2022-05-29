import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {

  companyName:string;

  constructor(private httpService: HttpService, private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getCompanyDetails();
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
