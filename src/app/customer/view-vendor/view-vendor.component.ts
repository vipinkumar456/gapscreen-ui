import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { HttpService } from 'src/app/services/http.service';
import { CustomerUploaddocumentComponent } from '../customer-uploaddocument/customer-uploaddocument.component';
import { CustomerCompanyinformationComponent } from '../customer-companyinformation/customer-companyinformation.component';
import { CustomerQuestionnaireComponent } from '../customer-questionnaire/customer-questionnaire.component';
import { CustomerRegulationComponent } from '../customer-regulation/customer-regulation.component';
import { CustomerEsgComponent } from '../customer-esg/customer-esg.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH } from 'src/app/app.constant';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss']
})
export class ViewVendorComponent implements OnInit {

  private stepper: Stepper;
  step = 1;
  percent = this.step * 20;
  notes;
  notesRes: Array<any> = [];
  items:any;
  companyInfoData;

  @ViewChild(CustomerUploaddocumentComponent) upload: CustomerUploaddocumentComponent;
  @ViewChild(CustomerCompanyinformationComponent)companyInfo: CustomerCompanyinformationComponent;
  @ViewChild (CustomerEsgComponent) esg : CustomerEsgComponent;
  @ViewChild(CustomerQuestionnaireComponent) questions: CustomerQuestionnaireComponent;
  @ViewChild(CustomerRegulationComponent) regulations: CustomerRegulationComponent;
  companyId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpService:HttpService,
    private spinnerService:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    var stepper = document.querySelector('.bs-stepper');
    this.stepper = new Stepper(stepper, {
      linear: true,
      animation: true,
    });
    this.getDefaultCompanyInfo();
    
//     this.items = [{
//       label: 'Personal',
//       routerLink: 'personal'
//   },
//   {
//       label: 'Seat',
//       routerLink: 'seat'
//   },
//   {
//       label: 'Payment',
//       routerLink: 'payment'
//   },
//   {
//       label: 'Confirmation',
//       routerLink: 'confirmation'
//   }
// ];
  }


  stepperMove(data) {
    if (data.step == 1) {
      this.stepper.to(1);
      this.companyInfo.getCompanyInfo();
    } else if (data.step == 2) {
      this.stepper.to(2);
      this.upload.getCompanyInfo();
    } else if (data.step == 3) {
      this.stepper.to(3);
      this.questions.getCompanyInfo(); 

    } else if (data.step == 4) {
      this.stepper.to(4);
      this.esg.getCompanyInfo(); 

    } else {
      this.stepper.to(5);
      this.regulations.getCompanyInfo();
    }
  }

  getCompanyInfo(data) {
    this.stepperMove(data);
    this.step = data.step;
  }


  getDefaultCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION+ '/' + this.companyId).subscribe((res: any) => {
          this.spinnerService.hide();
          this.companyInfoData = res;
          // this.step = res.step;
        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }


 
  back(){
    
    // if(this.router.url == '/customer/view-vendor/5'){
    //   this.router.navigate(['customer/view-vendor/4']);
    // }
    // if(this.router.url == '/customer/view-vendor/4'){
    //   this.router.navigate(['customer/view-vendor/3']);
    // }
    // if(this.router.url == '/customer/view-vendor/3'){
    //   this.router.navigate(['customer/view-vendor/2']);
    // }
    // if(this.router.url == '/customer/view-vendor/2'){
    //   this.router.navigate(['customer/view-vendor/1']);
    // }
    window.history.back();
  }

}
