import { Component, OnInit } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { FormGroup, FormBuilder } from '@angular/forms';
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
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  heading: string;
  display: Array<any> = [];
  changed: boolean = false;
  isChecker: boolean = false;
  isMaker: boolean = false;
  submitted: boolean = false;
  rejectedFlag: boolean = false;
  comment: any;
  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];
  countryForm: FormGroup;
  dropdownYears: any = [];
  dropdown: any = [];
  quarterEndingDate;
  selectedQuarter: any;
  tableHeadingNames: Array<any> = [];
  isFormValid: boolean = false;
  isRejectedData:boolean=true;
  isRes:any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private fb: FormBuilder,
    private roleAuthGuard:RoleAuthGuardService,
  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading = "Table E2 (b): Audit";

    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });


    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));  
      this.getRoles();
    }

    if (this.role.ROLE_IAD_E2B_AUDIT_MAKER) {
      this.isMaker = true
    }

    if (this.role.ROLE_IAD_E2B_AUDIT_CHECKER) {
      this.isChecker = true;
    }

    this.prepareCountryForm();
    this.getDropDown();
    this.getQuarters();
    this.prepareTable();
  }

  prepareCountryForm() {
    this.countryForm = this.fb.group({
      "financialYear": ['', Validators.required],
      "quarterEndingDate": ['', Validators.required]    
    })
  }


  getDropDown() {
    let itm = 'kyc-cdd-policy-frequency'
    this.httpService.getData(PATH.GET_KYC_CDD + itm).subscribe((res) => {
      this.dropdown = res;

    });
  }

  getQuarters() {
    let year = new Date().getFullYear()
    let today = new Date();
    let month = today.getMonth() + 1;
    let currentQuarter, currentYear, prev1Year, prev2Year, nextYear;
    if (month <= 3) {
      currentQuarter = 4;
      currentYear = year - 1
      nextYear = year;
      prev1Year = year - 2;
      prev2Year = year - 3;
    }
    else if (month <= 6) {
      currentQuarter = 1;
      currentYear = year;
      nextYear = year + 1;
      prev1Year = year - 1;
      prev2Year = year - 2;
    }
    else if (month <= 9) {
      currentQuarter = 2;
      currentYear = year;
      nextYear = year + 1;
      prev1Year = year - 1;
      prev2Year = year - 2;
    }
    else if (month <= 12) {
      currentQuarter = 3;
      currentYear = year;
      nextYear = year + 1;
      prev1Year = year - 1;
      prev2Year = year - 2;
    }
    this.dropdownYears.push({ 'label': currentYear + '-' + nextYear, value: currentYear + '-' + nextYear }, { 'label': prev1Year + '-' + currentYear, value: prev1Year + '-' + currentYear }, { 'label': prev2Year + '-' + prev1Year, value: prev2Year + '-' + prev1Year });
    this.quarterEndingDate = [{ label: "Apr -June", value: "06-30" }, { label: "July - Sep", value: "09-30" }, { label: "Oct - Dec", value: "12-31" }, { label: "Jan - March", value: "03-31" }]
  }


  prepareTable() {
  
    this.tableNames = [
      { title: "auditType", name: "Type of audit (Internal/Statutory/Concurrent)",inpType: "string",editable: true},
      { title: "auditFrequency", name: "Frequency of Audit ",inpType: "string",editable: true},
      { title: "highRiskBranchesSpclAdt", name: "Is there a special audit on KYC/AML for high risk branches",inpType: "string",editable: true},
      { title: "auditObsDuringQtr", name: "No of audit observations pertaining to KYC/AML during the quarter",inpType: "number",editable: true},
      { title: "auditObsOpenAtQtrStart", name: "No of audit observations pertaining to KYC/AMLopen at beginning of quarter",inpType: "number",editable: true},
      { title: "auditObsCloseDuringQtr", name: "No of audit observations pertaining to KYC/AMLclosed during the quarter",inpType: "number",editable: true},
      { title: "auditObsOpenAtQtrEnd", name: "No of audit observations pertaining to KYC/AMLopen at the end of the quarter",inpType: "number",editable: true},
     
    ];
  }
  


getRecords() {
  if (this.countryForm.valid){
  
  let val = this.countryForm.value;
  if(this.countryForm.get('financialYear') != null && this.countryForm.get('quarterEndingDate') != null){
    this.isFormValid = true;
    this.display=[];
  }
  let quarterEndingDate = val.quarterEndingDate
  let quarterDateSplit = quarterEndingDate.split("-");
  if (quarterDateSplit[0] == '03') {
    if (val.financialYear && val.quarterEndingDate) {
      let financialYear = val.financialYear.split("-");
      this.selectedQuarter = financialYear[1] + '-' + val.quarterEndingDate  
    }
  }
  else {
    if (val.financialYear && val.quarterEndingDate) {
      let financialYear = val.financialYear.split("-");
      this.selectedQuarter = financialYear[0] + '-' + val.quarterEndingDate
    }
  }
  if (this.isMaker) {
    
    let status= this.rejectedFlag?"REJECTED":"SUBMITTED";
    console.log("Status",status);
    
      this.httpService.getData(PATH.GET_AUDIT + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
        if (res.length > 0) {
          this.display = res;
          this.submitted=false;
          this.isRes=true;
        }
        else
        {
          this.isRes=false;
          if(status=="SUBMITTED"){
            this.pushNewRowData();
          }
          if(status=="REJECTED"){
            this.display=[];
            this.submitted=true;
            this.pushNewRowData();
            // this.isRejectedData=false;
          }
        }
      });
  }
  if (this.isChecker) {
    let status = "SUBMITTED" 
      this.httpService.getData(PATH.GET_AUDIT + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
        if (res.length > 0) {
          this.display = res;
          this.submitted=false;
        }
        else {
          this.display=[];
          this.submitted=true;
          this.pushNewRowData();
          // this.preparereportData();
        }

      });
  }
}
}


  submit(val): void {

    this.display.forEach(elm=>{
    elm.quarterEndingDate = this.selectedQuarter;
    elm.status = "SUBMITTED",
    elm.comment=this.comment
    })
    this.submittedRecords = this.display;
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.PUT_AUDIT;
            this.httpService
              .updateData(this.submittedRecords, uri)
              .subscribe(
                (res) => {
  
                  res.map(o => {
                    o.edit = false;
                  })
                  this.submitted = true;
                  this.changed = false;
                  if (this.rejectedFlag) {
                    this.getData('REJECTED');
                  }
                  this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Submitted Successfully",
                  });
                  this.isSubmitted();
                },
                (err) => {
                  this.changed = false;
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
                }
              );
         
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
    if(!this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.POST_AUDIT;
            this.httpService
              .postData(this.submittedRecords, uri)
              .subscribe(
                (res) => {
  
                  res.map(o => {
                    o.edit = false;
                  })
                  this.submitted = true;
                  this.changed = false;
                  if (this.rejectedFlag) {
                    this.getData('REJECTED');
                  }
                  this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Submitted Successfully",
                  });
                  this.isSubmitted();
                },
                (err) => {
                  this.changed = false;
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
                }
              );
         
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


  rejectedRecords() {
    this.display = [];
    this.submitted=false;
    this.rejectedFlag = true;
    this.getData('REJECTED');
  }

  AllSubmittedRecords() {
    this.display = [];
    this.submitted=false;
    this.rejectedFlag = false;
    this.getData('SUBMITTED');
  }

  
  getData(val) {
    this.httpService.getData(PATH.GET_AUDIT + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
      this.display = res;
      if ((val == 'REJECTED' || val == 'SUBMITTED') && this.display.length != 0) {
        this.submitted = false;
        this.isRes=true;
      }
      if(this.display.length==0){
        this.isRes=false;
        if(val=='SUBMITTED'){
          this.pushNewRowData();
        }
        if(val=='REJECTED'){
          this.submitted=true;
          this.pushNewRowData();
        }
      }
    });
  }

  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;      
    });
  }

  confirm(val) {
    let msg;
    if (val == "SUBMITTED") {
      msg = "Are you sure that you want to perform this submit?"
    }
    if (val == "REJECTED") {
      msg = "Are you sure that you want to perform this reject?"
    }
    if (val == "APPROVED") {
      msg = "Are you sure that you want to perform this approve?"
    }
    this.confirmationService.confirm({
      message: msg,
      accept: () => {
        if (val == "SUBMITTED") {
          let data = {
            "comments": "",
          }
        } else {
          this.submitOrAPPROVOrREJECT(val)
        }
      }
    });
  }

  pushNewRowData() {
    var date = new Date();
    for(var i=0 ;i < 1;i++ ){
       this.display.push({
      newRecord: true,
      edit: false,
      status: 'SUBMITTED',
      // id: '',
      createdBy: this.user,
      createdOn: date,
    });
  }
  }

  submitOrAPPROVOrREJECT(input) {
    let submitFlag = true;
    if (input == "REJECTED" && !this.comment) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag = false;
    }
    let data: any = this.display
    data.forEach((el) => {
      el.status = input,
      el.comment=this.comment
    })
    if (submitFlag) {

      this.httpService.postData(data, PATH.POST_AUDIT).subscribe((res) => {
        this.submitted = true;
        let msg;
        if (input == "SUBMITTED") {
          msg = "Records Submitted Successfully"
        }
        if (input == "REJECTED") {
          msg = "Records Rejected Successfully"
        }
        if (input == "APPROVED") {
          msg = "Records Approved Successfully"
        }
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: msg,
        });
        if(this.isMaker){
          this.getData(input);
        }
        if(this.isChecker){
          this.getData('SUBMITTED');
        }
      }, (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      })
    }
  }

  numberOnly(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  
  characterOnly(event:any){   
    const regexpNumber = /^[0-9a-zA-Z]+$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}


