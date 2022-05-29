import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { EmailValidator, Validators } from "@angular/forms";
import { Router} from '@angular/router';
import { RoleAuthGuardService } from '../role-auth-guard.service';
import { parse } from "path";

@Component({
  selector: "app-reporting",
  templateUrl: "./reporting.component.html",
  styleUrls: ["./reporting.component.scss"],
})
export class ReportingComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = true;
  formData: any;
  serialNoLocal: number=0;
  todoReportNames: Array<any> = [];
  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
  isChecker:boolean=false;
  isMaker:boolean=false;
  changed:boolean=false;
  rejectedFlag:boolean=false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  accountNumber:any;
  submittedRecords: Array<any> = [];
  // maxDateValue=new Date();
  branchCodes: Array<any> = [];
  serialNumber:any;
  submittedToAdd:boolean=false;
  heading: string;
  user: any;
  role: any = {};
  checkedData: Array<any> = [];

  editMode:boolean= false;
  branchRefNo: any;
  comments: any;
  regexspecChar = "(/\-?\d*\.?\d{1,2}/)"
  regexCash =  "[^(\d{1,30}|\d{0,30}\.\d{0,2})$]";
  decimal_value:number;
  roles :  Array<any> = [] ;

  reportStatus: any;
  reportStatusFlag: boolean;
  pattern: string | RegExp
  fb: any;
  ngForm: any;
  status: "";
  checkedAll: boolean = false;
  tierCapital;
  
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router:Router
    ,private roleAuthGuard:RoleAuthGuardService
  ) {}

  add(): void {
    this.checkedData = [];
    if(this.rejectedFlag){
      this.rejectedFlag = false;
      this.display = []
    }
    this.submitted = true;
    if(this.submittedToAdd){
    this.display=[];
    this.submittedToAdd=false;
    }
    this.submitted = false;
    this.accountNumber="";
    // this.getUser();
    this.serialNoLocal=this.serialNoLocal+1;

     this.pushNewRowData();  
  }

  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
    this.getTier1Capital();
   this.deleteBar=true;  
    this.deleteBox=true;
    //  this.getRoleByReport();
    this.getUser();
    if(sessionStorage.getItem("gapRoles")){
      this.roles=JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if(this.role.ROLE_EXPOSURE_QCCP_MAKER){
      this.isMaker= true
    }

    if(this.role.ROLE_EXPOSURE_QCCP_CHECKER){
      this.isChecker=true
      this.getRecords('SUBMITTED');
    }
     this.heading="(CCPS) Format for reporting of exposures to QCCPs"
    this.tableNames = [
      {
        title: "serialNo",
        name: "S.no",
        subText: "",
        inpType: "number",
        editable: false,
        required: false,
      },
      {
        title: "date",
        name: "Date",
        subText: "",
        inpType: "date",
        editable: true,
        required: true,
      },
      {
        title: "nameOfQccp",
        name: "Name Of QCCP",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "tradeExposure",
        name: "Trade Exposure(In Lacs)",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
      },
      {
        title: "defaultFundExposure",
        name: "Default Fund Exposure(In Lacs)",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
      },
      {
        title: "others",
        name: "Others Exposure(In Lacs)",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
      },
      {
        title: "totalExposure",
        name: "Total Exposure",
        subText: "",
        inpType: "number",
        editable: false,
        required: true,
      },
      {
        title: "totalExposureRatio",
        name: "Total Exposure as a Percentage of Tier 1 capital",
        subText: "",
        inpType: "number",
        editable: false,
        required: true,
      },
      {
        title: "createdBy",
        name: "Created By",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "createdOn",
        name: "Created On",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      }    
    ];   
  }

  isSubmitted() {
    if (this.display) {
      this.display.map((o) => {
        if (o.status != "SUBMITTED") {
          this.submitted = true;
        } else {
        }
      });
    }
  }

  rejectedRecords(){
    this.checkedData=[];
    this.display=[];
    this.serialNoLocal = 0;
    this.submitted = true;
    this.rejectedFlag = true;
    this.getRecords('REJECTED');
  }

  getRecords(val){
    this.httpService.getData(PATH.EXPOSURE_QCCP_GET_RECORDS+"?status="+val).subscribe((res) => {
      this.display= res;
      this.display.forEach((elm,index)=>{
        elm.serialNo = index+1;
        elm.totalExposure = parseFloat(elm.tradeExposure) + parseFloat(elm.defaultFundExposure) + parseFloat(elm.others);
        elm.totalExposure=elm.totalExposure.toFixed(2);
        
      })
      if((val=='REJECTED' || val=='SUBMITTED') && this.display.length!=0){
        this.submitted = false;
      }
    });
  }

  getRoles(){
    this.roles.map((o) => {
      this.role[o.role]=true;
    });
  }
  confirm(val) {
    if(this.checkedData.length<=0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select any Record",
      });
       return
    }
    let msg ;
    if(val == "SUBMITTED"){
       msg = "Are you sure that you want to perform this submit?"
    }
    if(val == "REJECTED"){
      msg = "Are you sure that you want to perform this reject?"
   }
   if(val == "APPROVED"){
    msg = "Are you sure that you want to perform this approve?"
  }
    this.confirmationService.confirm({
        message: msg ,
     accept: () => {
       if(val == "SUBMITTED"){
        let data ={
          "comments": "",
         
        }
       }else {
        this.submitOrAPPROVOrREJECT(val)
       }
      }
    });
  }
  
  submitOrAPPROVOrREJECT(input){
    let submitFlag=true;
    if(input=="REJECTED" && !this.comments){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag=false;
    }
    let data:any = this.checkedData
    data.forEach((el)=>{
      el.status = input
    })
    if(submitFlag){
    this.httpService.postData( data,PATH.EXPOSURE_QCCP_SUBMIT).subscribe((res) => {
      this.submitted = true;
      let msg;
      if(input == "SUBMITTED"){
        msg = "Records Submited Successfully"
      }
      if(input == "REJECTED"){
        msg = "Records Rejected Successfully"
      }
      if(input == "APPROVED"){
        msg = "Records Approved Successfully"
      }
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: msg,
      });
      this.getRecords('SUBMITTED');
      this.checkedData = [];    
    },(err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        this.submit('SUBMITTED');
      })
    }
  }
 
  submit(val): void {   
    var patch=this.display.filter(o => o.edit).length>0?true:false;

          if(patch){
            this.submittedRecords=this.display.filter(o => o.edit);
          }else{
            this.submittedRecords=this.display;
          }  
          if(this.checkedData.length>0){
            this.submittedRecords = this.checkedData
          }
          this.submittedRecords.forEach(elm=>{
            elm.status = "SUBMITTED"
          })

for(var i=0;i<this.submittedRecords.length;i++){  
 var currentRow=this.submittedRecords[i];    
 if(currentRow.date==null ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Date  is required",
        });
        return;
      } if(currentRow.nameOfQccp==null ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Name of QCCP is required",
        });
         return;
}

if(currentRow.defaultFundExposure==null ){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Default Fund Exposure  is required",
  });
  return;
}let defaultFundExposure = currentRow.defaultFundExposure
// if (!((/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g).test(defaultFundExposure))) {
//   this.messageService.add({
//     severity: "error",
//     summary: "Error",
//     detail: "Enter Valid value in Default Funds Exposure!",
//   });
//   return;
//   }

}let defaultFundExposure = currentRow.defaultFundExposure
// (!((/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g)
if (!((/^(?:\d*\.\d{1,2}|\d+)$/g).test(defaultFundExposure))) {
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Enter Valid value in Default Funds Exposure!",
  });
  return;
  }

 if(currentRow.others==null ){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Others Exposure 4 is required",
  });
  return;
}let others = currentRow.others
// if (!((/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g).test(others))) {
if (!((/^(?:\d*\.\d{1,2}|\d+)$/g).test(others))) {
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Enter Valid value in Others Exposure!",
  });
  return;
  }

if(currentRow.totalExposure==null ){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Total Exposure as a Percentage of Tier 1 capital is required",
  });
   return;

}let totalExposure = currentRow.totalExposure
if (!((/^(?:\d*\.\d{1,2}|\d+)$/g).test(totalExposure))) {
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Enter Valid value in Total Exposure!",
  });
  return;
  }
  if(this.rejectedFlag && this.checkedData.length<=0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Please select any Record",
    });
     return
   }

  this.confirmationService.confirm({
    message: "Are you sure that you want to Submit?",
    accept: () => {
    var uri = !patch?PATH.EXPOSURE_QCCP_SUBMIT:PATH.PATCH_EDIT;    
     if(!patch)
      this.httpService
        .postData(this.submittedRecords, uri)
        .subscribe(
          (res) => {
            res.map( o => {
              o.edit=false;
            })
            this.submitted=true;
            this.changed = false;
            if(this.rejectedFlag){
              this.getRecords('REJECTED');
              this.checkedData=[];
            }
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.submittedToAdd=true;
            this.isSubmitted();
          },
          (err) => {
            this.changed = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          }
        );
       if(patch){
        this.httpService
        .patch(this.submittedRecords,uri).subscribe(
          (res) => {
            res.map( o => {
              o.edit=false;
            })
            this.submitted=true;
            this.changed = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.display=res;
            this.submittedToAdd=true;
            this.isSubmitted();
          },
          (err) => {
            this.changed = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          }
        );
      }
    },
    reject: () => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Terminated by User",
      });
    },
  });
  
}


delete(index: number): void {
  this.display.splice(index, index + 1);
}

getUser() {
  this.httpService.getData(PATH.GET_USER).subscribe(
    (res) => {
      this.user = res.userName;
    }
  )
}

getRoleByReport(ev){
    this.httpService.getData(PATH.POSITION_GET_ROLES+ev).subscribe((res) => {
      let reportRole = res[0];
      if(res){
        if(reportRole.includes("MAKER")){
          this.isMaker = true;
          this.isChecker = false;
        }
        if(reportRole.includes("CHECKER")){
          this.isChecker = true;
          this.isMaker = false; 
        }
      }
    });
}

pushNewRowData(){
     var date = new Date();
     this.display.push({
      newRecord:true, 
      edit:false, 
      status:'SUBMITTED',
      id : '',
      createdBy:this.user,
      createdOn: date,
      serialNo: this.serialNoLocal,
      tier1Capital: this.tierCapital
  });
} 

checkRecord(itm) {
  if (itm.checked) {
    this.checkedData.push(itm);
  } else {
    let index = this.checkedData.findIndex((o) => {
      if (o.id == itm.id) {
        return o;
      }
    });
    this.checkedData.splice(index, 1);
  }
}

checkAll() {
  if (this.checkedAll) {
    this.display.filter((o) => {
      o.checked = true;
    });
    Object.assign(this.checkedData, this.display);
  } else {
    this.display.filter((o) => {
      o.checked = false;
    });
    this.checkedData = [];
  }
}

getTotalExposure(row){
  if(row.tradeExposure){
    row.tradeExposure=parseFloat(row.tradeExposure).toFixed(2);
  }
  if(row.defaultFundExposure){
    row.defaultFundExposure=parseFloat(row.defaultFundExposure).toFixed(2);
  }
  if(row.others){
    row.others=parseFloat(row.others).toFixed(2);
  }
  
  if(row && row.tradeExposure && row.defaultFundExposure && row.others){
    
    row.totalExposure = parseFloat(row.tradeExposure) + parseFloat(row.defaultFundExposure) + parseFloat(row.others);
    row.totalExposure=(row.totalExposure).toFixed(2);
    
    row.totalExposureRatio = (row.totalExposure/this.tierCapital*100).toFixed(2)
 
  }
}

getTier1Capital(){
  this.httpService.getData(PATH.TIER1CAPITAL).subscribe((res) => {
    this.tierCapital = res;
  })
}

numberOnlyWithDismal(event:any){   
  const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
  let inputCharacter = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
    event.preventDefault();
  }
}

}
