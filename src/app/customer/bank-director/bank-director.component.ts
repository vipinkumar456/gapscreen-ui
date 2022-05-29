import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { BankDirectorPopupComponent } from '../bank-director-popup/bank-director-popup.component';
@Component({
  selector: 'app-bank-director',
  templateUrl: './bank-director.component.html',
  styleUrls: ['./bank-director.component.scss']
})
export class BankDirectorComponent implements OnInit {

  responsiveOptions;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
    locationheaders: Array<any>;
    shareholderheader: Array<any>;
  numberOfElements:any;
  constructor(public dialogService:DialogService) { 
  }

  ngOnInit(): void {
    // this.addConfirmationPopup();
    this.prepareHeader();
    this.prepareShareHolder();
    // 
   
  }
  // addConfirmationPopup(){
  //   const ref=this.dialogService.open(BankDirectorPopupComponent,
  //     {
  //       width:'50%'
  //     });
  //     alert("hello")
  // }


  locationData: Array<any> = [
    {directorsName: 'Mohit Kapoor'},
    {directorsName: 'Sandeep Rana'},
    {directorsName: 'Ravi Arora'},
    {directorsName: 'Vijay Hooda'},
    {directorsName: 'Lalit Gupta'},
  ];


    prepareHeader(){
      this.locationheaders = [
        { name: 'directorsName', header: ' Name', sort: false,isAsc:false},
        { name: 'identificationProof', header: 'Identification Proof', sort: false,isAsc:false},
        { name: 'addressProof', header: 'Address Proof', sort: false,isAsc:false},
      ];
    }

    

  shareholderdata: Array<any> = [
    {shareHolderName: 'Mohit Kapoor', percentage:'52%' },
    {shareHolderName: 'Sandeep Rana', percentage:'52%' },
    {shareHolderName: 'Ravi Arora', percentage:'52%' },
    {shareHolderName: 'Vijay Hooda', percentage:'52%' },
    {shareHolderName: 'Lalit Gupta', percentage:'52%' },
  ];


    prepareShareHolder(){
      this.shareholderheader = [
        { name: 'shareHolderName', header: 'Name', sort: false,isAsc:false},
        { name: 'percentage', header: ' Percentage', sort: false,isAsc:false},
        { name: 'identificationProopercentage', header: 'Identification Proof', sort: false,isAsc:false},
        { name: 'addressProof', header: 'Address Proof', sort: false,isAsc:false},
      ];
    }


}
