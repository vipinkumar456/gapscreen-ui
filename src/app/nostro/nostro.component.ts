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
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-nostro',
  templateUrl: './nostro.component.html',
  styleUrls: ['./nostro.component.scss']
})
export class NostroComponent implements OnInit {
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
  submitted: boolean = true;
  rejectedFlag: boolean = false;
  comments: any;
  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];

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

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService
  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.getUser();
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_NOSTRO_ACCOUNTS_MAKER) {
      this.isMaker = true
    }

    if (this.role.ROLE_NOSTRO_ACCOUNTS_CHECKER) {
      this.isChecker = true
      this.getRecords('SUBMITTED');
    }

    this.heading = "UNRECONCILED-NOSTRO ACCOUNTS INCLUDING ENTRIES TRANSFERRED TO UNCLAIMED DEPOSIT ACCOUNT";

    this.tableheadingNames = [
      {
        title: "For the period",
        name: "Period"
      },
      {
        title: "outstandingentries",
        name: "Outstanding Entries"
      },
      {
        title: "amountinvoved",
        name: "Amount Invoved (in thousand)"
      }
    ];


    this.tableNames = [
      {
        title: "periodFrom",
        name: "",
        inpType: "rangeDates",
        editable: true
      },
      {
        title: "outstandingDebit",
        name: "Debit",
        inpType: "number",
        editable: true
      },
      {
        title: "outstandingCredit",
        name: "Credit",
        inpType: "number",
        editable: true
      },
      {
        title: "amountInvolvedDebit",
        name: "Debit",
        inpType: "number",
        editable: true
      },
      {
        title: "amountInvolvedCredit",
        name: "Credit",
        inpType: "number",
        editable: true
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

  totaladdition(itm, name) {
  
    if (name.title == 'outstandingDebit') {
      this.total.outstandingDebit = 0;
    }
    if (name.title == 'outstandingCredit') {
      this.total.outstandingCredit = 0;
    }
    if (name.title == 'amountInvolvedDebit') {
      this.total.amountInvolvedDebit = 0;
    }
    if (name.title == 'amountInvolvedCredit') {
      this.total.amountInvolvedCredit = 0;
    }

    this.display.forEach(elm => {
      


      if (elm.outstandingDebit && name.title == 'outstandingDebit') {
        this.total.outstandingDebit = this.total.outstandingDebit + parseFloat(elm.outstandingDebit);
      }
      if (elm.outstandingCredit && name.title == 'outstandingCredit') {
        this.total.outstandingCredit = this.total.outstandingCredit + parseFloat(elm.outstandingCredit);
      }
      if (elm.amountInvolvedDebit && name.title == 'amountInvolvedDebit') {
        this.total.amountInvolvedDebit = this.total.amountInvolvedDebit + parseFloat(elm.amountInvolvedDebit);
      }
      if (elm.amountInvolvedCredit && name.title == 'amountInvolvedCredit') {
        this.total.amountInvolvedCredit = this.total.amountInvolvedCredit + parseFloat(elm.amountInvolvedCredit);
      }

    })
    
  }

  add() {
    this.insertRow();
  }


  submit(val): void {
    var patch = this.display.filter(o => o.edit).length > 0 ? true : false;

    if (patch) {
      this.submittedRecords = this.display.filter(o => o.edit);
    } else {
      this.submittedRecords = this.display;
    }
    if (this.checkedData.length > 0) {
      this.submittedRecords = this.checkedData
    }
    this.submittedRecords.forEach(elm => {
      elm.status = "SUBMITTED"
    })

    for (var i = 0; i < this.submittedRecords.length; i++) {
      var currentRow = this.submittedRecords[i];
      //  console.log(currentRow.periodFrom.toString().split(","))
      if (currentRow.periodFrom == null) {

        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Period is required",
        });
        return;
      }
      currentRow.startDate = currentRow.periodFrom[0]
      currentRow.endDate = currentRow.periodFrom[1]
      if (currentRow.outstandingDebit == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Outstanding entries debit  is required",
        });
        return;
      } if (currentRow.outstandingCredit == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Outsiding entries credit is required",
        });
        return;
      } if (currentRow.amountInvolvedDebit == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Amount involved debit is required",
        });
        return;

      } if (currentRow.amountInvolvedCredit == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Amount involved credit is required",
        });
        return;
      }
    }
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = !patch ? PATH.NOSTRO_SUBMIT : PATH.PATCH_EDIT;
        if (!patch)
        
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
                this.getRecords('REJECTED');
                this.checkedData = [];
              }
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.submittedToAdd = true;
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
        if (patch) {
          this.httpService
            .patch(this.submittedRecords, uri).subscribe(
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
                this.submittedToAdd = true;
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

  insertRow() {
    this.checkedData = [];
    if (this.rejectedFlag) {
      this.rejectedFlag = false;
      this.display = []
    }
    if (this.submittedToAdd) {
      this.display = [];
      this.submittedToAdd = false;
      this.total.outstandingDebit = 0;
      this.total.outstandingCredit = 0;
      this.total.amountInvolvedDebit = 0;
      this.total.amountInvolvedCredit = 0;
    }
    this.submitted = false;
    this.pushNewRowData();
  }

  delete(val: number): void {
    // this.display.splice(index, index + 1);
    const index: number = this.display.indexOf(val);
    this.display.splice(index, 1);

  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
    }
  pushNewRowData() {
    var date = new Date();
    this.display.push({
      newRecord: true,
      edit: false,
      status: 'SUBMITTED',
      id: '',
      createdBy: this.user,
      createdOn: date,
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
    this.httpService.getData(PATH.GET_NOSTRO_DATA_BY_STATUS + "?status=" + val).subscribe((res) => {
      this.display = res;
      this.display.forEach(elm => {
        elm.periodFrom = [new Date(elm.startDate), new Date(elm.endDate)];
        // elm.createdOn = elm.createdDate;
      })
      if ((val == 'REJECTED' || val == 'SUBMITTED') && this.display.length != 0) {
        this.submitted = false;
      }
    });
  }
  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }
  confirm(val) {
    if (this.checkedData.length <= 0) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please select any Record",
      });
      return
    }

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

  submitOrAPPROVOrREJECT(input) {
    let submitFlag = true;
    if (input == "REJECTED" && !this.comments) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag = false;
    }
    let data: any = this.checkedData
    data.forEach((el) => {
      el.status = input
    })
    if (submitFlag) {
     
      this.httpService.postData(data, PATH.NOSTRO_SUBMIT).subscribe((res) => {
        this.submitted = true;
        let msg;
        if (input == "SUBMITTED") {
          msg = "Records Submited Successfully"
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
      }, (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        // this.submit('SUBMITTED');
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

 

}
 

