import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import {  Validators } from "@angular/forms";
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: 'app-profile-nonface-to-face',
  templateUrl: './profile-nonface-to-face.component.html',
  styleUrls: ['./profile-nonface-to-face.component.scss']
})
export class ProfileNonfaceToFaceComponent implements OnInit {

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
  checkerForm:FormGroup;
  isView:boolean=false;
  countryDropDown;
  dropdownYears:any=[];
  selectedQuarter:any;
  quarterEndingDate : any;
  date3: Date;

  tableHeadingNames: Array<any> = [];
  OurDebitsNo: any;
  isRes:any;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private fb : FormBuilder,
    private roleAuthGuard:RoleAuthGuardService
      ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading = "Table B3:  Profile of non-face-to-face customers";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
   
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_DBMD_B3_NFTOF_CUSTOMERS_PROFILE_MAKER) {
      this.isMaker = true;
    }

    if (this.role.ROLE_DBMD_B3_NFTOF_CUSTOMERS_PROFILE_CHECKER) {
      this.isChecker = true;
    }

    this.prepareCountryForm();
    this.prepareTable();
    this.getQuarters();

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

    this.tableHeadingNames = [
      { title: "lowRisk",name: "Low Risk"},
      { title: "mediumRisk",name: "Medium Risk"},
      { title: "highRisk",name: "High Risk"}
    ];

    this.tableNames = [
      { title: "customerType", name: "relatedParties",inpType: "number",editable: false},
      { title: "lowRiskTotalNoOfCustomers", name: "No. of Customers",inpType: "number",editable: true},
      { title: "lowRiskTotalDebitTransactions", name: "Total number of debits transactions during the quarter",inpType: "number",editable: true},
      { title: "lowRiskTotalDebitAmount", name: "Total debits during the quarter (amount)",inpType: "decimal",editable: true},
      { title: "lowRiskTotalCreditTransactions", name: "Total number of credits transactions during the quarter",inpType: "number",editable: true},
      { title: "lowRiskTotalCreditAmount", name: "Total credits during the quarter (amount)",inpType: "decimal",editable: true},
      { title: "mediumRiskTotalNoOfCustomers", name: "No. of Customers",inpType: "number",editable: true},
      { title: "mediumRiskTotalDebitTransactions", name: "Total number of debits transactions during the quarter",inpType: "number",editable: true},
      { title: "mediumRiskTotalCreditAmount", name: "Total number of debits transactions during the quarter",inpType: "decimal",editable: true},
      { title: "mediumRiskTotalDebitAmount", name: "Total debits during the quarter (amount)",inpType: "number",editable: true},
      { title: "mediumRiskTotalCreditTransactions", name: "Total credits during the quarter (amount)",inpType: "decimal",editable: true},
      { title: "highRiskTotalNoOfCustomers", name: "No. of customersQuarter",inpType: "number",editable: true},
      { title: "highRiskTotalDebitTransactions", name: "Total number of debits transactions during the quarter",inpType: "number",editable: true},
      { title: "highRiskTotalDebitAmount", name: "Total debits during the quarter (amount)",inpType: "decimal",editable: true},
      { title: "highRiskTotalCreditTransactions", name: "Total number of credits transactions during the quarter",inpType: "number",editable: true},
      { title: "highRiskTotalCreditAmount", name: "Total credits during the quarter (amount)",inpType: "decimal",editable: true},
    ];
    this.prepareReportData();
  }

  prepareReportData()
  {
    this.display=[
      { customerType:"Related parties- Residents & Non-Residents" },
    ]
  }

  // totalddition(itm, name) {
  
  //   if (name.title == 'outstandingDebit') {
  //     this.total.outstandingDebit = 0;
  //   }
  //   if (name.title == 'outstandingCredit') {
  //     this.total.outstandingCredit = 0;
  //   }
  //   if (name.title == 'amountInvolvedDebit') {
  //     this.total.amountInvolvedDebit = 0;
  //   }
  //   if (name.title == 'amountInvolvedCredit') {
  //     this.total.amountInvolvedCredit = 0;
  //   }

  //   this.display.forEach(elm => {
      


  //     if (elm.outstandingDebit && name.title == 'outstandingDebit') {
  //       this.total.outstandingDebit = this.total.outstandingDebit + parseFloat(elm.outstandingDebit);
  //     }
  //     if (elm.outstandingCredit && name.title == 'outstandingCredit') {
  //       this.total.outstandingCredit = this.total.outstandingCredit + parseFloat(elm.outstandingCredit);
  //     }
  //     if (elm.amountInvolvedDebit && name.title == 'amountInvolvedDebit') {
  //       this.total.amountInvolvedDebit = this.total.amountInvolvedDebit + parseFloat(elm.amountInvolvedDebit);
  //     }
  //     if (elm.amountInvolvedCredit && name.title == 'amountInvolvedCredit') {
  //       this.total.amountInvolvedCredit = this.total.amountInvolvedCredit + parseFloat(elm.amountInvolvedCredit);
  //     }

  //   })
    
  // }

  

  submit(val): void {

    this.display.forEach(elm=>{
      elm.quarterEndingDate = this.selectedQuarter;
      elm.status = "SUBMITTED";
      })
    var patch = this.display.filter(o => o.edit).length > 0 ? true : false;

    if (patch) {
      this.submittedRecords = this.display.filter(o => o.edit);
    } else {
      this.submittedRecords = this.display;
    }
  
    this.submittedRecords.forEach(elm => {
      elm.status = "SUBMITTED"
    })
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.UPDATE_PROFILE_NON_FACE_TO_FACE;
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

    if(this.isRes){
   this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = PATH.POST_PROFILE_NON_FACE_TO_FACE;
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
    this.httpService.getData(PATH.GET_PROFILE_NON_FACE_TO_FACE + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
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
    this.display = [];
    this.submitted=false;
    this.rejectedFlag = true;
    this.getData('REJECTED');
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
           this.httpService.getData(PATH.GET_PROFILE_NON_FACE_TO_FACE + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
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
          this.httpService.getData(PATH.GET_PROFILE_NON_FACE_TO_FACE + "?quarterEndingDate=" + this.selectedQuarter +"&status=" + status).subscribe((res) => {
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

   console.log(data);
   
    
    if (submitFlag) {
      this.httpService.postData(data, PATH.POST_PROFILE_NON_FACE_TO_FACE).subscribe((res) => {
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

  
  decimalNumberOnly(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

 

 

}
 