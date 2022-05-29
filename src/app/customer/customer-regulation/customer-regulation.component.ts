import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import {  Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-customer-regulation',
  templateUrl: './customer-regulation.component.html',
  styleUrls: ['./customer-regulation.component.scss']
})
export class CustomerRegulationComponent implements OnInit {
  getCompanyInfo() {
    // throw new Error('Method not implemented.');
  }
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  error: boolean = false;
  errorMsg: string = '';
  companyInfo:any;
  companyInformationId:any;
  status:any;
  remark:any;
  companyId:any;
  display:boolean=false;

    constructor(
      private router: Router,
      private appCookieService:AppCookieService,
      private formBuilder: FormBuilder,
      private toastrService: ToastrService,
      private confirmationService: ConfirmationService,
      private httpService:HttpService, 
      private spinnerService: NgxSpinnerService,) { }
    
    public Form = this.formBuilder.group({
      remark: [""],
    })

    ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    this.getInfo();
  }

  
  getInfo(){
    this.httpService.getData(PATH.GET_CUSTOMER_COMPANY_INFORMATION + '/' + this.companyId ).subscribe((res:any)=>{
    //  this.companyInformationId = res.organizationId;
     this.companyInformationId = res.id;
    }, (error) => {
      this.spinnerService.hide();
      this.toastrService.error(error.message?.error);
    }
  )
  }

  approveData(){
    let remark = this.Form.controls['remark'].value;
    let payload = {};
    this.confirmationService.confirm({
      message: "Are you sure that you want to APPROVE?",
      accept: () => {
        this.spinnerService.show();
        this.httpService
          .patchData(PATH.GET_APPROVE_DATA+'?companyInformationId='+this.companyInformationId + "&remark="+remark + "&status="+'Approved',payload)
          .subscribe(
            (res: any) => {
              this.spinnerService.hide();
              this.toastrService.success('APPROVE Successfully!');
              this.router.navigate(['/customer/invite-customer']);
            },
            (error) => {
              this.spinnerService.hide();
              this.toastrService.error(error.message?.error);
            }
          );
        this.confirmationService.close();
      },
      reject:()=>{
        this.confirmationService.close();
      }
    })
  }


  rejectData(){
    let remark = this.Form.controls['remark'].value;
    let payload = {};
    this.confirmationService.confirm({
      message: "Are you sure that you want to REJECT?",
      accept: () => {
        this.spinnerService.show();
        this.httpService
          .patchData(PATH.GET_APPROVE_DATA+'?companyInformationId='+this.companyInformationId + "&remark="+remark + "&status="+'Rejected',payload)
          .subscribe(
            (res: any) => {
              this.spinnerService.hide();
              this.toastrService.success('REJECT Successfully!');
              this.router.navigate(['/customer/invite-customer']);
            },
            (error) => {
              this.spinnerService.hide();
              this.toastrService.error(error.message?.error);
            }
          );
        this.confirmationService.close();
      },
      reject:()=>{
        this.confirmationService.close();
      }
    })
  }


  back(){
    this.router.navigate(['/customer/view-vendor/4']);
    this.callParent.emit({
        step: 4,
        url: '/customer/view-vendor/4',
      });  
  }

}