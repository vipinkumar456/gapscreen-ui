import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  checked: boolean=true;
  showMe:boolean=false
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
    locationheaders: Array<any>;
  numberOfElements:any;
  constructor(public dialogService:DialogService) { }

  ngOnInit(): void {
    this.prepareHeader();
  }


  locationData: Array<any> = [
    {
      name: 'Main Office',address: '147 Prince Street,Ny - 11216',active: 'Yes'
    },
    {
      name: 'Main Office',address: '147 Prince Street,Ny - 11216',active: 'Yes'
    },
  ];


    prepareHeader(){
      this.locationheaders = [
        { name: 'name', header: 'Name', sort: false,isAsc:false},
        { name: 'address', header: 'Address', sort: false,isAsc:false},
        { name: 'active', header: 'Active', sort: false,isAsc:false},
        { name: 'action', header: 'Action', sort: false,isAsc:false},
      ];
    }

   
}
