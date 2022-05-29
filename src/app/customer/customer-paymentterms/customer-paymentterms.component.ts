import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPaymenttermsComponent } from '../add-paymentterms/add-paymentterms.component';
@Component({
  selector: 'app-customer-paymentterms',
  templateUrl: './customer-paymentterms.component.html',
  styleUrls: ['./customer-paymentterms.component.scss']
})
export class CustomerPaymenttermsComponent implements OnInit {

 
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers:any;
  companyContracts: Array<any>=[
    {
      supplierName: 'Sealinks',prePayments:'45%',postPayments:'55%',creditPeriods:'45 Days',active:'Yes'
    },
    {
      supplierName: 'Sealinks',prePayments:'45%',postPayments:'55%',creditPeriods:'45 Days',active:'Yes'
    },
    {
      supplierName: 'Sealinks',prePayments:'45%',postPayments:'55%',creditPeriods:'45 Days',active:'Yes'
    },
    {
      supplierName: 'Sealinks',prePayments:'45%',postPayments:'55%',creditPeriods:'45 Days',active:'Yes'
    },
  ];
  constructor(
    private router: Router,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.prepareHeaders();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'supplierName', header: 'Supplier Name', sort:false,isAsc:true},
      { name: 'prePayments', header: 'Pre Payments', sort: false,isAsc:false},
      { name: 'postPayments', header: 'Post Payments', sort: false,isAsc:false},
      { name: 'creditPeriods', header: 'Credit Periods', sort: false,isAsc:false},
      { name: 'active', header: 'Active', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];
  }

  openPaymentTerms(data,type){
    if(type=='Add'){
      const modalRef= this.modalService.open(AddPaymenttermsComponent,{centered:true})
      modalRef.componentInstance.type = 'Add';
      modalRef.componentInstance.data='';

    }
    if(type=='Edit')
    {
      const modalRef= this.modalService.open(AddPaymenttermsComponent,{centered:true})
      modalRef.componentInstance.type = 'Edit';
      modalRef.componentInstance.data=data;modalRef.componentInstance.paymentTerms.subscribe((res)=>{
      });
    }
    if(type=='View')
    {
      const modalRef= this.modalService.open(AddPaymenttermsComponent,{centered:true})
      modalRef.componentInstance.type = 'View';
      modalRef.componentInstance.data=data;
      modalRef.componentInstance.paymentTerms.subscribe((res)=>{
        
      });
    }

  }


}
