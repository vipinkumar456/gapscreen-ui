import { CreateCompanyitemsComponent } from '../create-companyitems/create-companyitems.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicecatalogue',
  templateUrl: './servicecatalogue.component.html',
  styleUrls: ['./servicecatalogue.component.scss']
})
export class ServicecatalogueComponent implements OnInit {

 
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers:any
  catalogues:any=[
    {item:'',name:'DG56R778J737',price:'$231',unit:'872',inactive:'Yes',category:'Category 01',supplier:'Supplier 01',portCentre:'Singapore',itemType:'Item Type'},
    {item:'',name:'DG56R778J282',price:'$322',unit:'6378',inactive:'No',category:'Category 02',supplier:'Supplier 02',portCentre:'Japan',itemType:'Item Type'},
    {item:'',name:'DG56R778J100',price:'$100',unit:'826',inactive:'Yes',category:'Category 03',supplier:'Supplier 03',portCentre:'Russian',itemType:'Item Type'},
    {item:'',name:'DG56R778J899',price:'$192',unit:'911',inactive:'Yes',category:'Category 04',supplier:'Supplier 04',portCentre:'Brazil',itemType:'Item Type'},
    {item:'',name:'DG56R778J811',price:'$331',unit:'219',inactive:'Yes',category:'Category 05',supplier:'Supplier 05',portCentre:'Singapore',itemType:'Item Type'},
    {item:'',name:'DG56R778J111',price:'$231',unit:'112',inactive:'Yes',category:'Category 06',supplier:'Supplier 06',portCentre:'Japan',itemType:'Item Type'},
  ]

  constructor(private modalService:NgbModal) { }


  ngOnInit(): void {
    this.prepareHeaders();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'item', header: 'Item', sort:true,isAsc:true},
      { name: 'name', header: 'SKU/Name', sort: true,isAsc:true},
      { name: 'price', header: 'Price', sort: true,isAsc:true},
      { name: 'unit', header: 'Unit', sort: false,isAsc:false},
      { name: 'inactive', header: 'Inactive', sort: false,isAsc:false},
      { name: 'category', header: 'Category', sort: false,isAsc:false},
      { name: 'supplier', header: 'Supplier', sort: false,isAsc:false},
      { name: 'portCentre', header: 'Port Centre', sort: false,isAsc:false},
      { name: 'itemType', header: 'Item Type', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];
  }

  addCatalogueModal(){
    this.modalService.open(CreateCompanyitemsComponent,{centered:true})
  }


}
