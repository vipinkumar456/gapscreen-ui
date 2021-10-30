import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ownership-general-info-section1',
  templateUrl: './ownership-general-info-section1.component.html',
  styleUrls: ['./ownership-general-info-section1.component.scss']
})
export class OwnershipGeneralInfoSection1Component implements OnInit {
@Input() generalinfo:any;
@Output() gotoreportgeneralInfo =new EventEmitter();
reportData:any=[];
reportBData:any=[];
reportCData:any=[];
reportDData:any=[];
section1tableData:any=[];
tableNames: Array<any> = [];
cols: any[];
PartBcols: any[];
PartCcols: any[];
PartDcols: any[];
section1Flag:boolean=true;
section2Flag:boolean=false;
section1Form:any;
user: any;
heading: any;
partAserialNoLocal: number = 0;
partDserialNoLocal: number = 0;
 date = new Date();

partATotal: any = {
  sharesHeld: 0,
  sharesInTotalEquity: 0,
  bookValueOfShares: 0,
  faceValueOfShares: 0,
}
partBTotal: any = {
  noOfHolders: 0,
  sharesHeld: 0,
  sharesInTotalEquity: 0,
  bookValueOfShares: 0,
  faceValueOfShares: 0
}
partCTotal: any = {
  resident: 0,
  nonResident: 0
}

constructor(
  private fb: FormBuilder,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  private httpService: HttpService,
  private router: Router,
) { }




ngOnInit(): void {
  console.log(this.generalinfo);
  this.getUser();
  this.preparesection1Form();
  this.tableCol();
  this.PartBtableCol();
  this.PartCtableCol();
  this.PartDtableCol();
  this.preparereportBData();
  this.preparereportCData();
  this.heading="Section 1: Ownership Pattern"
}
  preparesection1Form()
  {
    this.section1Form=this.fb.group({
      totalNoOfEquityShares:['',Validators.required],
      faceValueOfEachShare:['',Validators.required],
      bookValuePerShare:['',Validators.required]
    })
  }
  get f(){
    return this.section1Form.controls
  }
  

tableCol(){
  this.cols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'400px'},
  { title: "name", name: "Name", inpType: "text", editable: true,width:'400px'},
  { title: "status",name: "Status (By Code)*",inpType: "number", editable: true,width:'400px'},
  { title: "sharesHeld",name: "Shares Held (No)",inpType: "number",editable: true,width:'400px'},
  { title: "sharesInTotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'400px'},
  { title: "bookValueOfShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'400px'},
  { title: "faceValueOfShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'400px'},
  { title: 'createdOn', name: 'Created On', width:'400px' },
  { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

PartBtableCol(){
  this.PartBcols = [
  { title: "section", name: "Part B - Other Shareholders", inpType:"number", editable: false ,width:'400px'},
  { title: "noOfHolders", name: "No. of Holders", inpType: "number", editable: true,width:'400px'},
  { title: "sharesHeld",name: "Shares Held (No)",inpType: "number", editable: true,width:'400px'},
  { title: "sharesInTotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'400px'},
  { title: "bookValueOfShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'400px'},
  { title: "faceValueOfShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'400px'},
  { title: 'createdOn', name: 'Created On', width:'400px' },
  { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

PartCtableCol(){
  this.PartCcols = [
  { title: "section", name: "Ownership Summary (% Shareholding in Bank)", inpType:"number", editable: false ,width:'400px'},
  { title: "resident", name: "Resident", inpType: "number", editable: true,width:'400px'},
  { title: "nonResident",name: "Non Resident",inpType: "number", editable: true,width:'400px'},
  { title: 'createdOn', name: 'Created On', width:'400px' },
  { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

PartDtableCol(){
  this.PartDcols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'400px'},
  { title: "nameOfController", name: "Name of Controller/ Significant Shareholder/ s", inpType: "text", editable: true,width:'400px'},
  { title: "noOfSharesHeld",name: "No. of Shares Held",inpType: "number", editable: true,width:'400px'},
  { title: "holdingPerctInTotalEquity",name: "% of Holding in Total Equity",inpType: "number",editable: true,width:'400px'},
  { title: "residenceStatus",name: "Residance Status",inpType: "text",editable: true,width:'400px'},
  { title: "associateShareholder", name: "Name of Associate Shareholder",inpType: "text", editable: true,width:'400px'},
  { title: "theirResidenceStatus", name: "Their Residence Status",inpType: "number", editable: true,width:'400px'}, 
  { title: 'createdOn', name: 'Created On', width:'400px' },
  { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

getUser() {
  this.httpService.getData(PATH.GET_USER).subscribe((res) => {
    this.user = res.userName;
    this.preparereportBData();
    this.preparereportCData();
    });
  }
 
  preparereportBData()
  {
    console.log(this.user);
    this.reportBData=[
      {
        section:"Total of Part A (holding shares of 1% and more)",createdBy:this.user,createdOn:this.date
      },
      {
        section:"All other holders on share register",createdBy:this.user,createdOn:this.date
      }
    ]
  }

  preparereportCData()
  {
    this.reportCData=[
      {
        section:"Government & RBI",createdBy:this.user,createdOn:this.date
      },
      {
        section:"Financial Institution (including mutual funds)",createdBy:this.user,createdOn:this.date
      },
      {
        section:"other Corporates",createdBy:this.user,createdOn:this.date
      },
      {
        section:"Individuals",createdBy:this.user,createdOn:this.date
      }
    ]
    console.log(this.reportBData);
  }

add(itm,tablesData)
{
  console.log(this.user);
  if(itm=='PartA'){ 
    for(var i=0;i<tablesData.length;i++){
      this.partAserialNoLocal=tablesData[i]['serialNo'];
    }
    this.partAserialNoLocal=this.partAserialNoLocal+1;
  }
  if(itm=='PartD'){
    for(var i=0;i<tablesData.length;i++){
      this.partDserialNoLocal=tablesData[i]['serialNo'];
    }
    this.partDserialNoLocal=this.partDserialNoLocal+1;
  }
   this.insertRow(itm);
}

totaladdition(itm,name,tableName)
{
  if(tableName=='PartA')
  {
    if (name.title == 'sharesHeld') {
      this.partATotal.sharesHeld = 0;
    }
    if (name.title == 'sharesInTotalEquity') {
      this.partATotal.sharesInTotalEquity = 0;
    }
    if (name.title == 'bookValueOfShares') {
      this.partATotal.bookValueOfShares = 0;
    }
    if (name.title == 'faceValueOfShares') {
      this.partATotal.faceValueOfShares = 0;
    }
    this.reportData.forEach(elm => {
      if (elm.sharesHeld && name.title == "sharesHeld") {
        this.partATotal.sharesHeld = this.partATotal.sharesHeld + parseFloat(elm.sharesHeld);
      }
      if (elm.sharesInTotalEquity && name.title == "sharesInTotalEquity") {
        this.partATotal.sharesInTotalEquity = this.partATotal.sharesInTotalEquity + parseFloat(elm.sharesInTotalEquity);
      }
      if (elm.bookValueOfShares && name.title == "bookValueOfShares") {
        this.partATotal.bookValueOfShares = this.partATotal.bookValueOfShares + parseFloat(elm.bookValueOfShares);
      }
      if (elm.faceValueOfShares && name.title == "faceValueOfShares") {
        this.partATotal.faceValueOfShares = this.partATotal.faceValueOfShares + parseFloat(elm.faceValueOfShares);
      }
    });
  } 

        if(tableName=='PartB')
        {
          if (name.title == 'noOfHolders') {
            this.partBTotal.noOfHolders = 0;
          }
          if (name.title == 'sharesHeld') {
            this.partBTotal.sharesHeld = 0;
          }
          if (name.title == 'sharesInTotalEquity') {
            this.partBTotal.sharesInTotalEquity = 0;
          }
          if (name.title == 'bookValueOfShares') {
            this.partBTotal.bookValueOfShares = 0;
          }
          if (name.title == 'faceValueOfShares') {
            this.partBTotal.faceValueOfShares = 0;
          }
          this.reportBData.forEach(elm => {
            if (elm.noOfHolders && name.title == "noOfHolders") {
              this.partBTotal.noOfHolders = this.partBTotal.noOfHolders + parseFloat(elm.noOfHolders);
            }
            if (elm.sharesHeld && name.title == "sharesHeld") {
              this.partBTotal.sharesHeld = this.partBTotal.sharesHeld + parseFloat(elm.sharesHeld);
            }
            if (elm.sharesInTotalEquity && name.title == "sharesInTotalEquity") {
              this.partBTotal.sharesInTotalEquity = this.partBTotal.sharesInTotalEquity + parseFloat(elm.sharesInTotalEquity);
            }
            if (elm.bookValueOfShares && name.title == "bookValueOfShares") {
              this.partBTotal.bookValueOfShares = this.partBTotal.bookValueOfShares + parseFloat(elm.bookValueOfShares);
            }
            if (elm.faceValueOfShares && name.title == "faceValueOfShares") {
              this.partBTotal.faceValueOfShares = this.partBTotal.faceValueOfShares + parseFloat(elm.faceValueOfShares);
            }
          });
        }   

        if(tableName=='PartC')
        {
          if (name.title == 'resident') {
            this.partCTotal.resident = 0;
          }
          if (name.title == 'nonResident') {
            this.partCTotal.nonResident = 0;
          }
       
          this.reportCData.forEach(elm => {
            if (elm.resident && name.title == "resident") {
              this.partCTotal.resident = this.partCTotal.resident + parseFloat(elm.resident);
            }
            if (elm.nonResident && name.title == "nonResident") {
              this.partCTotal.nonResident = this.partCTotal.nonResident + parseFloat(elm.nonResident);
            }
           
          });
        }   
}

gotoSection()
{
  this.generalinfo={...this.generalinfo,...this.section1Form.value};
  if(!this.section1Form.value.totalNoOfEquityShares){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Total No of Equity Shares is required",
    });
  }
  if(!this.section1Form.value.faceValueOfEachShare){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Face Value Of EachShare is required",
    });
  }
  if(!this.section1Form.value.bookValuePerShare){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Book Value Per Share is required",
    });
    return
  }


  for (var i = 0; i < this.reportData.length; i++) {
    var AcurrentRow = this.reportData[i];
    {
      if(!AcurrentRow.name){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Part A: Name is required",
        });
        return;
      }
    }
  }
  for (var i = 0; i < this.reportBData.length; i++) {
    var BcurrentRow = this.reportBData[i];
    {
      if(!BcurrentRow.noOfHolders){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Part B: No. of Holders is required",
        });
        return;
      }
    }
  }
  for (var i = 0; i < this.reportCData.length; i++) {
    var CcurrentRow = this.reportCData[i];
    {
      if(!CcurrentRow.resident){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Part C: Resident is required",
        });
        return;
      }
    }
  }
  for (var i = 0; i < this.reportDData.length; i++) {
    var DcurrentRow = this.reportDData[i];
    {
      if(!DcurrentRow.nameOfController){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Part D: Name Of Controller is required",
        });
        return;
      }
    }
  }
  console.log(this.reportData);

  this.generalinfo.ownershipPatternRequestItems=this.reportData;
  console.log(this.generalinfo);
  this.generalinfo.otherShareholderItems=this.reportBData;
  this.generalinfo.ownershipSummaryRequestItems=this.reportCData;
  this.generalinfo.shareholderControlRequestItems=this.reportDData;
  console.log(this.generalinfo);
  // this.section1tableData=section1table;
  // console.log(this.section1tableData);
  this.section1Flag=false;
  this.section2Flag=true;
}

getSection2(itm)
{
  debugger
  console.log(itm);
  if(itm=='SUBMITTED')
  {
    this.gotoReport('SUBMITTED');
  }
  this.section1Flag=true;
  this.section2Flag=false;
}

gotoReport(itm)
{
  console.log(itm);
  this.gotoreportgeneralInfo.emit(itm); 
}

delete(account,index: number,itm): void 
{
  for(let i=0;i<this.reportData.length;i++)
  {
    if(account.serialNo==this.reportData[i].serialNo)
    {
      this.partATotal.noOfHolders=parseInt(this.partATotal.noOfHolders)-parseInt(this.reportData[i].noOfHolders);
      this.partATotal.sharesInTotalEquity=parseInt(this.partATotal.sharesInTotalEquity)-parseInt(this.reportData[i].sharesInTotalEquity);
      this.partATotal.sharesHeld=parseInt(this.partATotal.sharesHeld)-parseInt(this.reportData[i].sharesHeld);
      this.partATotal.faceValueOfShares=parseInt(this.partATotal.faceValueOfShares)-parseInt(this.reportData[i].faceValueOfShares);
    }
  }
  
  if(itm=='PartA')
  {
  this.reportData.splice(index, index + 1);
  this.partAserialNoLocal=this.partAserialNoLocal-1;
  }
  if(itm=='PartD')
  {
    this.reportDData.splice(index,index +1);
    this.partDserialNoLocal=this.partDserialNoLocal-1;
  } 
} 
insertRow(itm){
  var date = new Date();
  if(itm=='PartA')
  {
  this.reportData.push({
    createdBy: this.user, 
    createdOn: date,
    serialNo: this.partAserialNoLocal,
  })
  }
  if(itm=='PartD')
  {
  this.reportDData.push({
    createdBy: this.user, 
    createdOn: date,
    serialNo: this.partDserialNoLocal
  })
  }
}
numberOnly(event:any){   
  const regexpNumber = /[0-9]/;
  let inputCharacter = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
    event.preventDefault();
  }
}

numberOnlyWithDismal(event:any){   
  const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
  let inputCharacter = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
    event.preventDefault();
  }
}

}
