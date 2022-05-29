import { Component, OnInit,Input,Output,EventEmitter,HostListener} from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
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
  isMaker: boolean = false;
  isChecker: boolean = false;
  uri: string = "";
  isView:boolean=false;
  ownershipReportId;
  reportDataNo=0;
  reportBDataNo=0;
  rejectedFlag:boolean=false;
  constructor(
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
   console.log(this.ownershipInfo);
    this.route.params.subscribe((res) => {
      if (res.type == 'view') {
        this.getUser();
        this.isMaker = true;
        this.isView=true;
        this.getOwnershipRecordsbyId(res.id);
      }
      if (res.type == 'Approve/Reject') {
        this.getUser();
        this.isChecker = true;
        this.isView=true;
        this.getOwnershipRecordsbyId(res.id);
      }
      if (!res.id) {
        this.getUserWithReport();
      }
      
      this.tableCol();
      this.PartBtableCol();
      // this.preparereportCData();
      this.PartCtableCol();
    })
 
   
   
    this.heading="Section 2: Board of Directors/key Executive Officers"
 }
 tableCol(){
  this.cols = [
  { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'300px'},
  { title: "nameOfDirector", name: "Name of Director", inpType: "text", editable: true,width:'300px'},
  { title: "occupation",name: "Occupation",inpType: "text", editable: true,width:'300px'},
  { title: "address",name: "Address",inpType: "text",editable: true,width:'300px'},
  { title: "boardAppointmentDate",name: "Appointment To Board",inpType: "date",editable: true,width:'300px'},
  { title: "boardCommittee",name: "Board Commitee/s On Which Also a Member",inpType: "text",editable: true,width:'300px'},
  { title: "otherCompaniesHeld",name: "Other Companies In Which Directorships Held",inpType: "text",editable: true,width:'300px'},
  { title: "natureOfInterest", name: "Nature of Interest In Such Other Companies ",inpType: "text", editable: true,width:'300px'},
  { title: 'createdDate', name: 'Created On', width:'300px' },
  { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

PartBtableCol(){
  this.PartBcols = [
    { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'300px'},
    { title: "nameOfDirector", name: "Name of Director", inpType: "text", editable: true,width:'300px'},
    { title: "occupation",name: "Occupation*",inpType: "text", editable: true,width:'300px'},
    { title: "address",name: "Address#",inpType: "text",editable: true,width:'300px'},
    { title: "boardAppointmentDate",name: "Appointment To Board",inpType: "date",editable: true,width:'300px'},
    { title: "boardCommittee",name: "Board Commitee/s on which also a Member",inpType: "text",editable: true,width:'300px'},
    { title: "otherCompaniesHeld",name: "Other Companies in which Directorships Held",inpType: "text",editable: true,width:'300px'},
    { title: "natureOfInterest", name: "Nature of Interest in such ohter companies @",inpType: "text", editable: true,width:'300px'},
    { title: 'createdDate', name: 'Created On', width:'300px' },
    { title: 'createdBy', name: 'Created By', width:'300px' }
];
}

PartCtableCol(){
  this.PartCcols = [
    { title: "serialNo", name: "Sr. No.", inpType:"number", editable: false ,width:'300px'},
    { title: "executive", name: "Executive (Chief of Function)", inpType: "text", editable: false,width:'300px'},
    { title: "name",name: "Name",inpType: "text", editable: true,width:'300px'},
    { title: "designation",name: "Designation",inpType: "text",editable: true,width:'300px'},
    { title: "locatedAt",name: "Located At",inpType: "text",editable: true,width:'300px'},
    { title: "appointedsince",name: "Appointed Since",inpType: "date",editable: true,width:'300px'},
    
    { title: "telephoneNo",name: "Telephone No.",inpType: "number",editable: true,width:'300px'},
    { title: "faxNo", name: "Fax No.",inpType: "number", editable: true,width:'300px'},
    { title: "emailId", name: "E-mail ID",inpType: "number", editable: true,width:'300px'},
    { title: 'createdDate', name: 'Created On', width:'300px' },
    { title: 'createdBy', name: 'Created By', width:'300px' }
];
this.PartCSubcols = [
  { title: "serialNo", name: "", inpType:"number", editable: false ,width:'300px',},
  { title: "executive", name: "", inpType: "text", editable: true,width:'300px'},
  { title: "name",name: "",inpType: "text", editable: true,width:'300px'},
  { title: "designation",name: "",inpType: "text",editable: true,width:'300px'},
  { title: "locatedAt",name: "",inpType: "text",editable: true,width:'300px'},
  { title: "bankAppointedDate",name: "In The Bank",inpType: "date",editable: true,width:'300px'},
  { title: "incumbentPositionDate",name: "To The Incumbent Position",inpType: "date",editable: true,width:'300px'},
  { title: "telephoneNo",name: "",inpType: "number",editable: true,width:'300px'},
  { title: "faxNo", name: "",inpType: "number", editable: true,width:'300px'},
  { title: "emailId", name: "",inpType: "text", editable: true,width:'300px'},
  { title: 'createdDate', name:"", width:'300px' },
  { title: 'createdBy', name:"", width:'300px' }
];
}


preparereportCData()
{
  this.reportCData=[
    {
      serialNo:1,executive:"Chief Executive Officer",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:2,executive:"Deputy CEO",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:3,executive:"Chief Operating Officer(Head of Operations)",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:4,executive:"Chief Financial Officer(Head of Treasury & Investments)",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:5,executive:"Chief Credit Officer",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:6,executive:"Chief of Accounts & Reporting functions",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:7,executive:"Chief of Internal Audit Function",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:8,executive:"Chief (Forex) Dealer",createdBy:this.user,createdDate:this.date
    },
    {
      serialNo:9,executive:"Supervisory Liaison / Compliance",createdBy:this.user,createdDate:this.date
    }
  ]
}

 getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
    }
 getUserWithReport() {
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

    submit(itm)
    {
      let reportBPayload=[];
      
     
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
      let rowData:any={};
      for (var i = 0; i < this.reportBData.length; i++) {
        rowData = this.reportBData[i];
      }
      rowData.createdDate=this.date;
      rowData.lastModifiedBy=this.user;
      rowData.lastModifiedDate=this.date;
      reportBPayload.push(rowData);
      this.ownershipInfo.executiveDirectorRequests=this.reportData;
      this.ownershipInfo.nonExecutiveDirectorRequests=reportBPayload;
      this.ownershipInfo.managers=this.reportCData;
      console.log(this.ownershipInfo);
    
      if(itm=='SUBMITTED'){
      this.ownershipInfo.currentState='SUBMITTED';
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
    if(itm=='APPROVED'){
      this.ownershipInfo.currentState='APPROVED';
      this.ownershipInfo.ownershipReportId=this.ownershipReportId;
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
        this.httpService.patch(this.ownershipInfo, PATH.OWNERSHIPREPORTS_SUBMIT).subscribe((res) => {
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
    if(itm=='REJECTED'){
      console.log(this.isMaker);
      console.log(this.isChecker);
      if(this.isMaker){
        this.ownershipInfo.currentState='SUBMITTED';
      }
      if(this.isChecker){
        this.ownershipInfo.currentState='REJECTED';
      }
      this.ownershipInfo.ownershipReportId=this.ownershipReportId;
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
        this.httpService.patch(this.ownershipInfo, PATH.OWNERSHIPREPORTS_SUBMIT).subscribe((res) => {
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
    }
    
    insertRow(itm){
      var date = new Date();
      if(itm=='PartA')
      {
      this.reportData.push({
        createdBy: this.user, 
        createdDate: date,
        serialNo: this.partAserialNoLocal
      })
      }
      if(itm=='PartB')
    {
     this.reportBData.push({
      createdBy: this.user, 
      createdDate: date,
      serialNo: this.partBserialNoLocal

    })
    }
    if(itm=='PartC')
    {
     this.reportCData.push({
      createdBy: this.user, 
      createdDate: date,
      serialNo: this.partCserialNoLocal
     }
     )
    }
    
   }

   validateEmail(){
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
        return true;
       }
     }
    }
   }
   
   getOwnershipRecordsbyId(id){
    this.uri = PATH.OWNERSHIPREPORTS_ID+id;
    let branch = this.httpService.getData(this.uri);
    branch.subscribe((res) => {
      console.log(res);
      if (res.currentState == "REJECTED") {
        this.rejectedFlag = true;
      }
      this.reportData=res.executiveDirectors;
      this.reportBData=res.nonExecutiveDirectors;
      this.reportCData=res.managers;
      for(var i=0;i<this.reportCData.length;i++){
        this.reportCData[i]['serialNo']=i+1;
      }
      console.log(this.reportCData);
      this.cols.forEach(elm=>{
        elm.editable=false;
      })
      this.PartBcols.forEach(elm=>{
        elm.editable=false;
      })
      this.PartCSubcols.forEach(elm=>{
        elm.editable=false;
      })
     
      this.ownershipReportId=res.ownershipReportId
      console.log(res.managers);
      console.log(this.reportCData);
      this.reportData.forEach(elm => {
     
        this.reportDataNo=this.reportDataNo+1;
        elm.serialNo=this.reportDataNo;
      });
 
      this.reportBData.forEach(elm => {
        
        this.reportBDataNo=this.reportBDataNo+1;
        elm.serialNo=this.reportBDataNo;
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
