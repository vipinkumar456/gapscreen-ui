import { Component, OnInit } from '@angular/core';
import { PATH, SERVER_PATHS } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-report-on-operation',
  templateUrl: './report-on-operation.component.html',
  styleUrls: ['./report-on-operation.component.scss']
})
export class ReportOnOperationComponent implements OnInit {


  reportForm: FormGroup;
  submitted: boolean = false;
  heading;
  user;
  isView: boolean = false;
  save;
  isChecker: boolean = false;
  isMaker: boolean = false;
  rejectedFlag: boolean = false;
  partA: boolean = false;
  partB: boolean = false;
  ownershipSummary: boolean = false;
  isNew:boolean =true;
  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.isNew=true;
    this.heading = "Report On Operations of Subsidiaries/Associates/Joint Ventures";
    this.route.params.subscribe((res) => {
      if (res.type == 'view') {
        this.isView = true;
        this.isMaker = true;
        this.getDatabyId(res.id);
        this.ownershipSummary = true;
        this.partB = true;
        this.partA = true;
        this.isNew=false;
      }
      if (res.type == 'Approve/Reject') {
        this.isChecker = true;
        this.getDatabyId(res.id);
        this.ownershipSummary = true;
        this.partB = true;
        this.partA = true;
        this.isNew=false;
      }
      if (res.id) {

      }
    })
    this.getUser();
    this.prepareReportForm();
  }

  prepareReportForm() {
    this.reportForm = this.fb.group({
      subsidiaryCategory: [null, Validators.required],
      operationArea: [null, Validators.required],
      subsidiaryCode: [null, Validators.required],
      subsidiaryName: [null, Validators.required],
      activityName: [null, Validators.required],
      regulatoryName: [null, Validators.required],
      balanceSheetFootings: [null,],
      capitalFunds: [null,],
      minCapitalAdequacyPrescribed: [null,],
      minCapitalPrescribed: [null,],
      capitalAdequacyRatio: [null,],
      notionalCapitalFunds: [null,],
      riskWeightedAssets: [null,],
      notionalCapitalAdequacyRatio: [null,],
      capitalAndReservesInBalanceSheet: [null,],
      totalDeposits: [null,],
      totalBorrowings: [null,],
      profitBeforeTax: [null,],
      profitAfterTaxOrReturn: [null,],
      surplusOrLoss: [null,],
      returnOnAssets: [null,],
      returnOnEquity: [null,],
      totalDividendsPaid: [null,],
      grossLoansAndAdvances: [null,],
      grossNonPerformingLoans: [null,],
      nplProvisionsHeld: [null,],
      nplProvisionsRequired: [null,],
      totalInvestmentsBookValue: [null,],
      totalInvestmentsMarketValue: [null,],
      nonPerformingInvestments: [null,],
      npiProvisionsHeld: [null,],
      npiProvisionsRequired: [null,],
      contingentLiabilities: [null,],
      // largeCredits: [null, Validators.required],
      noOfCounterparties: [null,],
      aggregateExposureAmount: [null,],
      aggregateExposurePercentage: [null,],
      investmentInCapital: [null,],
      percentageOfSharesHeld: [null,],
      percentageOfTotalCapital: [null,],
      status: ['SUBMITTED'],
      id: []
    })
  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });
  }

  saveData(itm) {

    let payload = this.reportForm.value;
    payload.status = itm;

    if (itm == "SUBMITTED") {
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          this.httpService.postData(payload, PATH.INFORMATIONREPORT_SUBMIT).subscribe((res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Report On Information Submitted Successfully",
            });
            this.router.navigate(["report-on-operation"]);
          })
        }
      })
    }
    if (itm == "APPROVED") {
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          this.httpService.updateData(payload, PATH.INFORMATIONREPORT_PUT).subscribe((res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Approved Successfully",
            });
            this.router.navigate(["report-on-operation"]);
          })
        }
      })
    }
    if (itm == "REJECTED") {
      
      // if (!inputValue) {
      //   this.messageService.add({
      //     severity: "error",
      //     summary: "Error",
      //     detail: "Comment is Required",
      //   });
      //   return;
      // }
        if(this.isChecker){
          var inputValue = (<HTMLInputElement>document.getElementById('comments')).value;
          payload.comments=inputValue;
        }
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          this.httpService.updateData(payload, PATH.INFORMATIONREPORT_PUT).subscribe((res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Approved Successfully",
            });
            this.router.navigate(["report-on-operation"]);
          })
        }
      })
    }
  }

  numberOnlyWithDismal(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

  getDatabyId(id) {
    this.httpService.getData(PATH.INFORMATIONREPORT_GETBYID, { id: id }).subscribe((res) => {
      this.reportForm.patchValue(res);
      (<HTMLInputElement>document.getElementById('comments')).value=res.comments;
      if (this.reportForm.value.status == "REJECTED") {
        this.rejectedFlag = true;
      }
      this.reportForm.disable();
    })
  }
  saveErrorMessage() {
    var inputValue = (<HTMLInputElement>document.getElementById('comments')).value;
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
    }
    if (this.reportForm.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Validate Report Form",
      });
        //  return true;
    }
    if (this.reportForm.get("subsidiaryCategory").value == null ||
      this.reportForm.get("operationArea").value == null || this.reportForm.get("subsidiaryCode").value == null
      || this.reportForm.get("subsidiaryName").value == null ||
      this.reportForm.get("activityName").valid == null || this.reportForm.get("regulatoryName").value == null) {


      this.ownershipSummary = false;
      this.partB = false;
      this.partA = false;


    } 
    // else {
    //   this.partA = true;

    // }


    // if (this.reportForm.get("capitalFunds").value == null ||
    //   this.reportForm.get("minCapitalAdequacyPrescribed").value == null ||
    //   this.reportForm.get("minCapitalPrescribed").value == null ||
    //   this.reportForm.get("capitalAdequacyRatio").value == null ||
    //   this.reportForm.get("notionalCapitalFunds").value == null ||
    //   this.reportForm.get("riskWeightedAssets").value == null ||
    //   this.reportForm.get("notionalCapitalAdequacyRatio").value == null ||
    //   this.reportForm.get("capitalAndReservesInBalanceSheet").value == null ||
    //   this.reportForm.get("totalDeposits").value == null ||
    //   this.reportForm.get("totalBorrowings").value == null ||
    //   this.reportForm.get("profitBeforeTax").value == null ||
    //   this.reportForm.get("profitAfterTaxOrReturn").value == null ||
    //   this.reportForm.get("surplusOrLoss").value == null ||
    //   this.reportForm.get("returnOnAssets").value == null ||
    //   this.reportForm.get("returnOnEquity").value == null ||
    //   this.reportForm.get("totalDividendsPaid").value == null ||
    //   this.reportForm.get("grossLoansAndAdvances").value == null ||
    //   this.reportForm.get("grossNonPerformingLoans").value == null ||
    //   this.reportForm.get("nplProvisionsHeld").value == null ||
    //   this.reportForm.get("nplProvisionsRequired").value == null ||
    //   this.reportForm.get("totalInvestmentsBookValue").value == null ||
    //   this.reportForm.get("totalInvestmentsMarketValue").value == null ||
    //   this.reportForm.get("nonPerformingInvestments").value == null ||
    //   this.reportForm.get("npiProvisionsHeld").value == null ||
    //   this.reportForm.get("npiProvisionsRequired").value == null ||
    //   this.reportForm.get("contingentLiabilities").value == null) {
    //   this.partB = false;
    //   this.ownershipSummary = false;
    // }
    // else {
    //   this.partA = false;
    //   if (
    //     // this.reportForm.get("largeCredits").value == null ||
    //     this.reportForm.get("noOfCounterparties").value == null ||
    //     this.reportForm.get("aggregateExposureAmount").value == null ||
    //     this.reportForm.get("aggregateExposurePercentage").value == null

    //   ) {
    //     this.partB = true;
    //     this.partA = false;
    //   }
    //   else {
    //     this.partB = false;
    //     this.partA = false;
    //     this.ownershipSummary = true;
    //   }

    // }

    // if (this.reportForm.get("aggregateExposurePercentage").value == null
    //   || this.reportForm.get("capitalAndReservesInBalanceSheet").value == null ||
    //   this.reportForm.get("percentageOfTotalCapital").value == null) {
    // }
    // else {
    //   this.partA = false;
    //   this.partB = false;
    //   this.ownershipSummary = false;
    // }

  }
}


