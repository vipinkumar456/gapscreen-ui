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
  selector: 'app-transaction-monitoring',
  templateUrl: './transaction-monitoring.component.html',
  styleUrls: ['./transaction-monitoring.component.scss']
})
export class TransactionMonitoringComponent implements OnInit {
  heading: string;
  display: Array<any> = [];
  submittedToAdd: any;
  isChecker: boolean = false;
  isMaker: boolean = false;
  checkedData: Array<any> = [];
  submitted: boolean = false;
  rejectedFlag: boolean = false;
  comment: any;
  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];
  countryForm: FormGroup;
  isView:boolean=false;
  countryDropDown;
  dropdownYears:any=[];
  selectedQuarter:any;
  quarterEndingDate : any;
  isRes:any;
  isFormValid: boolean = false;
  changed: boolean = false;
  tableheadingNames: Array<any> = [];
  status:any;
  factStatus:any;
  SourcedStatus:any;
  itStatus:any;
  monitoringTimeStatus:any;

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
    this.heading = "Transaction Monitoring Systems";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_CAML_A6_TRANSACTION_MONITORING_SYSTEMS_MAKER) {
      this.isMaker = true;
    }

    if (this.role.ROLE_CAML_A6_TRANSACTION_MONITORING_SYSTEMS_CHECKER) {
      this.isChecker = true;
 
     }


    this.prepareCountryForm();
    this.getQuarters();
    this.prepareTable();
    this.getDropdowns('parallel-post-facto-monitoring');
    this.getDropdowns('post-facto-monitoring-avg-time');
    this.getDropdowns('manual-or-IT-based-monitoring');
    this.getDropdowns('in-house-or-outsourced');

  }

  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "quarterEndingDate": ['', Validators.required],
      "financialYear":['',Validators.required]
    })
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

  getCountry(){
    this.httpService.getData(PATH.GET_COUNTRY).subscribe((res) => {
      console.log(res);
      let country=res;
      this.countryDropDown=country.map(elm =>{return {label:elm.countryName,value:elm.countryName}});
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

    this.tableheadingNames = [
      { title: "Frequency of reviews for customers whose risk grade is  (pick from appropriate drop down options)",name: "transactionType"}
    ];

    this.tableNames = [
      { title: "transactionType", name: "transactionType",inpType: "number",editable: false},
      { title: "parallelPostFactoMonitoring", name: "Parallel Or Post-Facto Monitoring",inpType: "number",editable: true},
      { title: "postFactoMonitoringAvgTime", name: "Average Time Taken For Completing Post Facto Monitoring",inpType: "number",editable: true},
      { title: "manualOrITBasedMonitoring", name: "Manual Or IT Based Monitoring",inpType: "number",editable: true},
      { title: "inHouseOrOutsourced", name: "In-House Or Outsourced",inpType: "number",editable: true},
    ];
  }

  prepareReportData()
  {
    this.display=[
      { transactionType:"Cash deposits" },
      { transactionType:"Cash withdrawals" },
      { transactionType:"Fx cash sale" },
      { transactionType:"Fx cash purchase" },
      { transactionType:"Domestic inward remittance" },
      { transactionType:"Domestic outward remittance"},
      { transactionType:"International inward remittance" },
      { transactionType:"International outward remittance" },
      { transactionType:"Mobile banking inward transactions" },
      { transactionType:"Mobile banking outward transactions" },
      { transactionType:"Internet banking inward transactions" },
      { transactionType:"Internet banking outward transactions" },
      { transactionType:"Debit card inward transactions" },
      { transactionType:"Debit card outward transactions" },
      { transactionType:"Credit card inward transactions" },
      { transactionType:"Credit card outward transactions" },
      { transactionType:"Pre-paid card inward transactions" },
      { transactionType:"Pre-paid card outward transactions" },
      { transactionType:"All other inward transactions" },
      { transactionType:"All other outward transactions" },
      { transactionType:"Trade remittances - inward (included in international inward remittances)" },
      { transactionType:"Trade remittances - outward (included in international outward remittances)" },
      { transactionType:"Portfolio Management Services - inward" },
      { transactionType:"Portfolio Management Services - outward" },
      { transactionType:"Third party transactions - inward" },
      { transactionType:"Third party transactions - outward" },
    ]
  }
  
  getRecords() {
    this.comment='';
    if (this.countryForm.valid){
    
    let val = this.countryForm.value;
    if(this.countryForm.get('financialYear') != null && this.countryForm.get('quarterEndingDate') != null){
      this.isFormValid = true;
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
     
        this.httpService.getData(PATH.GET_TRANSACTION_MONITORING + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
          if (res.length > 0) {
            this.display = res;
            this.submitted=false;
            this.isRes=true;
          }
          else
          {
            this.isRes=false;
            if(status=="SUBMITTED"){
              this.prepareReportData();
            }
            if(status=="REJECTED"){
              this.display=[];
              this.submitted=true;
              // this.isRejectedData=false;
            }
          }
        });
    }
    if (this.isChecker) {
      let status = "SUBMITTED" 
        this.httpService.getData(PATH.GET_TRANSACTION_MONITORING + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
          if (res.length > 0) {
            this.display = res;
            this.submitted=false;
          }
          else {
            this.display=[];
            this.submitted=true;
            // this.preparereportData();
          }

        });
    }
  }
  }


  submit(val): void {

    this.display.forEach(elm=>{
    elm.quarterEndingDate = this.selectedQuarter;
    elm.status = "SUBMITTED";
    elm.comment='';
    })
    this.submittedRecords = this.display;
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.PUT_TRANSACTION_MONITORING;
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
          var uri = PATH.POST_TRANSACTION_MONITORING;
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
    this.httpService.getData(PATH.GET_TRANSACTION_MONITORING + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
      this.display = res;
      if ((val == 'REJECTED' || val == 'SUBMITTED') && this.display.length != 0) {
        this.submitted = false;
        this.isRes=true;
      }
      if(this.display.length==0){
        this.isRes=false;
        if(val=='SUBMITTED'){
          this.prepareReportData();
        }
        if(val=='REJECTED'){
          this.submitted=true;
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
            "comment": "",
          }
        } else {
          this.submitOrAPPROVOrREJECT(val)
        }
      }
    });
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

      this.httpService.postData(data, PATH.POST_TRANSACTION_MONITORING).subscribe((res) => {
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
  
  getDropdowns(itm){
 
    this.httpService.getData(PATH.GET_KYC_CDD + itm).subscribe((res) => {
      if(itm=='parallel-post-facto-monitoring'){
        this.factStatus=res;
      }
      if(itm=='post-facto-monitoring-avg-time'){
        this.monitoringTimeStatus=res;
      }
      if(itm=='manual-or-IT-based-monitoring'){
        this.itStatus=res;
      }
      if(itm=='in-house-or-outsourced'){
        this.SourcedStatus=res;
      }

    });
  }
}

