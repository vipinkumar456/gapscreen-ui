import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { ReasonForRejectionPopupComponent } from '../reason-for-rejection-popup/reason-for-rejection-popup.component';
@Component({
  selector: 'app-admin-new-service',
  templateUrl: './admin-new-service.component.html',
  styleUrls: ['./admin-new-service.component.scss']
})
export class AdminNewServiceComponent implements OnInit {

  showMe:boolean=false
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers: Array<any>
  portList: Array<any>;
  order: any = 'desc';
  col: any = 'createdDate';
  numberOfElements:any;

  constructor(public dialogService:DialogService) { }

  ngOnInit(): void {
    this.prepareHeaders();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'date', header: 'Date', sort: true,isAsc:true},
      { name: 'request', header: 'Request', sort: true,isAsc:false},
      { name: 'action', header: 'Action', sort: true,isAsc:false},
    ]; 
    this.portList=[
        {date:'10 Jan 2022',request:'Sealinks has requested to add Service: Service Name'},
        {date:'11 Jan 2022',request:'Sealinks Shipping has requested to add Service: Service Name'},
        {date:'12 Jan 2022',request:'Seaways Shipping has requested to add Service: Service Name'},
        {date:'13 Jan 2022',request:'Seaways Shipping has requested to add Service: Service Name'},
       
    ]
  }

  reasonForRejection(){
    const ref=this.dialogService.open(ReasonForRejectionPopupComponent,
      {
        header:'Reason For Rejection',
        width:'50%',   
      
  })
  ref.onClose.subscribe(res => {
    this.prepareHeaders();
  });
  }


}
