import { QuestionModalComponent } from './../question-modal/question-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sealinks',
  templateUrl: './sealinks.component.html',
  styleUrls: ['./sealinks.component.scss']
})
export class SealinksComponent implements OnInit {

  information:any=[
    {name:'Select All'}, {name:'Company Name'}, {name:'Former Name'}, {name:'Contact Person'},
    {name:'Phone Number'}, {name:'Email Address'}, {name:'Company Registration Number'},{name:'Category'},
    {name:'VAT Registration Number'}, {name:'Duns Number'}, {name:'Date of Incorporation'}, {name:'Legal Status'},
    {name:'Website URL'}, {name:'Product/Service'}, {name:'Annual Revenue in USD'}, {name:'Company Logo'},
  ];

  documents:any=[
    {name:'Select All'}, {name:'Certificate of Incorporation'}, {name:'Memorandum of Association'}, {name:'Financial Statements'},
    {name:'Trading License'}, {name:'Address Approval'}, {name:'Insurance Certificate'}
  ]

  questions:any=[
    {name:'Select All'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
    {name:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
  ];

  regulations:any=[
    {name:'Select All'}, {name:'Terms & Conditions'}, {name:'Privacy Policy'}
  ]

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  openModal(type){
    if(type=='alert'){
      const modelRef=this.modalService.open(QuestionModalComponent,{ size:'sm', centered:true,})
      modelRef.componentInstance.type='alert'
    }

    if(type=='question'){
      const modelRef=this.modalService.open(QuestionModalComponent,{ size:'sm', centered:true,})
      modelRef.componentInstance.type='question'
    }

  }


}
