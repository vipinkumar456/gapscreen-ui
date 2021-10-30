import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PATH } from '../app.constants';
import { HttpService } from '../services/http.service';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-top20-new',
  templateUrl: './top20-new.component.html',
  styleUrls: ['./top20-new.component.scss']
})
export class Top20NewComponent implements OnInit {

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;

  newForm:FormGroup;
  dropdown: any = {};
  quarters;
  formData: any;
  accounts : Array<any> = [];
  tableType1;
  tableType2;
  tableType3;
  tableType4;
  reportStatusFlag:boolean=false;
  reportStatus: any;
  isChecker:boolean=false;
  isMaker:boolean=false;
  downloadUrl: string = null;
  comments;
  isTableData:boolean=false;
  pageHeading;
  statusOfPreviousQuarter;
  previousQuarterFlag:boolean=false;
  
    
  constructor(private httpService: HttpService, private confirmationService:ConfirmationService, private messageService: MessageService, private fb:FormBuilder,
    private roleAuthGuard:RoleAuthGuardService) { }

  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.prepareForm();
    this.prepareDropdown();
  }

  
  prepareForm(){
    this.newForm = this.fb.group({
      "reportName" : ['',Validators.required],
      "finYear" : ['',Validators.required],
      "quarter" : ['',Validators.required]

    })
  }


  submitForm(){
    this.formData = this.newForm.value;
    console.log(this.formData);
      if(this.newForm.valid){
        this.httpService.getData(PATH.TOP20_GET,this.formData).subscribe((res) => {
        this.statusOfPreviousQuarter = res.reportStatusOfPreviousQuarter;
        this.accounts = res.accountsResponseList;
        this.reportStatus = res.reportStatus;
        this.comments = res.comments;
        this.isTableData = true;
        this.getRoleByReport(this.formData.reportName);
        this.getTableHeading(this.formData.reportName);
        
        if((this.formData.quarter != 'Q1' && this.statusOfPreviousQuarter != 'SUBMITTED') && this.statusOfPreviousQuarter != 'APPROVED'){
          this.previousQuarterFlag = true;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Previous quarter data is not approved",
          });
        }else{
          this.previousQuarterFlag = false;
        }

        if(this.isMaker && this.reportStatus == 'SUBMITTED'){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "This quarter data is already submitted",
          });
        }

        if(this.isChecker && this.reportStatus == 'APPROVED'){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "This quarter data is already approved",
          });
        }

        if(this.reportStatus==null || this.reportStatus=='CREATED' || this.reportStatus=='UPDATED' || this.reportStatus=='REJECTED'){
          this.reportStatusFlag = true;
        }
      })
      }else {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "All fields are required",
        });
        return;
      }
  }

  getReportType(val){
    console.log(val)
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

  getRoleByReport(ev){
    console.log(ev)  
    this.httpService.getData(PATH.TOP20_GET_ROLES+ev).subscribe((res) => {
      let reportRole = res[0];
      if(res){
        console.log(reportRole)
        // reportRole.toUpperCase();
        if(reportRole.includes("MAKER")){
          this.isMaker = true;
          this.isChecker = false;
          console.log('Is Maker')
        }
        if(reportRole.includes("CHECKER")){
          this.isChecker = true;
          this.isMaker = false; 
          console.log('Is checker')
        }
      }
    });
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
    // this.value = newValue;
}

download(){
  console.log(this.formData);
  if(this.formData.reportName == "AccountsBorrowalStd"){
    this.downloadUrl =  "./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
  }
  if(this.formData.reportName =="AccountsBorrowalNPA"){
    this.downloadUrl ="./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
  }
  if(this.formData.reportName =="AccountsSpecialRegulatoryStd"){
    this.downloadUrl ="./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
  }
  if(this.formData.reportName =="AccountsSpecialRegulatoryNPA"){
    this.downloadUrl ="./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
  }
  if(this.formData.reportName =="AccountsStressed"){
    this.downloadUrl ="./assets/files/Top 20 Stressed Accounts Identified by Bank.xlsx";
  }
  if(this.formData.reportName =="AccountsWatchList"){
    this.downloadUrl ="./assets/files/Top 20 Watch List Accounts Identified by Bank.xlsx";
  }
  if(this.formData.reportName =="AccountsRPImplementedStd"){
    this.downloadUrl ="./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
  }
  if(this.formData.reportName =="AccountsRPImplementedNPA"){
    this.downloadUrl ="./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
  }
  if(this.formData.reportName =="AccountsRPNotImplementedStd"){
    this.downloadUrl ="./assets/files/List of accounts where RP could not be implemented.xlsx";
  }
  if(this.formData.reportName =="AccountsRPNotImplementedNPA"){
    this.downloadUrl ="./assets/files/List of accounts where RP could not be implemented.xlsx";
  }
  if(this.formData.reportName =="AccountsDCCODeferment"){
    this.downloadUrl ="./assets/files/Top 20 Accounts where deferment in DCCO has been allowed.xlsx";
  }
  if(this.formData.reportName =="AccountsIBCStd"){
    this.downloadUrl ="./assets/files/Accounts currently in IBC.xlsx";
  }
  if(this.formData.reportName =="AccountsIBCNPA"){
    this.downloadUrl ="./assets/files/Accounts currently in IBC.xlsx";
  }
  let link = document.createElement("a");
  link.setAttribute("type", "hidden");
  link.href = this.downloadUrl;
  link.click();
  link.remove();
}

upload(){
  this.fileInput.nativeElement.click();
}


uploadFile() {
  // this.editMode=true;
  const formData = new FormData();
  const fileBrowser = this.fileInput.nativeElement;
  console.log(fileBrowser.files[0]);
  formData.append("file", fileBrowser.files[0]);  
  formData.append("finYear", this.formData.finYear);
  formData.append("quarter", this.formData.quarter);
  formData.append("reportName", this.formData.reportName);

  this.httpService.postData(formData, PATH.TOP20_FILE_IMPORT).subscribe((res) => {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Uploaded Successfully",
    });
    this.fileInput.nativeElement.value = ""
    this.submitForm()
  },err => {
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Your excel file is not valid, at least one row is required",
    });
    this.fileInput.nativeElement.value = ""
    this.submitForm();
  });
}


save(){

  let data ={
    "accountsRequestList": this.accounts,
    "comments": "",
    "finYear": this.formData.finYear,
    "quarter": this.formData.quarter,
    "reportName":this.formData.reportName
  }

  this.httpService.patch(data, PATH.TOP20_PATCH).subscribe((res) => {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Records Saved Successfully",
    });
    this.submitForm();
  },
    (err) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
      this.submitForm();
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
  let data ={
    "finYear":this.formData.finYear,
    "quarter":this.formData.quarter,
    "reportName":this.formData.reportName,
    "comments":this.comments,
    "status":input
  }

  if(submitFlag){
  this.httpService.postData( data,PATH.TOP20_SUBMIT_APPROVE_REJECT).subscribe((res) => {
    let reportStatus = res.reportStatus
    this.reportStatus = reportStatus
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

    if(reportStatus=='SUBMITTED' || reportStatus=='APPROVED' ){
      this.reportStatusFlag =false;
    }      
  },(err) => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
      this.submitForm();
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
      let data ={
        "accountsRequestList": this.accounts,
        "comments": "",
        "finYear": this.formData.finYear,
        "quarter": this.formData.quarter,
        "reportName":this.formData.reportName
      }
      this.httpService.patch(data, PATH.TOP20_PATCH).subscribe((res) => {
        this.submitOrAPPROVOrREJECT(val)
      })
     }else {
      this.submitOrAPPROVOrREJECT(val)
     }
    }
  });
}

prepareDropdown(){
    this.httpService.getData(PATH.TOP20_REPORT_NAMES).subscribe((res) => {
      if(res){
        this.dropdown.report = res.map(i => {return {label:i,value:i}})
      }
    });
    this.quarters = [{label:"Apr -June", value:"Q1"},{label:"July - Sep",value:"Q2"},{label:"Oct - Dec",value:"Q3"} ,{label:"Jan - March",value:"Q4"}  ]
    let years = ["2024-2025","2023-2024", "2022-2023", "2021-2022", "2020-2021", "2019-2020", "2018-2019"]
    this.dropdown.years = years.map(i => {return {label:i,value:i}})
}

getTableHeading(val){
  let tableHeading = [
    {level:"AccountsBorrowalStd",value:"Top 20 Borrowal accounts where forensic audit is on-going-Standard"},
    {level:"AccountsBorrowalNPA", value:"Top 20 Borrowal accounts where forensic audit is on-going - NPA"},
    {level:"AccountsSpecialRegulatoryStd", value:"List of accounts where special regulatory has been implemented - Standard"},
    {level:"AccountsSpecialRegulatoryNPA", value:"List of accounts where special regulatory has been implemented - NPA"},
    {level:"AccountsStressed", value:"Top 20 Stressed accounts identified by bank"},
    {level:"AccountsWatchList", value:"Top 20 Watch list accounts identified by bank"},
    {level:"AccountsRPImplementedStd", value:"List of accounts where RP has been implemented - Standard"},
    {level:"AccountsRPImplementedNPA", value:"List of accounts where RP has been implemented - NPA"},
    {level:"AccountsRPNotImplementedStd", value:"List of accounts where RP could not be implemented - Standard"},
    {level:"AccountsRPNotImplementedNPA", value:"List of accounts where RP could not be implemented - NPA"},
    {level:"AccountsDCCODeferment", value:"Top 20 Accounts where deferment in DCCO has been allowed"},
    {level:"AccountsIBCStd", value:"Accounts currently in IBC - Standard"},
    {level:"AccountsIBCNPA", value:"Accounts currently in IBC - NPA"}
  ]
    let report:any={}
   report =  tableHeading.filter((o) => o.level === val);
   this.pageHeading = report[0].value;
   console.log(report);
}


}
