import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-esg',
  templateUrl: './bank-esg.component.html',
  styleUrls: ['./bank-esg.component.scss']
})
export class BankEsgComponent implements OnInit {

 
  responsiveOptions;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
    locationheaders: Array<any>;
  numberOfElements:any;
  constructor() { 
  }

  ngOnInit(): void {
    this.prepareHeader();
  }


  locationData: Array<any> = [
    {item: 'Do you have an ESG policy and pain in place?', image:'icon icon-tick-circle'},
    {item: 'If yes, do you have a designated person diving day-to day ESG matters?',  image:'icon icon-tick-circle'},
    {item: 'Do you Provide ESG traning to staff', image:'icon icon-tick-circle'},
    {item: 'Do you have an environment policy and targets to improve the company environmental footprint', image:'icon icon-cross-circle'},
    {item: 'Does the company moniter and report its carbon and/or other greenhouse gas emissions', image:'icon icon-tick-circle'},
    {item: 'Has the company conducted a climate change risk assessment to ascertain whether its operations could be at risk from current/evolving climate change regulations', image:'icon icon-tick-circle'},
    {item: 'Does the company have a health and safety policy', image:'icon icon-cross-circle'},
    {item: 'Does the company moniter incident/accidents', image:'icon icon-tick-circle'},
    {item: 'Does the company have a  policy that supports diversity and equal opportunity? ', image:'icon icon-tick-circle'},
    {item: 'Does the company have corporate goveernance defined and mapped? ', image:'icon icon-cross-circle'},
    {item: 'Do you have 1) Audit Commitee 2) Risk Commitee 3) ESG / CSR Committee ', image:'icon icon-tick-circle'},
    {item: 'Does the company have code of Ethics in place? ', image:'icon icon-tick-circle'},
    {item: 'Does the company have a Company Gifts / Corporate Entertainment policy ', image:'icon icon-cross-circle'},
  ];


    prepareHeader(){
      this.locationheaders = [
        { name: 'item', header: 'Items', sort: false,isAsc:false},
        { name: 'answer', header: 'Answer', sort: false,isAsc:false},
      ];
    }

}
