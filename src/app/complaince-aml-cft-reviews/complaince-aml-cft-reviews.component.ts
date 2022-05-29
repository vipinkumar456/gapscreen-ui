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
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-complaince-aml-cft-reviews',
  templateUrl: './complaince-aml-cft-reviews.component.html',
  styleUrls: ['./complaince-aml-cft-reviews.component.scss']
})
export class ComplainceAmlCftReviewsComponent implements OnInit {

  heading: string;
  display: Array<any> = [];
  submittedToAdd: any;
  dateValue: Date;
  myGroup: any;
  changed: boolean = false;
  rangeDates: Date[];
  maxDateValue= new Date();
  minDate: Date;
  maxDate: Date;
  isChecker: boolean = false;
  isMaker: boolean = false;
  checkedAll: boolean = false;
  checkedData: Array<any> = [];
  submitted: boolean = false;
  rejectedFlag: boolean = false;
  comments: any;
  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];
  countryForm: FormGroup;
  isView:boolean=false;
  branchName;
  countryDropDown;
  dropdownYears:any=[];
  selectedQuarter:any;
  quarterEndingDate : any;
  date3: Date;
  total: any = {
    outstandingDebit: 0,
    outstandingCredit: 0,
    amountInvolvedDebit: 0,
    amountInvolvedCredit: 0,
    action : ""

  }
  tableheadingNames: Array<any> = [];
  OurDebitsNo: any;
  checkerForm:FormGroup;
  isRes:any;
  dropdown: any = [];
  correctivedropdown:any =[];
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService,
    private fb : FormBuilder,
  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading = "Table E1: Compliance AML-CFT reviews/ checks by Internal/External Auditor";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
      
      if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_IAD_E1_AMLCFT_AUDITOR_REVIEWS_COMPLIANCE_MAKER) {
      this.isMaker = true;
    }

    if (this.role.ROLE_IAD_E1_AMLCFT_AUDITOR_REVIEWS_COMPLIANCE_CHECKER) {
      this.isChecker = true;
     }


    this.prepareTable();
    this.getQuarters();
    this.prepareCountryForm();
    this.getDropDown();
 
    // This Form is For checker Reject Comment
  this.checkerForm = this.fb.group({
    "comment": [''],
  })
  
  }

  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "quarterEndingDate": ['', Validators.required],
      "financialYear":['',Validators.required]
    })
  }


  getQuarters(){
    this.httpService.getData(PATH.GET_COUNTRY).subscribe((res) => {
      let year=new Date().getFullYear() 
      let today = new Date();
      let month=today.getMonth()+1;
      let currentQuarter,currentYear,prev1Year,prev2Year,nextYear;
      if(month<=3){
        currentQuarter=4;
        currentYear=year-1
        nextYear=year;
        prev1Year=year-2;
        prev2Year=year-3;
      }
      else if(month<=6){
        currentQuarter=1;
        currentYear=year;
        nextYear=year+1;
        prev1Year=year-1;
        prev2Year=year-2;
      }
      else if(month<=9){
        currentQuarter=2;
        currentYear=year;
        nextYear=year+1;
        prev1Year=year-1;
        prev2Year=year-2;
      }
      else if(month<=12){
        currentQuarter=3;
        currentYear=year;
        nextYear=year+1;
        prev1Year=year-1;
        prev2Year=year-2;
      }
      this.dropdownYears.push({'label':currentYear+'-'+nextYear,value:currentYear+'-'+nextYear},{'label':prev1Year+'-'+currentYear,value:prev1Year+'-'+currentYear},{'label':prev2Year+'-'+prev1Year,value:prev2Year+'-'+prev1Year}); 
      this.quarterEndingDate = [{label:"Apr -June", value:"06-30"},{label:"July - Sep",value:"09-30"},{label:"Oct - Dec",value:"12-31"} ,{label:"Jan - March",value:"03-31"}]
    });
  }

  prepareTable(){

    this.tableNames = [
      { title: "auditScope", name: "auditScope",inpType: "number",editable: false},
      { title: "reviewBy", name: "Review by",inpType: "number",editable: true},
      { title: "sampleSize", name: "Sample Size (A)",inpType: "number",editable: true},
      { title: "deficiencyDetectedAccounts", name: "No. of accounts out of (A) where deficiency was detected",inpType: "number",editable: true},
      { title: "correctiveActionStatus", name: "Current status of corrective action",inpType: "number",editable: true},
      { title: "remarks", name: "Remarks",inpType:"number",editable: true},
    ];
    this.prepareReportData();
  }

  prepareReportData()
  {
    this.display=[
      { auditScope:"Customer acceptance/Account opening", reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Customer Identification procedure", reviewBy:'',sampleSize:'' ,deficiencyDetectedAccounts:'' ,correctiveActionStatus:'',remarks:null },
      { auditScope:"Risk categorisation/Customer ratings" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Country ratings" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Large cash transactions", reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Monitoring of transactions" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Alerts processing" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Accounts closed following non-compliance with policies, procedures and controls relating to money laundering and the financing of terrorism activities identified" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Inactive/dormant and frozen accounts reactivation", reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Review of Claims from DEA Fund", reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Beneficial owner identified" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"End use of funds*/ultimate beneficial owner" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Small Bank saving account" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Correspondent banking" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Internal accounts" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null},
      { auditScope:"Others**" , reviewBy:'',sampleSize:'',deficiencyDetectedAccounts:'',correctiveActionStatus:'',remarks:null}
    ]
  }
  
  getDropDown() {
    let itm = 'review-by';
    this.httpService.getData(PATH.GET_KYC_CDD + itm).subscribe((res) => {
    this.dropdown = res;
    });
    let corretive = 'current-status-of-corrective-action';
    this.httpService.getData(PATH.GET_KYC_CDD + corretive).subscribe((res) => {
    this.correctivedropdown = res;
    });
  }

  
  submit(val): void {
     
    this.display.forEach(elm=>{
      elm.quarterEndingDate = this.selectedQuarter,
      elm.status = "SUBMITTED",
      elm.auditScope ? elm.auditScope:'',
      elm.sampleSize ? elm.sampleSize:'',
      elm.deficiencyDetectedAccounts ? elm.deficiencyDetectedAccounts:'',
      elm.correctiveActionStatus ? elm.correctiveActionStatus:'0',
      elm.remarks ? elm.remarks :''

      })
   this.submittedRecords = this.display
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.UPDATE_AML_CFT_REVIEW_COMPLIANCE;
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
      console.log(this.rejectedRecords);
      
   this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = PATH.POST_AML_CFT_REVIEW_COMPLIANCE;
        console.log(this.submittedRecords);
        
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

getData(val) {
  this.httpService.getData(PATH.GET_AML_CFT_REVIEW_COMPLIANCE + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
    this.display = res;  
  if ((val == 'REJECTED' || val == 'SUBMITTED') && this.display.length != 0) {
      this.submitted = false;
      this.isRes = true;
    }

    if(this.display.length==0){
      this.isRes=false;
      if(val=='SUBMITTED'){
        this.prepareReportData();
      }
      if(val=='REJECTED'){
        this.submitted=true;
        this.prepareReportData();
      }
    }
  });
}


  rejectedRecords() {
    this.checkedData = [];
    this.display = [];
    this.submitted = true;
    this.rejectedFlag = true;
    this.getRecords('REJECTED');
  }
  
  getRecords(val) {
    if (this.countryForm.valid){
      this.isView = true;
        let val = this.countryForm.value;
      
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
             this.httpService.getData(PATH.GET_AML_CFT_REVIEW_COMPLIANCE + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
               if (res.length > 0) {
                 this.display = res;
                 this.isRes=true;
                 this.submitted=false;
               }
               else
               { 
                 this.isRes=false;
                 if(status=="SUBMITTED"){
                   this.prepareReportData();
                 }
                 if(status=="REJECTED"){
                   this.display=[];
                   this.prepareReportData();
                   this.submitted=true;
                 }
               }
             });
         }
        if (this.isChecker) {
          let status = "SUBMITTED" 
            this.httpService.getData(PATH.GET_AML_CFT_REVIEW_COMPLIANCE + "?quarterEndingDate=" + this.selectedQuarter +"&status=" + status).subscribe((res) => {
              if (res.length > 0) {
                this.display = res;
                this.submitted=false;
              }
              else {
                this.display=[];
                this.prepareReportData();
                this.submitted=true;
              }
    
            });
        }
      }
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
          this.submitOrApproveOrREJECT(val)
        }
      }
    });
  }
  submitOrApproveOrREJECT(input) {
   
    let submitFlag = true;
    if (input == "REJECTED" && !this.comments) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag = false;
    }

    this.display.forEach(elm=>{
      elm.comment = this.checkerForm.get('comment').value;
      })

    let data: any = this.display
    data.forEach((el) => {
      el.status = input
    })
    
    if (submitFlag) {
      this.httpService.postData(data, PATH.POST_AML_CFT_REVIEW_COMPLIANCE).subscribe((res) => {
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
        this.getRecords('SUBMITTED');
        this.checkedData = [];
        this.checkerForm.reset();
      }, (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      })
    }
  }
 
  AllSubmittedRecords() {
    this.display = [];
    this.submitted=false;
    this.rejectedFlag = false;
    this.getData('SUBMITTED');
  }
 

  numberOnly(event:any){   
    const regexpNumber =/[0-9]/;
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
