import { Component, OnInit } from '@angular/core';
import { PATH, SERVER_PATHS } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import {ToggleButtonModule} from 'primeng/togglebutton';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';

@Component({
  selector: 'app-report-on-operation',
  templateUrl: './report-on-operation.component.html',
  styleUrls: ['./report-on-operation.component.scss']
})
export class ReportOnOperationComponent implements OnInit {

    reportForm:FormGroup;
    heading;
    user;
    isView: boolean = false;
    save;
    isChecker: boolean = false;
    isMaker: boolean = false;
    rejectedFlag:boolean=false;

    constructor(
      private httpService: HttpService,
      private fb: FormBuilder,
      private messageService: MessageService,
      private activatedRoute: ActivatedRoute,
      private confirmationService: ConfirmationService,
      private route: ActivatedRoute,
      private router: Router
  ) {}
    
  ngOnInit(){
    this.heading="Report On Operations of Subsidiaries/Associates/Joint Ventures";
    this.route.params.subscribe((res) => {
      if(res.type=='view'){
        this.isView=true;
        this.isMaker=true;
        this.getDatabyId(res.id);
      }
      if(res.type=='Approve/Reject')
      {
        this.isChecker=true;
        this.getDatabyId(res.id);
      }
       if (res.id) {

      }
    })
    this.getUser();
    this.prepareReportForm();
  }

  prepareReportForm(){
    this.reportForm = this.fb.group({
      subsidiaryCategory:[''],
      operationArea:[''],
      subsidiaryCode:[''],
      subsidiaryName:[''],
      activityName:[''],
      regulatoryName:[''],
      balanceSheetFootings:[''],
      capitalFunds:[''],
      minCapitalAdequacyPrescribed:[''],
      minCapitalPrescribed:[''],
      capitalAdequacyRatio:[''],
      notionalCapitalFunds:[''],
      riskWeightedAssets:[''],
      capitalAndReservesInBalanceSheet:[''],
      totalDeposits:[''],
      totalBorrowings:[''],
      profitBeforeTax:[''],
      profitAfterTaxOrReturn:[''],
      surplusOrLoss:[''],
      returnOnAssets:[''],
      returnOnEquity:[''],
      totalDividendsPaid:[''],
      grossLoansAndAdvances:[''],
      grossNonPerformingLoans:[],
      nplProvisionsHeld:[''],
      nplProvisionsRequired:[''],
      totalInvestmentsBookValue:[''],
      totalInvestmentsMarketValue:[''],
      nonPerformingInvestments:[''],
      npiProvisionsHeld:[''],
      npiProvisionsRequired:[''],
      contingentLiabilities:[''],
      largeCredits:[''],
      noOfCounterparties:[''],
      aggregateExposureAmount:[''],
      aggregateExposurePercentage:[''],
      investmentInCapital:[''],
      percentageOfSharesHeld:[''],
      percentageOfTotalCapital:[''],
      status:['SUBMITTED'],
      id:[]
    })
  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });
  }

  saveData(itm){
    let payload = this.reportForm.value;
    payload.status=itm;

    if(itm=="SUBMITTED"){
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
    if(itm=="APPROVED"){
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
    if(itm=="REJECTED"){
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

  getDatabyId(id){
    this.httpService.getData(PATH.INFORMATIONREPORT_GETBYID,{id:id}).subscribe((res) => {
    this.reportForm.patchValue(res);
    if(this.reportForm.value.status=="REJECTED")
    {
      this.rejectedFlag=true;
    }
    this.reportForm.disable(); 
  })
}

}


