import { CapacityModalComponent } from './../capacity-modal/capacity-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sealink-details',
  templateUrl: './sealink-details.component.html',
  styleUrls: ['./sealink-details.component.scss']
})
export class SealinkDetailsComponent implements OnInit {

  percent:any=2.4;

  details:any=[
    {name:'Company Name', value:'Sealinks'},
    {name:'Former Name', value:'Sealink Shipping PVT.LTD'},
    {name:'Contact Person', value:'Sumit Arora'},
    {name:'Phone Number', value:'(+91) 9825365698'},
    {name:'Email Address', value:'info@sealinks.com'},
    {name:'Company Registration Number', value:'45F7384D56'},
    {name:'Category', value:'Agent'},
    {name:'VAT Registration Number', value:'VT5639HG904'},
    {name:'Duns Number', value:'RG52637F89'},
    {name:'Date of Incorporation', value:'08 Sep.1995'},
    {name:'Legal Status', value:'Private Limited Company'},
    {name:'Website Url', value:'www.sealinks.com'},
    {name:'Product/Service', value:'info@sealinks.com'},
    {name:'Annual Revenue in USD', value:'2.7 CR'},
  ];

  riskRating:any=[
    {name:'Compliance',percent:3,capacity:5,color:'#ec6464'}, {name:'Cybersecurity',percent:6,capacity:6,color:'#f8c848'}, {name:'Reputational',percent:3,capacity:3,color:'#ec6464'},
    {name:'Financial',percent:9,capacity:10,color:'#2dcf94'},{name:'Operation',percent:8,capacity:9,color:'#2dcf94'},{name:'Strategic',percent:3,capacity:3,color:'#ec6464'},
    {name:'Competition',percent:8,capacity:9,color:'#2dcf94'},{name:'Enterprise',percent:9,capacity:10,color:'#2dcf94'},{name:'Security & Fraud',percent:7,capacity:7,color:'#f8c848'},
    {name:'Performance',percent:7,capacity:7,color:'#f8c848'},{name:'Schedule',percent:9,capacity:10,color:'#2dcf94'},{name:'Cost',percent:6,capacity:6,color:'#f8c848'},
    {name:'Ultimate Bencificial Owners',percent:3,capacity:3,color:'#ec6464'},{name:'Power of Customers',percent:9,capacity:10,color:'#2dcf94'},{name:'Power of Suppliers',percent:8,capacity:10,color:'#2dcf94'}
  ]

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  editCapacity(capacity){
    const modelRef=this.modalService.open(CapacityModalComponent,{size:'sm',centered:true});
    modelRef.componentInstance.capacity=capacity;
  }

}
