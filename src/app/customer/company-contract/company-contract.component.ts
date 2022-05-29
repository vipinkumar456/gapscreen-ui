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
import { Observable, observable, Subscriber } from 'rxjs';
import { map, subscribeOn } from 'rxjs/operators';
import {filter} from 'rxjs/operators';
@Component({
  selector: 'app-companycontract',
  templateUrl: './company-contract.component.html',
  styleUrls: ['./company-contract.component.scss']
})
export class CompanycontractComponent implements OnInit {

 
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers:any;
  companyContracts: Array<any>=[
    {
      supplier: 'Amit Soni',contactNumber:'(+91)8342123231',startDate:'10 Dec 2021',expirationDate:'09 Dec 2022',note:'It is a long established fact',extendable:'Yes'
    },
    {
      supplier: 'Amit Soni',contactNumber:'(+91)8342123231',startDate:'10 Dec 2021',expirationDate:'09 Dec 2022',note:'It is a long established fact',extendable:'Yes'
    },
    {
      supplier: 'Amit Soni',contactNumber:'(+91)8342123231',startDate:'10 Dec 2021',expirationDate:'09 Dec 2022',note:'It is a long established fact',extendable:'Yes'
    },
    {
      supplier: 'Amit Soni',contactNumber:'(+91)8342123231',startDate:'10 Dec 2021',expirationDate:'09 Dec 2022',note:'It is a long established fact',extendable:'Yes'
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
    this.observableExample();
    // this.companyContracts=[];
    if(this.companyContracts.length==0){
      this.router.navigate(['/vendorcontract/createcontract']);
    }
  }

  observableExample(){
    let promisearray=[{ name:'promisearray',phone:'12' },
    { name:'v',phone:'12' },
    { name:'v',phone:'12' }]
    const promise=new Promise(resolve=>{
      setInterval(()=>{
        // resolve('promise working');
        resolve(promisearray);
      },1000)
    })

    promise.then(res=>{
    

    })
    const observable=new Observable(subscribe=>{
      let array=[{ name:'v',phone:'12' },
      { name:'v',phone:'12' },
      { name:'v',phone:'12' }]
      setInterval(()=>{
       
        array.map(res=>{
          res.name='abc';
        })
      })
      subscribe.next(array);
      //  subscribe.next('observable1 working');
      //  subscribe.next('observable2 working');
    })
    observable.pipe(map(res=>{ 
      return res 
      }))
    .subscribe(res=>{
      
    })
  }

  prepareHeaders(){
    this.headers = [
      { name: 'supplier', header: 'Supplier', sort:false,isAsc:true},
      { name: 'contactNumber', header: 'Contact Number', sort: false,isAsc:false},
      { name: 'startDate', header: 'Start Date', sort: false,isAsc:false},
      { name: 'expirationDate', header: 'Expiration Date', sort: false,isAsc:false},
      { name: 'note', header: 'Note', sort: false,isAsc:false},
      { name: 'extendable', header: 'Extendable', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];
  }

}
