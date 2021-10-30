import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { report } from 'process';

@Component({
  selector: 'app-ownership-general-info-section2',
  templateUrl: './ownership-general-info-section2.component.html',
  styleUrls: ['./ownership-general-info-section2.component.scss']
})
export class OwnershipGeneralInfoSection2Component implements OnInit {
  @Input() ownershipInfo:any;
  @Output() gotosection1generalInfo =new EventEmitter();
  reportData:any=[];
  reportBData:any=[];
  reportCData:any=[];
  section2tableData: any=[];
  cols: any[];
  PartBcols: any[];
  PartCcols: any[];
  PartCSubcols: any[];
  user: any;
  heading: any;
  isEmail:boolean=false;
  partAserialNoLocal: number = 0;
  partBserialNoLocal: number = 0;
  partCserialNoLocal: number=9;
  date = new Date();
  del:any
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.ownershipInfo);
    this.getUser();
    this.tableCol();
    this.PartBtableCol();
    this.PartCtableCol();
    this.preparereportCData();
   
    this.heading="Section 2: Board of Directors/key Executive Officers"
 }
 tableCol(){
  this.cols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'400px'},
  { title: "nameOfDirector", name: "Name of Director", inpType: "text", editable: true,width:'400px'},
  { title: "occupation",name: "occupation*",inpType: "text", editable: true,width:'400px'},
  { title: "address",name: "Address#",inpType: "text",editable: true,width:'400px'},
  { title: "boardAppointmentDate",name: "Appointment To Board",inpType: "date",editable: true,width:'400px'},
  { title: "boardCommittee",name: "Board Commitee/s on which also a Member",inpType: "text",editable: true,width:'400px'},
  { title: "otherCompaniesHeld",name: "Other Companies in which Directorships Held",inpType: "text",editable: true,width:'400px'},
  { title: "natureOfInterest", name: "Nature of Interest in such other companies @",inpType: "text", editable: true,width:'400px'},
  { title: 'createdOn', name: 'Created On', width:'400px' },
  { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

PartBtableCol(){
  this.PartBcols = [
    { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'400px'},
    { title: "nameOfDirector", name: "Name of Director", inpType: "text", editable: true,width:'400px'},
    { title: "occupation",name: "occupation*",inpType: "text", editable: true,width:'400px'},
    { title: "address",name: "Address#",inpType: "text",editable: true,width:'400px'},
    { title: "boardAppointmentDate",name: "Appointment To Board",inpType: "date",editable: true,width:'400px'},
    { title: "boardCommittee",name: "Board Commitee/s on which also a Member",inpType: "text",editable: true,width:'400px'},
    { title: "otherCompaniesHeld",name: "Other Companies in which Directorships Held",inpType: "text",editable: true,width:'400px'},
    { title: "natureOfInterest", name: "Nature of Interest in such ohter companies @",inpType: "text", editable: true,width:'400px'},
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
];
}

PartCtableCol(){
  this.PartCcols = [
    { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'400px'},
    { title: "executive", name: "Executive (Chief of function)", inpType: "text", editable: false,width:'400px'},
    { title: "name",name: "Name",inpType: "text", editable: true,width:'400px'},
    { title: "designation",name: "Designation",inpType: "text",editable: true,width:'400px'},
    { title: "locatedAt",name: "Located at",inpType: "text",editable: true,width:'400px'},
    { title: "appointedsince",name: "Appointed Since",inpType: "date",editable: true,width:'400px'},
    
    { title: "telephoneNo",name: "Telephone No.",inpType: "number",editable: true,width:'400px'},
    { title: "faxNo", name: "Fax No.",inpType: "number", editable: true,width:'400px'},
    { title: "emailId", name: "E-mail ID",inpType: "number", editable: true,width:'400px'},
    { title: 'createdOn', name: 'Created On', width:'400px' },
    { title: 'createdBy', name: 'Created By', width:'400px' }
];
this.PartCSubcols = [
  { title: "serialNo", name: "", inpType:"number", editable: false ,width:'400px'},
  { title: "executive", name: "", inpType: "text", editable: true,width:'400px'},
  { title: "name",name: "",inpType: "text", editable: true,width:'400px'},
  { title: "designation",name: "",inpType: "text",editable: true,width:'400px'},
  { title: "locatedAt",name: "",inpType: "text",editable: true,width:'400px'},
  { title: "bankAppointedDate",name: "In the Bank",inpType: "date",editable: true,width:'400px'},
  { title: "incumbentPositionDate",name: "To the incumbent Position",inpType: "date",editable: true,width:'400px'},
  { title: "telephoneNo",name: "",inpType: "number",editable: true,width:'400px'},
  { title: "faxNo", name: "",inpType: "number", editable: true,width:'400px'},
  { title: "emailId", name: "",inpType: "text", editable: true,width:'400px'},
  { title: 'createdOn', name:"", width:'400px' },
  { title: 'createdBy', name:"", width:'400px' }
];
}


preparereportCData()
{
  this.reportCData=[
    {
      serialNo:1,executive:"Chief Executive Officer",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:2,executive:"Deputy CEO",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:3,executive:"Chief Operating Officer(Head of Operations)",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:4,executive:"Chief Financial Officer(Head of Treasury & Investments)",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:5,executive:"Chief Credit Officer",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:6,executive:"Chief of Accounts & Reporting functions",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:7,executive:"Chief of internal audit function",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:8,executive:"Chief (Forex) dealer",createdBy:this.user,createdOn:this.date
    },
    {
      serialNo:9,executive:"Supervisory Liaison / Compliance*",createdBy:this.user,createdOn:this.date
    }
  ]
}

 getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      this.preparereportCData();
      });
    }

    delete(index: number,itm): void 
    {
      if(itm=='PartA')
      {
      this.reportData.splice(index, index + 1); 
      }
      if(itm=='PartB')
      {
        this.reportBData.splice(index,index +1);
      } 
      if(itm=='PartC')
      {
        if(index>8){
          this.reportCData.splice(index,index +1);
        }
        
      } 
    } 

 
  gotoSection1(itm)
  {
    this.gotosection1generalInfo.emit(itm); 
  }

    add(itm,tablesData)
    {
      if(itm=='PartA'){
        for(var i=0;i<tablesData.length;i++){
            this.partAserialNoLocal=tablesData[i]['serialNo'];
        }
        this.partAserialNoLocal=this.partAserialNoLocal+1;
      }
      if(itm=='PartB'){
        for(var i=0;i<tablesData.length;i++){
          this.partBserialNoLocal=tablesData[i]['serialNo'];
      }
        this.partBserialNoLocal=this.partBserialNoLocal+1;
      }
      if(itm=='PartC'){
        for(var i=0;i<tablesData.length;i++){
          this.partCserialNoLocal=tablesData[i]['serialNo'];
      }
        this.partCserialNoLocal=this.partCserialNoLocal+1;
      }
      this.insertRow(itm);
    }

    submit()
    {
      let reportBPayload=[];
      for (var i = 0; i < this.reportData.length; i++) {
        var currentRow = this.reportData[i];
        {
          if(!currentRow.nameOfDirector){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Part A: Name Of Director is required",
            });
            return;
          }
        }
      }
      for (var i = 0; i < this.reportBData.length; i++) {
        var BcurrentRow = this.reportBData[i];
        {
          if(!BcurrentRow.nameOfDirector){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Part B: Name Of Director is required",
            });
            return;
          }
        }
      }
      for (var i = 0; i < this.reportCData.length; i++) {
        var CcurrentRow = this.reportCData[i];
        {
          if(!CcurrentRow.name){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Part C: Name is required",
            });
            return;
          }
        }
      }
      let rowData:any={};
      for (var i = 0; i < this.reportBData.length; i++) {
        rowData = this.reportBData[i];
      }
      rowData.createdDate=this.date;
      rowData.lastModifiedBy=this.user;
      rowData.lastModifiedDate=this.date;
      reportBPayload.push(rowData);
      console.log(this.reportBData);
      this.ownershipInfo.executiveDirectorRequests=this.reportData;
      this.ownershipInfo.nonExecutiveDirectorRequests=reportBPayload;
      this.ownershipInfo.managers=this.reportCData;
      this.ownershipInfo.status='SUBMITTED';
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
        this.httpService.postData(this.ownershipInfo, PATH.OWNERSHIPREPORTS_SUBMIT).subscribe((res) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Successfully",
          });
           this.gotoSection1('SUBMITTED');
        },
        (err) => {
          
          if (err.message?.length > 0) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Error while saving",
            });
          }
        })
        }
      })
    }
    
    insertRow(itm){
      var date = new Date();
      if(itm=='PartA')
      {
      this.reportData.push({
        createdBy: this.user, 
        createdOn: date,
        serialNo: this.partAserialNoLocal
      })
      }
      if(itm=='PartB')
    {
     this.reportBData.push({
      createdBy: this.user, 
      createdOn: date,
      serialNo: this.partBserialNoLocal

    })
    }
    if(itm=='PartC')
    {
     this.reportCData.push({
      createdBy: this.user, 
      createdOn: date,
      serialNo: this.partCserialNoLocal
     
    })
    }
   }

   validateEmail(){
     console.log(this.reportCData);
     for(var i=0;i<this.reportCData.length;i++){
       let emailcheck=this.reportCData[i].emailId;
     if(emailcheck!=undefined){
       if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailcheck)){
      this.isEmail=true;
       }
       else
       {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Enter Valid EmailID",
        });
        return;
       }
     }
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
