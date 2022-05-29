import { Component, Input, OnInit,Output,EventEmitter,HostListener } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ownership-general-info-section1',
  templateUrl: './ownership-general-info-section1.component.html',
  styleUrls: ['./ownership-general-info-section1.component.scss']
})
export class OwnershipGeneralInfoSection1Component implements OnInit {

// @Input() generalinfo:any;
// @Output() gotoreportgeneralInfo =new EventEmitter();
reportData:any=[];
reportBData:any=[];
reportCData:any=[];
reportDData:any=[];
generalinfo:any;
section1tableData:any=[];
tableNames: Array<any> = [];
cols: any[];
PartBcols: any[];
PartCcols: any[];
PartDcols: any[];
section1Flag:boolean=true;
section2Flag:boolean=false;
section1Form:any;
reportDateForm:any;
user: any;
heading: any;
partAserialNoLocal: number = 0;
partDserialNoLocal: number = 0;
date = new Date();
isMaker: boolean = false;
isChecker: boolean = false;
isView:boolean = false;
uri: string = "";
reportDataNo=0;
reportDDataNo=0;
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
  private route: ActivatedRoute,
  private router: Router,
) { }

@HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
  let result = confirm("Changes you made may not be saved.");
  if (result) {
    // Do more processing...
  }
  event.returnValue = false; // stay on same page
}


ngOnInit(): void {
  

  this.route.params.subscribe((res) => {
    if (res.type == 'view') {
      this.getUser();
      this.isView = true;
      this.isMaker = true;
      this.getOwnershipRecordsbyId(res.id);
    }
    if (res.type == 'Approve/Reject') {
      this.getUser();
      this.isChecker = true;
      this.getOwnershipRecordsbyId(res.id);
    }
   if(!res.id){
    this.getUserwithReport();
   }
   this.preparesection1Form();
   this.tableCol();
   this.PartBtableCol();
   // this.preparereportBData();
   // this.preparereportCData();
   
   this.PartCtableCol();
   this.PartDtableCol();
  })


  this.heading="Section 1: Ownership Pattern"
}
  preparesection1Form()
  {
    this.section1Form=this.fb.group({
      totalNoOfEquityShares:[''],
      faceValueOfEachShare:[''],
      bookValuePerShare:['']

    })

    {
      this.reportDateForm=this.fb.group({
        dateOfReport:['']
  
      })
    }
  }
  get f(){
    return this.section1Form.controls
  }
  
  get e(){
    return this.reportDateForm.controls
  }

tableCol(){
  this.cols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'300px'},
  { title: "name", name: "Name", inpType: "text", editable: true,width:'300px'},
  { title: "status",name: "Status (By Code)",inpType: "number", editable: true,width:'300px'},
  { title: "sharesHeld",name: "Shares Held (No)",inpType: "number",editable: true,width:'300px'},
  // { title: "sharesInTotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'300px'},
  // { title: "bookValueOfShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'300px'},
  // { title: "faceValueOfShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'300px'},
  // { title: 'createdDate', name: 'Created On', width:'300px' },
  // { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

PartBtableCol(){
  this.PartBcols = [
  { title: "section", name: "Part B - Other Shareholders", inpType:"number", editable: false ,width:'300px'},
  { title: "noOfHolders", name: "No. of Holders", inpType: "number", editable: true,width:'300px'},
  { title: "sharesHeld",name: "Shares Held (No)",inpType: "number", editable: true,width:'300px'},
  // { title: "sharesInTotalEquity",name: "Shares in Total Equity",inpType: "number",editable: true,width:'300px'},
  // { title: "bookValueOfShares",name: "Book Value of Shares Held(Rs Lakh)",inpType: "number",editable: true,width:'300px'},
  // { title: "faceValueOfShares", name: "Face Value of Shares Held",inpType: "number", editable: true,width:'300px'},
  // { title: 'createdDate', name: 'Created On', width:'300px' },
  // { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

PartCtableCol(){
  this.PartCcols = [
  { title: "section", name: "Ownership Summary (% Shareholding In Bank)", inpType:"number", editable: false ,width:'300px'},
  { title: "resident", name: "Resident", inpType: "number", editable: true,width:'300px'},
  { title: "nonResident",name: "Non Resident",inpType: "number", editable: true,width:'300px'},
  { title: 'createdDate', name: 'Created On', width:'300px' },
  { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

PartDtableCol(){
  this.PartDcols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'300px'},
  { title: "nameOfController", name: "Name of Controller/ Significant Shareholder/ s", inpType: "text", editable: true,width:'300px'},
  { title: "noOfSharesHeld",name: "No. of Shares Held",inpType: "number", editable: true,width:'300px'},
  { title: "holdingPerctInTotalEquity",name: "% of Holding In Total Equity",inpType: "number",editable: true,width:'300px'},
  { title: "residenceStatus",name: "Residance Status",inpType: "text",editable: true,width:'300px'},
  { title: "associateShareholder", name: "Name of Associate Shareholder",inpType: "text", editable: true,width:'300px'},
  { title: "theirResidenceStatus", name: "Their Residence Status",inpType: "number", editable: true,width:'300px'}, 
  { title: 'createdDate', name: 'Created On', width:'300px' },
  { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

getUser() {
  this.httpService.getData(PATH.GET_USER).subscribe((res) => {
    this.user = res.userName;
    });
  }
  getUserwithReport() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      this.preparereportBData();
      this.preparereportCData();
      });
    }
 
  preparereportBData()
  {
    this.reportBData=[
      // {
      //   section:"Total of Part A (holding shares of 1% and more)",createdBy:this.user,createdDate:this.date
      // },
      {
        section:"All other holders on share register",createdBy:this.user,createdDate:this.date
      }
    ]
  }

  preparereportCData()
  {
    this.reportCData=[
      {
        section:"Government & RBI",createdBy:this.user,createdDate:this.date
      },
      {
        section:"Financial Institution (Including Mutual Funds)",createdBy:this.user,createdDate:this.date
      },
      {
        section:"Other Corporates",createdBy:this.user,createdDate:this.date
      },
      {
        section:"Individuals",createdBy:this.user,createdDate:this.date
      }
    ]
  }

add(itm,tablesData)
{
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

  if(!this.reportDateForm.value.dateOfReport){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Report Date is Required",
    });
        return;
  }
  this.generalinfo={...this.section1Form.value};
  this.generalinfo.dateOfReport=this.reportDateForm.value.dateOfReport;

  this.generalinfo.ownershipPatternRequestItems=this.reportData;
  this.generalinfo.otherShareholderItems=this.reportBData;
  this.generalinfo.ownershipSummaryRequestItems=this.reportCData;
  this.generalinfo.shareholderControlRequestItems=this.reportDData;
  this.section1Flag=false;
  this.section2Flag=true;
  console.log(this.generalinfo);
  return
}

getSection2(itm)
{
 
  if(itm=='SUBMITTED')
  {
    this.gotoReport('SUBMITTED');
  }
  this.section1Flag=true;
  this.section2Flag=false;
}

gotoReport(itm)
{
  // this.gotoreportgeneralInfo.emit(itm); 
  this.router.navigate(["report-on-ownership-view"]);
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
    createdDate: date,
    serialNo: this.partAserialNoLocal,
  })
  }
  if(itm=='PartD')
  {
  this.reportDData.push({
    createdBy: this.user, 
    createdDate: date,
    serialNo: this.partDserialNoLocal
  })
  }
}

getOwnershipRecordsbyId(id){
  this.uri = PATH.OWNERSHIPREPORTS_ID+id;
  let branch = this.httpService.getData(this.uri);
  branch.subscribe((res) => {
    console.log(res);
    
    this.reportDateForm.patchValue({
      dateOfReport:res.dateOfReport
    })
    this.section1Form.patchValue({
      totalNoOfEquityShares:res.totalNoOfEquityShares,
      faceValueOfEachShare:res.faceValueOfEachShare,
      bookValuePerShare:res.bookValuePerShare
    })
    this.section1Form.disable();
    this.reportDateForm.disable();
    this.reportData=res.ownershipPatternItems;
    this.reportBData=res['otherShareholderItems'];
    this.reportCData=res.ownershipSummaryItems;
    this.reportDData=res.shareholderControlItems;

    this.cols.forEach(elm=>{
      elm.editable=false;
    })
    this.PartBcols.forEach(elm=>{
      elm.editable=false;
    })
    this.PartCcols.forEach(elm=>{
      elm.editable=false;
    })
    this.PartDcols.forEach(elm=>{
      elm.editable=false;
    })
    this.reportData.forEach(elm => {
      this.reportDataNo=this.reportDataNo+1;
      elm.serialNo=this.reportDataNo;
      if (elm.sharesHeld ) {
        
     
        this.partATotal.sharesHeld = this.partATotal.sharesHeld + parseFloat(elm.sharesHeld);
      }
      if (elm.sharesInTotalEquity ) {
        this.partATotal.sharesInTotalEquity = this.partATotal.sharesInTotalEquity + parseFloat(elm.sharesInTotalEquity);
      }
      if (elm.bookValueOfShares ) {
        this.partATotal.bookValueOfShares = this.partATotal.bookValueOfShares + parseFloat(elm.bookValueOfShares);
      }
      if (elm.faceValueOfShares) {
        this.partATotal.faceValueOfShares = this.partATotal.faceValueOfShares + parseFloat(elm.faceValueOfShares);
      }
    });

    this.reportBData.forEach(elm => {
      if (elm.noOfHolders ) {
        this.partBTotal.noOfHolders = this.partBTotal.noOfHolders + parseFloat(elm.noOfHolders);
      }
      if (elm.sharesHeld ) {
        this.partBTotal.sharesHeld = this.partBTotal.sharesHeld + parseFloat(elm.sharesHeld);
      }
      if (elm.sharesInTotalEquity ) {
        this.partBTotal.sharesInTotalEquity = this.partBTotal.sharesInTotalEquity + parseFloat(elm.sharesInTotalEquity);
      }
      if (elm.bookValueOfShares) {
        this.partBTotal.bookValueOfShares = this.partBTotal.bookValueOfShares + parseFloat(elm.bookValueOfShares);
      }
      if (elm.faceValueOfShares ) {
        this.partBTotal.faceValueOfShares = this.partBTotal.faceValueOfShares + parseFloat(elm.faceValueOfShares);
      }
    });

    this.reportCData.forEach(elm => {
      if (elm.resident) {
        this.partCTotal.resident = this.partCTotal.resident + parseFloat(elm.resident);
      }
      if (elm.nonResident) {
        this.partCTotal.nonResident = this.partCTotal.nonResident + parseFloat(elm.nonResident);
      }
     
    });
    this.reportDData.forEach(elm => {
     
      this.reportDDataNo=this.reportDDataNo+1;
      elm.serialNo=this.reportDDataNo;
    });
       
      }, err => {
        this.messageService.add({
          severity:"error",
          summary:"Error",
          detail:err.message
        })
    });
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
