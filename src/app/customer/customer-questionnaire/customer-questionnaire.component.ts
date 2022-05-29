import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PATH } from 'src/app/app.constant';
import { HttpService } from './../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-customer-questionnaire',
  templateUrl: './customer-questionnaire.component.html',
  styleUrls: ['./customer-questionnaire.component.scss']
})
export class CustomerQuestionnaireComponent implements OnInit {
  getCompanyInfo() {
    // throw new Error('Method not implemented.');
  }
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  formSubmitAttempt: boolean = false;
  uploaded: boolean;
  companyInfo:any;
  errorMsg;
  isbranch;
  answers=[];
  infoForm;
  companyId:any;
  step:any;
  id:any; 

  constructor(
    private formBuilder: FormBuilder,
    private httpService:HttpService,
    private router: Router,
    private ar:ActivatedRoute,
    private toastrService: ToastrService,private spinnerService: NgxSpinnerService,) {}

  ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    this.ar.params.subscribe((params)=>{
      this.id=params.id;     
    })
  
    this.getVendorCompanyInfo();
  }

  getVendorCompanyInfo(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_CUSTOMER_COMPANY_INFORMATION + '/' + this.companyId).subscribe((res:any)=>{
    this.companyInfo=res.answers;
    this.spinnerService.hide();
    
     }),
     (error) => {
      this.spinnerService.hide();
      this.toastrService.error(error.message?.error);
    }
  }

  next(){
    this.router.navigate(['customer/view-vendor/4']);
    this.callParent.emit({
        step: 4,
        url: '/customer/view-vendor/2',
      });
  }

  back(){
    this.router.navigate(['/customer/view-vendor/2']);
    this.callParent.emit({
        step: 2,
        url: '/customer/view-vendor/2',
      });
  }
  
}
