import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-customer-casemanagment',
  templateUrl: './customer-casemanagment.component.html',
  styleUrls: ['./customer-casemanagment.component.scss']
})
export class CustomerCasemanagmentComponent implements OnInit {

  
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers:any;
  caseManagements: Array<any>=[
    {
      supplier: 'Amit Soni',referenceNumber:'12345',date:'10 Dec 2021',note:'It is a long established fact'
    },
    {
      supplier: 'Amit Soni',referenceNumber:'12345',date:'10 Dec 2021',note:'It is a long established fact'
    },
    {
      supplier: 'Amit Soni',referenceNumber:'12345',date:'10 Dec 2021',note:'It is a long established fact'
    },
    {
      supplier: 'Amit Soni',referenceNumber:'12345',date:'10 Dec 2021',note:'It is a long established fact'
    },
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.prepareHeaders()
  }

  prepareHeaders(){
    this.headers = [
      { name: 'date', header: 'Date', sort:false,isAsc:true},
      { name: 'supplier/customer', header: 'Supplier/Customer', sort: false,isAsc:false},
      { name: 'referencenumber', header: 'Reference Number', sort: false,isAsc:false},
      { name: 'note', header: 'Note', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];
  }

  addCase(){
    this.router.navigate(['/customer','add-case-managment']);
  }


}
