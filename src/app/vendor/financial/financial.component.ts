import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.scss']
})
export class FinancialComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
    locationheaders: Array<any>;
  numberOfElements:any;
  constructor() { }

  ngOnInit(): void {
    this.prepareHeader();

  }


  locationData: Array<any> = [
    {particular: ' Particular',first:'30-06-2020',financial:'30-06-2021',currency:'30-06-2022', current:'(Currency USD)' },
    {particular: ' Stocks',first:'30-06-2020',financial:'30-06-2021',currency:'30-06-2022',},
    {particular: 'Debtors',first:'',financial:'30-06-2021',currency:'30-06-2022',},
    {particular: 'Cash & Cash Equivalent',first:'30-06-2020',financial:'30-06-2021',currency:'30-06-2022',},
    {particular: 'Other Current Assets',first:'30-06-2020',financial:'',currency:'30-06-2022',},
    {particular: ' Current Assets',first:'5,90,29,310',financial:'7,43,09,022',currency:'10,41,93,200',},
    {particular: 'Intengible Fixed Assets',first:'3,90,29,310',financial:'',currency:'5,90,29,310',},
    {particular: 'Intengible Fixed Assets',first:'3,90,29,310',financial:'',currency:'5,90,29,310',},
    {particular: 'Tengible Fixed Assets',first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: 'Other Fixed Assets' , span: '(Incl Financial Fixed Assets)',first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: ' Fixed Assets' ,first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: 'Total Assets' , first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: ' Capital' ,first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: 'Other Shareholders Fund' , span: '(Incl Reserves)',first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: ' Shareholders Fund',first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: ' Loan',first:'',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: ' Creditors',first:'2,90,29,310',financial:'',currency:'5,90,29,310',},
    {particular: 'Other Current Liabilities',first:'2,90,29,310',financial:'10,90,29,310',currency:'5,90,29,310',},
    {particular: 'Current Liabilities',first:'6,90,29,310',financial:'5,90,29,310',currency:'7,90,29,310',},
    {particular: 'Non Current Liabilities',first:'6,90,29,310',financial:'5,90,29,310',currency:'7,90,29,310',},
    {particular: 'Total Shareholders Funds & Liabilities',first:'12,90,29,310',financial:'39,90,29,310',currency:'45,90,29,310',},
  ];


    prepareHeader(){
      this.locationheaders = [
        { name: 'particular', header: '', sort: false,isAsc:false},
        { name: 'first', header: '', sort: false,isAsc:false},
        { name: 'financial', header: 'Financial Year', sort: false,isAsc:false},
        { name: 'currency', header: '', sort: false,isAsc:false},
      ];
    }
}
