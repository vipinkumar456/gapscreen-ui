import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-risk',
  templateUrl: './customers-risk.component.html',
  styleUrls: ['./customers-risk.component.scss']
})
export class CustomersRiskComponent implements OnInit {

  companyNames:any=[
    {name:'Sealinks'}, {name:'Searoad'}, {name:'Seaways Shipping'}, {name:'Sea Bear Shipping'}, {name:'Seaborne Freight Inc.'},
    {name:'Valiant'}, {name:'Islander'}, {name:'kings Ferry'}, {name:'Oceanlink Express'}, {name:'Kings Ferry'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
