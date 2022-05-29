import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { EmailValidator, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: "app-fortnightly",
  templateUrl: "./fortnightly.component.html",
  styleUrls: ["./fortnightly.component.scss"],
})
export class FortnightlyComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = true;
  formData: any;

  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
  isChecker: boolean = false;
  isMaker: boolean = false;
  changed: boolean = false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  accountNumber: any;
  submittedRecords: Array<any> = [];
  maxDateValue = new Date();
  branchCodes: Array<any> = [];
  serialNumber: any;
  submittedToAdd: boolean = false;
  heading: string;
  user: any;
  editMode: boolean = false;
  serialNoLocal: number = 0;
 

  branchRefNo: any;
  comments: any;
  regexspecChar = "{a-z,A-Z}";
  regexCash = "/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g";
  role: any = {};
  roles :  Array<any> = [] ;
  // ^(\d{1,30}|\d{0,30}\.\d{0,2})$
  reportStatus: any;
  reportStatusFlag: boolean;
  pattern: string | RegExp
  fb: any;
  ngForm: any;
  checkedAll: boolean = false;
  checkedData: Array<any> = [];
  rejectedFlag:boolean=false;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,private roleAuthGuard:RoleAuthGuardService
  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.getUser();
    this.deleteBar = true;
    this.deleteBox = true;
    this.getVal();
    
    if(sessionStorage.getItem("gapRoles")){
      this.roles=JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
    if(this.role.ROLE_FORTNIGHTLY_MAKER){
      this.isMaker= true
    }
    if(this.role.ROLE_FORTNIGHTLY_CHECKER){
      this.isChecker=true
      this.getRecords('SUBMITTED');
    }
    this.heading = "Special Fortnightly Return II"
    this.tableNames = [
      {
        title: "serialNo",
        name: "S.no",
        subText: "",
        editable: false,
        required: false,

      },

      {
        title: "dateForFortnightlyEnded",
        name: "Dates for Fortnightly ended",
        subText: "",
        inpType: "date",
        editable: true,
        required: true,

      },
      {
        title: "cashBalance",
        name: "Cash Balance Actually Maintained with RBI",
        subText: "",
        inpType: "number",
        editable: true,
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
       },
     ];
  }
  
  getRecords(val){
    this.httpService.getData(PATH.GET_FORTNIGHTLY_DATA+"?status="+val).subscribe((res) => {
      this.display= res;
     
      this.display.forEach((elm,index)=>{
        elm.serialNo = index+1
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
    this.serialNoLocal=this.serialNoLocal+1;

    this.insertRow();
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
    this.checkedData=[];
    this.display=[];
    this.serialNoLocal = 0;
    this.submitted = true;
    this.rejectedFlag = true;
    this.getRecords('REJECTED');

  }

  submit(SUBMITTED): void {   //here we fire a function to submit the records
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
    for (var i = 0; i < this.submittedRecords.length; i++) {
      var currentRow = this.submittedRecords[i];
   
      console.log("XXXXXXXXXX " + currentRow.branchName?.toString().trim().length);
  if (currentRow.dateForFortnightlyEnded == null || currentRow.dateForFortnightlyEnded.trim().length == 0) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Date for Fortnightly is required",
        });
        return;
      }
      if (currentRow.cashBalance == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Cash Balance is required",
        });
        return;

      }
      let cashBalance = currentRow.cashBalance
      if (!((/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/g).test(cashBalance))) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Enter Valid value in cash balance!",
        });
        return;
      }
      
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
        var uri = !patch ? PATH.FORTNIGHTLY_SUBMIT : PATH.PATCH_EDIT;

        if (!patch)
          this.httpService
            .postData(

              this.submittedRecords,
              uri
            )
            .subscribe(
              (res) => {
                res.map(o => {
                  o.edit = false;
                })
                this.submitted = true;
                this.changed = false;
                if(this.rejectedFlag){
                  this.getRecords('REJECTED')
                  this.checkedData=[];
                }
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Submitted Successfully",
                });
                this.display = res;
                this.submittedToAdd = true;
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
        if (patch) {
          this.httpService
            .patch(

              this.submittedRecords,

              uri
            )
            .subscribe(
              (res) => {
                res.map(o => {
                  o.edit = false;
                })
                this.submitted = true;
                this.changed = false;
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Submitted Successfully",
                });
                this.display = res;
                console.log(this.display);
                this.submittedToAdd = true;
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

 editClicked(currentRow) {
    this.editMode = true;
    currentRow.edit = true;
    currentRow.createdOn = moment(currentRow.createdOn).format("DD-MM-YYYY")
    currentRow.detectionDate = new Date(currentRow.detectionDate)
    currentRow.tenderingDate = new Date(currentRow.tenderingDate)

  }

  editUnClicked(currentRow) {
    this.editMode = false;
    currentRow.edit = false;

    currentRow.createdOn = moment(currentRow.createdOn).format("DD-MM-YYYY")
  }
  // nextBtn(){
  //   this.router.navigateByUrl('/ncrb');
  // }

  delete(val: number): void {
    // this.display.splice(index, index + 1);
    const index: number = this.display.indexOf(val);
    this.display.splice(index, 1);
  }
  edit() {
    this.httpService.getData(PATH.PATCH_EDIT).subscribe((res) => {
      this.user = res.userName;
    });



  }
  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.floor(num * factor) / factor;
  };


  fileUpload(event, item, type) {
    if (item.cashBalance != null) {
      item.cashBalance = this.roundTo(item.cashBalance, 2)

    }


    if (type.inpType == "file") {

      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      item.document = formData;
    }
  }

  confirm(val) {
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
  submitOrAPPROVOrREJECT(input:any){
 
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
    this.httpService.postData( data,PATH.FORTNIGHTLY_SUBMIT).subscribe((res) => {
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
      this.getRecords('SUBMITTED')     
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
  getSubmitted() {
    if (this.branchRefNo.trim().length == 0) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Enter Valid Ac No./Reference No.",
      });
      return;
    }
    this.httpService.getData(PATH.COUNTERFEIT_GET_ALL + "?branchRefNo=" + this.branchRefNo.toUpperCase()).subscribe(res => {
      res.map(o => {

        o.detectionDate = moment(o.detectionDate).format("DD-MM-YYYY");
        o.detectionDate = moment(o.detectionDate).format("DD-MM-YYYY");
        o.edit = false;
      })
      this.display = res;
      this.submittedToAdd = true;
      this.submitted = true;

      this.isSubmitted()
    })
  }

  getVal() {
    if (this.isMaker && this.reportStatus == 'SUBMITTED') {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "This  data is already submitted",
      });
    }

    if (this.isChecker && this.reportStatus == 'APPROVED') {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "This  data is already approved",
      });
    }

    if (this.reportStatus == null || this.reportStatus == 'UPDATED' || this.reportStatus == 'REJECTED') {
      this.reportStatusFlag = true;
    }
 }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
     });
  }
  
  insertRow() {
     var date = new Date();
    this.display.push({
      newRecord: true,
      edit: false,
      status: 'SUBMITTED',
      id: '',
      createdBy: this.user,
      createdOn: date,
      serialNo: this.serialNoLocal,
    });
  }

  sortBy(header) {
    if (header.inputType == "number") {
      this.submittedRecords.sort(function (a, b) {
        return parseFloat(a[header.title]) - parseFloat(b[header.title]);
      });
    }
    else if (header.inputType == "text") {
      this.submittedRecords.sort(function (a, b) {
        return a[header.title] - b[header.title]
      });
    } else {
      this.submittedRecords.sort(function (a, b) {
        var c: any = new Date(a[header.title]);
        var d: any = new Date(b[header.title]);
        return c - d;
      });
    }
  }

// this function will get all the value of checked data 
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

// this function will check all the records of the table data
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
}
