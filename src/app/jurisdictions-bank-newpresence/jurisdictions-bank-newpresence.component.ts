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
import { element } from 'protractor';
@Component({
  selector: 'app-jurisdictions-bank-newpresence',
  templateUrl: './jurisdictions-bank-newpresence.component.html',
  styleUrls: ['./jurisdictions-bank-newpresence.component.scss']
})
export class JurisdictionsBankNewpresenceComponent implements OnInit  {

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
  comment: any;
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
    branches: 0,
    jointVenturesAssociates: 0,
    entitiesBelong: 0,
    widerGroupEntities: 0,
    relatedParties : 0,
    customers:0,
    total:0
  }
  status:any;
  tableheadingNames: Array<any> = [];
  OurDebitsNo: any;
  isRes:any;
  isFormValid: boolean = false;

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
    this.heading = "Table A3: Jurisdictions in or with which bank and bank's group entities plan to set up new presence and/or operations in the next one year (including through mergers & acquisitions)";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });


    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));  
      this.getRoles();
    }

    if (this.role.ROLE_DBMD_A3_BOJNY_MAKER) {
      this.isMaker = true
    }

    if (this.role.ROLE_DBMD_A3_BOJNY_CHECKER) {
      this.isChecker = true;
    }

    this.prepareCountryForm();
    this.getQuarters();
    this.prepareTable();
  }

  prepareCountryForm() {
    this.countryForm = this.fb.group({
      "financialYear": ['', Validators.required],
      "quarterEndingDate": ['', Validators.required]    
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


  prepareTable(){
    this.tableNames = [
      { title: "frequencyType", name: "frequencyType",inpType: "number",editable: false},
      { title: "branches", name: "Bank's branches",inpType: "number",editable: true},
      { title: "jointVenturesAssociates", name: "Bank's subsidiaries, joint ventures associates",inpType: "number",editable: true},
      { title: "widerGroupEntities", name: "Entities belonging to bank's wider group",inpType: "number",editable: true},
      { title: "relatedParties", name: "Bank's other related parties",inpType: "number",editable: true},
      { title: "customers", name: "Bank's customers",inpType: "number",editable: true},
      { title: "total", name: "Total",inpType:"number",editable: false},
    ];
  }

  prepareReportData()
  {
    this.display=[
      { frequencyType:"Low" },
      { frequencyType:"Medium" },
      { frequencyType:"High" },
    ]
  }  
 

  totaladdition(itm, name) {


    if (name.title == 'branches') {
      this.total.branches = 0;
    }
  
    if (name.title == 'customers') {
      this.total.customers = 0;
    }
    if (name.title == 'jointVenturesAssociates') {
      this.total.jointVenturesAssociates = 0;
    }
    if (name.title == 'relatedParties') {
      this.total.relatedParties = 0;
    }
    if (name.title == 'widerGroupEntities') {
      this.total.widerGroupEntities = 0;
    }
    // if (name.title == 'total') {
      // this.total.total = 0;
    // }
    this.display.forEach(elm => { 
      this.total.total=0;
      elm.total=0;
      if (elm.branches && name.title == 'branches') {
        this.total.branches = this.total.branches + parseFloat(elm.branches);
      }
      if (elm.customers && name.title == 'customers') {
        this.total.customers = this.total.customers + parseFloat(elm.customers);
      }
      if (elm.jointVenturesAssociates && name.title == 'jointVenturesAssociates') {
        this.total.jointVenturesAssociates = this.total.jointVenturesAssociates + parseFloat(elm.jointVenturesAssociates);
      }
      if (elm.relatedParties && name.title == 'relatedParties') {
        this.total.relatedParties = this.total.relatedParties + parseFloat(elm.relatedParties);
      }
      if (elm.widerGroupEntities && name.title == 'widerGroupEntities') {
        this.total.widerGroupEntities = this.total.widerGroupEntities + parseFloat(elm.widerGroupEntities);
      }
      let branches=0,customers=0,jointVenturesAssociates=0,relatedParties=0,widerGroupEntities=0;
      if(elm.branches){
        branches=parseFloat(elm.branches);
      }
      if(elm.customers){
        customers=parseFloat(elm.customers);
      }
      if(elm.jointVenturesAssociates ){
        jointVenturesAssociates=parseFloat(elm.jointVenturesAssociates);
      }
      if(elm.relatedParties){
        relatedParties=parseFloat(elm.relatedParties);
      }
      if(elm.widerGroupEntities){
        widerGroupEntities=parseFloat(elm.widerGroupEntities);
      }
      if (elm.branches || elm.customers || elm.jointVenturesAssociates ||  elm.relatedParties || elm.widerGroupEntities) {
        elm.total = branches + customers+jointVenturesAssociates+relatedParties+widerGroupEntities;
        // elm.total=parseFloat(elm.total).toFixed(2);
      }
   
    })

    for(var i=0;i<this.display.length;i++){
      this.total.total=this.total.total+this.display[i].total;
    }
  }
  
  getRecords() {
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
     
        this.httpService.getData(PATH.GET_BANK_NEW_PRESENCE + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
          if (res.length > 0) {
            this.display = res;
            this.submitted=false;
            this.isRes=true;
            this.display.forEach((elm)=>{
              this.total.branches=this.total.branches+elm.branches;
              this.total.jointVenturesAssociates=this.total.jointVenturesAssociates+elm.jointVenturesAssociates;
              this.total.widerGroupEntities=this.total.widerGroupEntities+elm.widerGroupEntities;
              this.total.relatedParties=this.total.relatedParties+elm.relatedParties;
              this.total.customers=this.total.customers+elm.customers;
              this.total.total=this.total.total+elm.total;
            })
          }
          else
          {
            this.total = {
              branches: 0,
              jointVenturesAssociates: 0,
              entitiesBelong: 0,
              widerGroupEntities: 0,
              relatedParties : 0,
              customers:0,
              total:0
            }
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
        this.httpService.getData(PATH.GET_BANK_NEW_PRESENCE + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
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
    elm.status = "SUBMITTED",
    elm.comment='';
    })
    this.submittedRecords = this.display;
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.PUT_BANK_NEW_PRESENCE;
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
          var uri = PATH.POST_BANK_NEW_PRESENCE;
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
    this.httpService.getData(PATH.GET_BANK_NEW_PRESENCE + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
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
            "comments": "",
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

      this.httpService.postData(data, PATH.POST_BANK_NEW_PRESENCE).subscribe((res) => {
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
