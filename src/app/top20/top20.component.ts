import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { Table } from "primeng/table";
import { Title, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-top20',
  templateUrl: './top20.component.html',
  styleUrls: ['./top20.component.scss']
})
export class Top20Component implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  reportNames : Array<any> =[] ;
  reportName: any;
  dropDown : any = {};
  accounts : Array<any> = [];
  dropdown:any={}; 
  reportType = [];
  cols: any[];
  tableType1 : boolean=false;
  tableType2 : boolean=false;
  tableType3 : boolean=false;
  tableType4 : boolean=false;
  comments: any;
  row : boolean=false;
  table : boolean=false;
  confirmation : boolean=false;
   formData ;
  downloadUrl: string = null;
  checker : boolean=false;
  errorMessage;
  quarters : any;
  isMaker : boolean=true;
  isChecker : boolean=false;
  editMode : boolean=false;
  title;
  value: any;
  roles:Array<any>=[]
  reportStatusFlag:boolean=false;
  reportStatus:string;
  reportPrevQuarter:string;
  map = new Map();
  pageHeading : string;


  constructor(
    private route: ActivatedRoute,
    private ti: Title,
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService, 
    private elementRef: ElementRef,
    private fb:FormBuilder,
    private roleAuthGuard:RoleAuthGuardService
  ) { 
    
  }

  ngOnInit(): void {
      this.roleAuthGuard.canActivate();
    if(window.sessionStorage.getItem("gapRoles")){
      this.roles=JSON.parse(sessionStorage.getItem("gapRoles")).map((o)=>{return o.role});
    }

     this.isMaker=true;
    //  this.title = "heading"

    this.prepareForm();

    this.httpService.getData(PATH.TOP20_REPORT_NAMES).subscribe((res) => {
    // this.prepareDropdown(res);
    this.dropdown.report = res;
    });

    this.quarters = [{label:"Apr -June", value:"Q1"},{label:"July - Sep",value:"Q2"},{label:"Oct - Dec",value:"Q3"} ,{label:"Jan - March",value:"Q4"}  ]
    this.dropdown.years = ["2024-2025","2023-2024", "2022-2023", "2021-2022", "2020-2021", "2019-2020", "2018-2019"]


  }

  newForm:FormGroup;
  prepareForm(){
    this.newForm = this.fb.group({
      "report" : ['',Validators.required],
      "years" : ['',Validators.required],
      "quarters" : ['',Validators.required]

    })
  }
  onInput(event) {
    let newValue = event.value;
   /* Maybe you can add your validation code in this event. Exp; */
    if (newValue < 1) {
        newValue = 1;
    }
    else if (newValue > 100000) {
        newValue = 100000;
    }
    /****/

    this.value = newValue;
}

 
  submitForm(){
  let rtpName = this.newForm.controls['report'].value;
  this.formData = this.newForm.value;
    if(this.newForm.valid){
      this.report(this.formData.report)
      this.reportName=this.newForm.controls['report'].value
      this.getAccountsData();
    }else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "All fields are required",
      });
      return;
    }
  }

getAccountsData(){
  let data={"finYear": this.newForm.controls['years'].value,"quarter": this.newForm.controls['quarters'].value,"reportName":this.newForm.controls['report'].value}
  this.httpService.getData(PATH.TOP20_GET,data).subscribe((res) => {
  this.accounts=res.accountsResponseList;
    
    this.reportStatus = res.reportStatus;
    this.reportPrevQuarter = res.reportStatusOfPreviousQuarter;
    this.comments  = res.comments;
    this.table= true;
   
    if(this.reportStatus==null || this.reportStatus=='UPDATED' || this.reportStatus=='REJECTED' || this.reportStatus=='APPROVED' || this.reportStatus=='SUBMITTED'){
      this.reportStatusFlag = true;
    }else{
      this.reportStatusFlag = false;
    }

  });
}

 
  prepareDropdown(data){
    this.reportType = data;
    this.dropdown.report = this.reportType.map(i => {return {label:i,value:i}})    
  }


 
  report(val){
    let type1 = [ "AccountsStressed", "AccountsWatchList", "AccountsSpecialRegulatoryStd", "AccountsSpecialRegulatoryNPA", "AccountsBorrowalStd", "AccountsBorrowalNPA"]
    let type2 = ["AccountsDCCODeferment","AccountsRPImplementedStd","AccountsRPImplementedNPA"];
    let type3 = ["AccountsRPNotImplementedStd","AccountsRPNotImplementedNPA"];
    let type4 = ["AccountsIBCStd","AccountsIBCNPA"];
    if(type1.find(elm => elm == val)){
      this.tableType1 = true
      this.tableType2 = false
      this.tableType3 = false
      this.tableType4 = false
      return;
    }
    if(type2.find(elm => elm == val)){
      this.tableType1 = false
      this.tableType2 = true
      this.tableType3 = false
      this.tableType4 = false
      return
    }
    if(type3.find(elm => elm == val)){
      this.tableType1 = false
      this.tableType2 = false
      this.tableType3 = true
      this.tableType4 = false
      return
    }
    if(type4.find(elm => elm == val)){
      this.tableType1 = false
      this.tableType2 = false
      this.tableType3 = false
      this.tableType4 = true
      return
    }
  }
  save(){

    let data ={
      "accountsRequestList": this.accounts,
      "comments": "",
      "finYear": this.formData.years,
      "quarter": this.formData.quarters,
      "reportName":this.formData.report
    }

    this.httpService.patch(data, PATH.TOP20_PATCH).subscribe((res) => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Records Updated Successfully",
      });
      this.getAccountsData();
    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        this.getAccountsData();
      })
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
    let data ={"finYear":this.formData.years,
    "quarter":this.formData.quarters,
    "reportName":this.formData.report,
    "comments":this.comments,
    "status":input}

    if(submitFlag){
    this.httpService.postData( data,PATH.TOP20_SUBMIT_APPROVE_REJECT).subscribe((res) => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Records Updated Successfully",
      });
      
      this.getAccountsData();      
      
    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        this.getAccountsData();
      })
    }
  }
  
  confirm(val) {
    let msg ;
      // same for APPROVED and REJECTED
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
         this.save()
         this.submitOrAPPROVOrREJECT(val)
        this.submitForm();
       }else {
        this.submitOrAPPROVOrREJECT(val)
       }
       

            //Actual logic to perform a confirmation
        }
    });
}
download(){
  if(this.formData.report == "AccountsBorrowalStd"){
  this.downloadUrl =  "./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
  }else if(this.formData.report =="AccountsBorrowalNPA"){
    this.downloadUrl ="./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
  }
  else if(this.formData.report =="AccountsSpecialRegulatoryStd"){
    this.downloadUrl ="./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
    }else if(this.formData.report =="AccountsSpecialRegulatoryNPA"){
        this.downloadUrl ="./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
    }else if(this.formData.report =="AccountsStressed"){
        this.downloadUrl ="./assets/files/Top 20 Stressed Accounts Identified by Bank.xlsx";
    }else if(this.formData.report =="AccountsWatchList"){
        this.downloadUrl ="./assets/files/Top 20 Watch List Accounts Identified by Bank.xlsx";
    }else if(this.formData.report =="AccountsRPImplementedStd"){
        this.downloadUrl ="./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
    }else if(this.formData.report =="AccountsRPImplementedNPA"){
        this.downloadUrl ="./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
    }else if(this.formData.report =="AccountsRPNotImplementedStd"){
        this.downloadUrl ="./assets/files/List of accounts where RP could not be implemented.xlsx";
    }else if(this.formData.report =="AccountsRPImplementedNPA"){
        this.downloadUrl ="./assets/files/List of accounts where RP could not be implemented.xlsx";
    }else if(this.formData.report =="AccountsDCCODeferment"){
        this.downloadUrl ="./assets/files/Top 20 Accounts where deferment in DCCO has been allowed.xlsx";
    }else if(this.formData.report =="AccountsIBCStd"){
        this.downloadUrl ="./assets/files/Accounts currently in IBC.xlsx";
    }else  if(this.formData.report =="AccountsIBCNPA"){
        this.downloadUrl ="./assets/files/Accounts currently in IBC.xlsx";
    }



  let link = document.createElement("a");
  link.setAttribute("type", "hidden");
  link.href = this.downloadUrl;
  link.click();
  link.remove();

}


ngAfterViewChecked() {
  this.elementRef.nativeElement.parentElement.addEventListener('click', (e) => {
    if (e.target.tagName === 'TD') {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault()
    }
  });
  // this.elementRef.nativeElement.parentElement.addEventListener('dblclick',(e) => {

  // });

}
event(e) {
  e.stopPropagation()
}



upload(){
  this.fileInput.nativeElement.click();
}


uploadFile() {
  this.editMode=true;
  const formData = new FormData();
  const fileBrowser = this.fileInput.nativeElement;
  formData.append("file", fileBrowser.files[0]);  
  formData.append("finYear", this.formData.years);
  formData.append("quarter", this.formData.quarters);
  formData.append("reportName", this.formData.report);

  this.httpService.postData(formData, PATH.TOP20_FILE_IMPORT).subscribe((res) => {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Uploaded Successfully",
    });
    this.getAccountsData()
  }, err => {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: err.message,
    });
    this.getAccountsData();
  });
}
getRoleByReport(ev){
  let reportName = ev.value

  this.httpService.getData(PATH.TOP20_GET_ROLES+reportName).subscribe((res) => {
    let reportRole = res[0];
    if(res){
      if(reportRole.includes("MAKER")){
        this.isMaker = true;
        this.checker = false;
        
      }
      if(reportRole.includes("CHECKER")){
        this.isChecker = true;
        this.isMaker = false; 
        console.log('Is checker')
      }
    }
  });

}



}
