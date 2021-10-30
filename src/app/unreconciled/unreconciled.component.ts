import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ThousandPipe } from '../services/number.pipe';
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { EmailValidator, Validators } from "@angular/forms";
import { Router } from '@angular/router'
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: 'app-unreconciled',
  templateUrl: './unreconciled.component.html',
  styleUrls: ['./unreconciled.component.scss']
})
export class UnreconciledComponent implements OnInit {
  heading: string;
  display: Array<any> = [];
  submittedToAdd: any;
  submitted: boolean = true;
  dateValue: Date;
  myGroup: any;
  changed: boolean = false;
  serialNoLocal: number=0;
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  dateheading:any;
  tableNames: Array<any> = [];
  user: any;
  checkedData: Array<any> = [];
  rejectedFlag:boolean=false;
  isChecker:boolean=false;
  isMaker:boolean=false;
  comments: any;
  role: any = {};
  roles :  Array<any> = [] ;
  checkedAll: boolean = false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  total:any={
    ourDebitsAmount: 0,
ourDebitsNo: 0,
ourCreditsAmount: 0,
ourCreditsNo: 0,
theirDebitsAmount: 0,
theirDebitsNo: 0,
theirCreditsAmount: 0,
theirCreditsNo: 0,
totalDebits1Amt: 0,
totalDebits1No: 0,
totalCreditsAmt: 0,
totalCreditsNo: 0
  }
  tableheadingNames: Array<any> = [];
OurDebitsNo:any;
  // constructor() { 
  //  { this.myGroup = new FormGroup({
  //     date: new FormControl('')
  //   });}
    
  
  // }
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService
    
  ) { }

  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
    this.deleteBar=true;  
    this.deleteBox=true;
    this.dateheading = new Date();
    this.dateheading=this.dateheading.toDateString();
    this.getUser();
    if(sessionStorage.getItem("gapRoles")){
      this.roles=JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if(this.role.ROLE_UNRECONCILED_MAKER){
      this.isMaker= true
    }

    if(this.role.ROLE_UNRECONCILED_CHECKER){
      this.isChecker=true
      this.getRecords('SUBMITTED');
    }


     this.heading="STATEMENT OF UNRECONCILED ENTRIES";

     this.tableheadingNames = [
      {
        title: "PERIOD",
        name: "PERIOD"
      },
      {
        title: "ourDebits",
        name: "OUR DEBITS"
      },
      {
        title: "theirDebits",
        name: "THEIR DEBITS"
      },
      {
        title: "totalDebits",
        name: "TOTAL DEBITS"
      },
      {
        title: "ourCredits",
        name: "OUR CREDITS"
       },
       {
        title: "theirCredits",
        name: "THEIR CREDITS"
       },
       {
        title: "totalCredits",
        name: "TOTAL CREDITS"
       }
  ];


     this.tableNames = [
      {
        title: "PERIODFrom",
        name: "FROM",
        inpType:"date",
        editable: true
      },
      {
        title: "ourDebitsNo",
        name: "NO",
        inpType: "number",
        editable: true,
      },
      {
        title: "ourDebitsAmount",
        name: "AMT",
        inpType: "number",
        editable: true,
      },
      {
        title: "theirDebitsNo",
        name: "NO",
        inpType: "number",
        editable: true,
       },
       {
        title: "theirDebitsAmount",
        name: "AMT",
        inpType: "number",
        editable: true,
       },
       {
        title: "totalDebits1No",
        name: "NO",
        inpType: "number",
        editable: false,
       },
       {
        title: "totalDebits1Amt",
        name: "AMT",
        inpType: "number",
        editable: false,

      },
      {
        title: "ourCreditsNo",
        name: "NO",
        inpType: "number",
        editable: true,
      },
      {
        title: "ourCreditsAmount",
        name: "AMT",
        inpType: "number",
        editable: true,
       },
       {
        title: "theirCreditsNo",
        name: "NO",
        inpType: "number",
        editable: true,
       },
       {
        title: "theirCreditsAmount",
        name: "AMT",
        inpType: "number",
        editable: true,
       },
       {
        title: "totalCreditsNo",
        name: "NO",
        inpType: "number",
        editable: false,
       },
       {
        title: "totalCreditsAmt",
        name: "AMT",
        inpType: "number",
        editable: false,
       },
       {
        title: "createdBy",
        name: "Created By",
        subText: "",
        inpType: "text",
        editable: false,        
      },
      {
        title: "createdOn",
        name: "Created On",
        subText: "",
        inpType: "text",
        editable: false,
      } 
     ];
}

totaladdition(itm,name){
    
if(name.title=='ourDebitsNo'){
  this.total.ourDebitsNo=0;
}   
if(name.title=='ourDebitsAmount'){
  this.total.ourDebitsAmount=0;
}
if(name.title=='theirDebitsNo'){
  this.total.theirDebitsNo=0;    
}   
if(name.title=='theirDebitsAmount'){
  this.total.theirDebitsAmount=0;
}
if(name.title=='totalDebits1No'){
  this.total.totalDebits1No=0; 
}   
if(name.title=='totalDebits1Amt'){
  this.total.totalDebits1Amt=0;
}
if(name.title=='ourCreditsNo'){
  this.total.ourCreditsNo=0;
}   
if(name.title=='ourCreditsAmount'){
  this.total.ourCreditsAmount=0;
}
if(name.title=='theirCreditsNo'){
  this.total.theirCreditsNo=0;
}   
if(name.title=='theirCreditsAmount'){
  this.total.theirCreditsAmount=0;
}
if(name.title=='totalCreditsNo'){
  this.total.totalCreditsNo=0;
}   
if(name.title=='totalCreditsAmt'){
  this.total.totalCreditsAmt=0;
}

this.display.forEach(elm =>{ 
  if(name.title=='ourDebitsAmount' ||  name.title=='theirDebitsAmount' ){
    if(elm.ourDebitsAmount == undefined || elm.ourDebitsAmount==''){
      elm.ourDebitsAmount=0;
    }    
    if(elm.theirDebitsAmount == undefined || elm.theirDebitsAmount==''){
      elm.theirDebitsAmount=0;
    }    
    elm.totalDebits1Amt=parseFloat(elm.ourDebitsAmount)+parseFloat(elm.theirDebitsAmount);
  } 
       
  if(name.title=='ourDebitsNo' ||  name.title=='theirDebitsNo' )  {
    if(elm.ourDebitsNo == undefined || elm.ourDebitsNo==''){
      elm.ourDebitsNo=0;
    }    
    if(elm.theirDebitsNo == undefined || elm.theirDebitsNo==''){
      elm.theirDebitsNo=0;
    }    
    elm.totalDebits1No=parseInt(elm.ourDebitsNo)+parseInt(elm.theirDebitsNo);
     
  } 

        if(name.title=='ourCreditsNo' ||  name.title=='theirCreditsNo' )  {
          
          if(elm.ourCreditsNo == undefined || elm.ourCreditsNo=='')
          {
            elm.ourCreditsNo=0;
          }    
          if(elm.theirCreditsNo == undefined || elm.theirCreditsNo=='')
          {
            elm.theirCreditsNo=0;
          }    
           elm.totalCreditsNo=parseInt(elm.ourCreditsNo)+parseInt(elm.theirCreditsNo);   // this is used to assign a value to total field of each column

          } 
          if(name.title=='ourCreditsAmount' || name.title=='theirCreditsAmount' )  {
          
            if(elm.ourCreditsAmount == undefined || elm.ourCreditsAmount=='')
            {
              elm.ourCreditsAmount=0;
            }    
            if(elm.theirCreditsAmount == undefined || elm.theirCreditsAmount=='')
            {
              elm.theirCreditsAmount=0;
            }    
             elm.totalCreditsAmt=parseFloat(elm.ourCreditsAmount)+parseFloat(elm.theirCreditsAmount);   // this is used to assign a value to total field of each column
  
            } 

        if(elm.ourDebitsAmount=='')
        {
          elm.ourDebitsAmount="0";
        }
        if(elm.ourDebitsAmount && name.title=='ourDebitsAmount' ){
          this.total.ourDebitsAmount=this.total.ourDebitsAmount+parseFloat(elm.ourDebitsAmount);
         
          this.total.totalDebits1Amt=this.total.ourDebitsAmount+this.total.theirDebitsAmount;

        }
        if(elm.ourDebitsNo=='')
        {
          elm.ourDebitsNo="0";
        }
        if(elm.ourDebitsNo && name.title=='ourDebitsNo'){
          this.total.ourDebitsNo=this.total.ourDebitsNo+parseInt(elm.ourDebitsNo);
            this.total.totalDebits1No=this.total.ourDebitsNo+ this.total.theirDebitsNo; 
         }

        if(elm.ourCreditsAmount=='')
        {
          elm.ourCreditsAmount="0";
        }
        if(elm.ourCreditsAmount && name.title=='ourCreditsAmount' ){
          this.total.ourCreditsAmount=this.total.ourCreditsAmount+parseFloat(elm.ourCreditsAmount);
          this.total.totalCreditsAmt=this.total.ourCreditsAmount+this.total.theirCreditsAmount;
        }
        if(elm.ourCreditsNo=='')
        {
          elm.ourCreditsNo="0";
        }
        if(elm.ourCreditsNo && name.title=='ourCreditsNo' ){
          this.total.ourCreditsNo=this.total.ourCreditsNo+parseInt(elm.ourCreditsNo);
          this.total.totalCreditsNo=this.total.ourCreditsNo+this.total.theirCreditsNo;
          
        }
        if(elm.theirDebitsAmount=='')
        {
          elm.theirDebitsAmount="0";
        }
        if(elm.theirDebitsAmount && name.title=='theirDebitsAmount' ){
          this.total.theirDebitsAmount=this.total.theirDebitsAmount+parseFloat(elm.theirDebitsAmount);
          this.total.totalDebits1Amt=this.total.ourDebitsAmount+this.total.theirDebitsAmount;
        }
        if(elm.theirDebitsNo=='')
        {
          elm.theirDebitsNo="0";
        }
        if(elm.theirDebitsNo && name.title=='theirDebitsNo' ){
          this.total.theirDebitsNo=this.total.theirDebitsNo+parseInt(elm.theirDebitsNo);
          this.total.totalDebits1No=this.total.ourDebitsNo+this.total.theirDebitsNo;
        }
        if(elm.theirCreditsAmount=='')
        {
          elm.theirCreditsAmount="0";
        }
        if(elm.theirCreditsAmount && name.title=='theirCreditsAmount' ){
          this.total.theirCreditsAmount=this.total.theirCreditsAmount+parseFloat(elm.theirCreditsAmount);
          this.total.totalCreditsAmt=this.total.ourCreditsAmount+this.total.theirCreditsAmount;
        }
        if(elm.theirCreditsNo=='')
        {
          elm.theirCreditsNo="0";
        }
        if(elm.theirCreditsNo && name.title=='theirCreditsNo' ){
          this.total.theirCreditsNo=this.total.theirCreditsNo+parseFloat(elm.theirCreditsNo);
          this.total.totalCreditsNo=this.total.ourCreditsNo+this.total.theirCreditsNo;
        }
        if(elm.totalDebits1Amt && name.title=='totalDebits1Amt' ){
          this.total.totalDebits1Amt=this.total.totalDebits1Amt+parseFloat(elm.totalDebits1Amt);
        }
        if(elm.totalDebits1No && name.title=='totalDebits1No' ){
          this.total.totalDebits1No=this.total.totalDebits1No+parseFloat(elm.totalDebits1No);
        }
        if(elm.totalCreditsAmt && name.title=='totalCreditsAmt' ){
          this.total.totalCreditsAmt=this.total.totalCreditsAmt+parseFloat(elm.totalCreditsAmt);
        }
        if(elm.totalCreditsNo && name.title=='totalCreditsNo' ){
          this.total.totalCreditsNo=this.total.totalCreditsNo+parseFloat(elm.totalCreditsNo);
        }
      })
      console.log(this.total);
  }

  add(): void{
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

    this.serialNoLocal=this.serialNoLocal+1;
    this.submitted = false;
    this.rejectedFlag=false;
      this.insertRow();
    }

  delete(index: number): void 
  {
    this.display.splice(index, index + 1);
  } 

    getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      console.log(res)
      console.log(this.user);
      });
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
  insertRow(){
    var date = new Date();
    this.display.push({
      createdBy: this.user, 
      createdOn: date,
      serialNo: this.serialNoLocal,
    })
  }
 
  rejectedRecords(){
    this.checkedData=[];
    this.display=[];
    this.serialNoLocal = 0;
    this.submitted = true;
    this.rejectedFlag = true;
    this.getRecords('REJECTED');
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
    this.httpService.postData( data,PATH.UNRECONCILED_SUBMIT).subscribe((res) => {
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

  getRecords(val){
    this.httpService.getData(PATH.GET_UNRECONCILED_DATA_BY_STATUS+"?status="+val).subscribe((res) => {
      this.display= res;
      this.display.forEach((elm,index)=>{
        elm.PERIODFrom = [new Date(elm.startDate), new Date(elm.endDate)]
        elm.totalDebits1No= parseInt(elm.ourDebitsNo) + parseInt(elm.theirDebitsNo) ;
        elm.totalDebits1Amt= parseInt(elm.ourDebitsAmount) + parseInt(elm.theirDebitsAmount) ;
        elm.totalCreditsNo = parseInt(elm.ourCreditsNo) + parseInt(elm.theirCreditsNo) ;
        elm.totalCreditsAmt=parseInt(elm.ourCreditsAmount) + parseInt(elm.theirCreditsAmount) ;
        // elm.createdOn = elm.createdDate;
      })
      if((val=='REJECTED' || val=='SUBMITTED') && this.display.length!=0){
        this.submitted = false;
      }
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
  submit(val) {  
    let payload=[];
    var date = new Date();
    this.display.forEach(elm=>{
    let startDate=date;
    let endDate=date;
    let rowData:any={};

    rowData.createdBy=elm.createdBy;
    rowData.createdDate=elm.createdDate;
    rowData.endDate=endDate;
    rowData.lastModifiedBy=elm.createdBy;
    rowData.lastModifiedDate=elm.createdDate;
    rowData.ourCreditsAmount=elm.ourCreditsAmount;
    rowData.ourCreditsNo=elm.ourCreditsNo;
    rowData.ourDebitsAmount=elm.ourDebitsAmount;
    rowData.ourDebitsNo=elm.ourDebitsNo;
    rowData.startDate=startDate,
    rowData.theirCreditsAmount=elm.theirCreditsAmount;
    rowData.theirCreditsNo=elm.theirCreditsNo;
    rowData.theirDebitsAmount=elm.theirDebitsAmount;
    rowData.theirDebitsNo=elm.theirDebitsNo;
    
    if (!elm.PERIODFrom) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "PERIOD is required",
      });
      return;
    }

    if (!rowData.ourDebitsNo) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "OUR DEBITS number is required",
      });
      return;
    }

    if (!rowData.ourDebitsAmount) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "OUR DEBITS Amount is required",
      });
      return;
    }

    if (!rowData.theirDebitsNo) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "THEIR DEBITS Number is required",
      });
      return;
    }

    if (!rowData.theirDebitsAmount) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "THEIR DEBITS Amount is required",
      });
      return;
    }

    if (!rowData.ourCreditsNo) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "OUR CREDITS number is required",
      });
      return;

    }
    
      if (!rowData.ourCreditsAmount) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "OUR CREDITS Amount is required",
        });
        return;
      }
      
      if (!rowData.theirCreditsNo) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "THEIR CREDITS number is required",
        });
        return;
      }

      if (!rowData.theirCreditsAmount) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "THEIR CREDITS Amount is required",
        });
        return;
      }
      
      
        payload.push(rowData); 
      })

      if(this.rejectedFlag && this.checkedData.length<=0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Please select any Record",
        });
         return
       }

      if(this.checkedData.length>0){
        payload = this.checkedData
      }

      payload.forEach(elm => {
        elm.status = 'SUBMITTED'
      });

     if(payload.length>0)
      {
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          {
            this.httpService.postData( payload,PATH.UNRECONCILED_SUBMIT).subscribe((res) => {
              this.submitted = true;
              if(this.rejectedFlag){
                this.getRecords('REJECTED');
                this.checkedData=[];
              }
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
            },(err) => {
              this.changed = false;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: err.message,
              });
            })
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

