import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-report-on-ownership-section1',
  templateUrl: './report-on-ownership-general-information-section1.component.html',
  styleUrls: ['./report-on-ownership-general-information-section1.component.scss']
})
export class ReportOnOwnershipGeneralInformationSection1Component implements OnInit {
  @Input() generalinfo:any;
  reportData:any=[];
  reportBData:any=[];
  reportCData:any=[];
  reportDData:any=[];
  tableNames: Array<any> = [];
  cols: any[];
  PartBcols: any[];
  PartCcols: any[];
  PartDcols: any[];
  user: any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
  ) { }
 

 

  ngOnInit(): void {
    console.log(this.generalinfo);
    this.tableCol();
    this.PartBtableCol();
    this.PartCtableCol();
    this.PartDtableCol();
    this.getUser();
 }

  tableCol(){
    this.cols = [
    { title: "srNo", name: "Sr. No.", inpType:"number", editable: true ,width:'400px'},
    { title: "name", name: "Name", inpType: "number", editable: true,width:'400px'},
    { title: "statusbyCode",name: "Status (By Code)*",inpType: "number", editable: true,width:'400px'},
    { title: "sharesheldNo",name: "Shares Held (No)",inpType: "number",editable: true,width:'400px'},
    { title: "sharesintotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'400px'},
    { title: "bookvalueofShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'400px'},
    { title: "facevalueofShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'400px'},
    { title: 'status', name: 'Status', width:'400px' },
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
  ];
  }

  PartBtableCol(){
    this.PartBcols = [
    { title: "partbotherShareHolders", name: "Part B - Other Shareholders", inpType:"number", editable: true ,width:'400px'},
    { title: "noofholders", name: "No. of Holders", inpType: "number", editable: true,width:'400px'},
    { title: "sharesheldNo",name: "Shares Held (No)",inpType: "number", editable: true,width:'400px'},
    { title: "sharesintotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'400px'},
    { title: "bookvalueofShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'400px'},
    { title: "facevalueofShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'400px'},
    { title: 'status', name: 'Status', width:'400px' },
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
  ];
  }

  PartCtableCol(){
    this.PartCcols = [
    { title: "ownershipsummary", name: "Ownership Summary (% Shareholding in Bank)", inpType:"number", editable: true ,width:'400px'},
    { title: "resident", name: "Resident", inpType: "number", editable: true,width:'400px'},
    { title: "nonresident",name: "Non Resident",inpType: "number", editable: true,width:'400px'},
    { title: 'status', name: 'Status', width:'400px' },
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
  ];
  }

  PartDtableCol(){
    this.PartDcols = [
    { title: "srNo", name: "Sr. No.", inpType:"number", editable: true ,width:'400px'},
    { title: "nameofcontroller/significant/shareholder/s", name: "Name of Controller/ Significant Shareholder/ s", inpType: "number", editable: true,width:'400px'},
    { title: "noofsharesheld",name: "No. of Shares Held",inpType: "number", editable: true,width:'400px'},
    { title: "holdingintotalequity",name: "% of Holding in Total Equity",inpType: "number",editable: true,width:'400px'},
    { title: "residencestatus",name: "Residance Status",inpType: "number",editable: true,width:'400px'},
    { title: "nameofassociateshareHolder", name: "Name of Associate Shareholder",inpType: "number", editable: true,width:'400px'},
    { title: "theresidenceStatus", name: "The Residence Status",inpType: "number", editable: true,width:'400px'}, 
    { title: 'status', name: 'Status', width:'400px' },
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
  ];
  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      console.log(res)
      console.log(this.user);
      });
    }

  add(itm)
  {
    this.insertRow(itm);
  }

  delete(index: number,itm): void 
  {
    if(itm=='PartA')
    {
    this.reportData.splice(index, index + 1);
    }
    if(itm=='PartD')
    {
      this.reportDData.splice(index,index +1);
    } 
  } 
  insertRow(itm){
    var date = new Date();
    if(itm=='PartA')
    {
    this.reportData.push({
      createdBy: this.user, 
      createdOn: date,
    })
    }
    if(itm=='PartD')
    {
    this.reportDData.push({
      createdBy: this.user, 
      createdOn: date,
    })
    }
  }
}
