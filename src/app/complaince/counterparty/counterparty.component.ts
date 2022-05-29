import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counterparty',
  templateUrl: './counterparty.component.html',
  styleUrls: ['./counterparty.component.scss']
})
export class CounterpartyComponent implements OnInit {

  headers:any;
  location:any;
  tableShow:boolean=false;

  vendors: Array<any>=[
    {
      name: 'Sealinks',location:'Singapore'
    },
    {
      name: 'Sealinks Shipping',location:'Japan'
    },
    {
      name: 'Seaways Shipping',location:'Russian'
    },
    {
      name: 'Sea Bear Shipping',location:'Brazil'
    },

  ];

  constructor() { }

  ngOnInit(): void {
    this.location=[
      {name: 'Location'}
    ]
    this.prepareHeaders();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'name', header: 'Name', sort:false,isAsc:true},
      { name: 'location', header: 'Location', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];

  }

  showTable(){
    this.tableShow=true
  }
}
