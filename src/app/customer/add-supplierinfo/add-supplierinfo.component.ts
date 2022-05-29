import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
declare let $: any;
@Component({
  selector: 'app-add-supplierinfo',
  templateUrl: './add-supplierinfo.component.html',
  styleUrls: ['./add-supplierinfo.component.scss']
})
export class AddSupplierinfoComponent implements OnInit {


  supplierInfo:any;
  countryCode='in';
  hasError: boolean;

  @ViewChild('file') fileInput: ElementRef;

  constructor(private router: Router,
    private formBuilder:FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.prepareSupplierForm()
  }

  prepareSupplierForm(){
    this.supplierInfo=this.formBuilder.group({
      supplierName:["",[Validators.required]],
      uniqueCode:["",[Validators.required]],
      paymentTerms:['',[Validators.required]],
      currency:['',[Validators.required]],
      deliveryPeriod:["",[Validators.required]],
      minimumOrderTotal:['',[Validators.required]],
      contactInformation: this.formBuilder.group({
        emailAddress: ['',[Validators.required,Validators.email]],
        phoneNumber: ['',[Validators.required]],
        name: ['',[Validators.required]],
        localAddress: ['',[Validators.required]],
        mobileNumber:['',[Validators.required]],
        businessRegistationNumber:['',[Validators.required]]
      }),
      bankDetails: this.formBuilder.group({
        iban: ['',[Validators.required]],
        accountNumber: ['',[Validators.required]],
        accountHolderName: ['',[Validators.required]],
        bankName: ['',[Validators.required]],
        bankAddress:['',[Validators.required]],
        pan:['',[Validators.required]],
        aba: ['',[Validators.required]],
        swiftBicCode: ['',[Validators.required]],
        ifscCode:['',[Validators.required]],
        sortCode:['',[Validators.required]],
        note:[''],
        purchaseOrderConditions:['']
      }),
      })
  }

  get f() {
    return this.supplierInfo.controls;
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  submit(){
    this.supplierInfo.markAllAsTouched();
    if(this.supplierInfo.valid){
      this.router.navigate(['/customer/supplier-customer-information']);
    }
    else
    {
      const invalidControls = $('form .ng-invalid:not(div)');
      const validControls=$('form .ng-valid:not(div)');
      if (invalidControls.length) {
        let accordian: any = invalidControls.closest('.collapse');
        accordian.collapse('show');
        window.scroll({
          top: this.getTopOffset(invalidControls[0]),
          left: 0,
          behavior: 'smooth',
        });
        invalidControls[0].focus();
      }
    }
    
  }

  onError(obj) {
    this.hasError = obj;
  }

  onCountryChange(obj){
    this.countryCode = obj.iso2
  }

    
  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  
}
