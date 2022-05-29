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
@Component({
  selector: 'app-customer-supplier-customerinfo',
  templateUrl: './customer-supplier-customerinfo.component.html',
  styleUrls: ['./customer-supplier-customerinfo.component.scss']
})
export class CustomerSupplierCustomerinfoComponent implements OnInit {

 
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers:any;
  companyContracts: Array<any>=[
    {
      supplierName: 'Sealinks',uniqueCode:'DG56R778J737',address:'SFO-2, 3rd floor, sec-2 mumbai, India',contactNumber:'(+91)8342123231'
    },
    {
      supplierName: 'Sealinks',uniqueCode:'DG56R778J737',address:'SFO-2',contactNumber:'(+91)8342123231'
    },
    {
      supplierName: 'Sealinks',uniqueCode:'DG56R778J737',address:'SFO-2',contactNumber:'(+91)8342123231'
    },
    {
      supplierName: 'Sealinks',uniqueCode:'DG56R778J737',address:'SFO-2',contactNumber:'(+91)8342123231'
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
    private confirmationService:ConfirmationService
  ) { }

  ngOnInit(): void {
    this.prepareHeaders();
    // this.companyContracts=[];
    if(this.companyContracts.length==0){
      this.router.navigate(['/customer/Add-supplier-info']);
    }
  }

  prepareHeaders(){
    this.headers = [
      { name: 'supplierName', header: 'Supplier Name', sort:false,isAsc:true},
      { name: 'uniqueCode', header: 'Unique Code', sort: false,isAsc:false},
      { name: 'address', header: 'Address', sort: false,isAsc:false},
      { name: 'phoneNumber', header: 'Phone Number', sort: false,isAsc:false},
      { name: 'action', header: 'Action', sort: false,isAsc:false}
    ];
  }

}
