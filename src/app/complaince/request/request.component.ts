import { QuestionModalComponent } from './../question-modal/question-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  headers:any

  requests:any=[
    {date:'10 Jan 2022', requestedBy:'Sealinks', documentRequested:'Company Information,Uploaded Documents,Questionnarie...'},
    {date:'30 Dec 2021', requestedBy:'Sealinks Shipping', documentRequested:'Company Information,Uploaded Documents'},
    {date:'12 Dec 2021', requestedBy:'Seaways Shipping', documentRequested:'Company Information'},
    {date:'18 Dec 2021', requestedBy:'Seaways Shipping', documentRequested:'Uploaded Documents'},
  ]

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
    this.prepareHeaders();
  }

  prepareHeaders(){
    this.headers = [
      { name: 'date', header: 'Date', sort:false,isAsc:true},
      { name: 'requestedBy', header: 'Requested by', sort: false,isAsc:false},
      { name: 'documentsRequested', header: 'Documents Requested', sort: false,isAsc:false},
      { name: '', header: '', sort: false,isAsc:false}
    ];
  }

  openModal(type){
    if(type='rejection'){
      const modelRef=this.modalService.open(QuestionModalComponent,{centered:true});
      modelRef.componentInstance.type='rejection';
    }
  }

}
