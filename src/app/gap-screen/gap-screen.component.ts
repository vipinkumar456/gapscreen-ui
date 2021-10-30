import { Component, OnDestroy, OnInit } from "@angular/core";
// import { FormGroup } from "@angular/forms";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { PATH, SERVER_PATHS } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: "app-gap-screen",
  templateUrl: "./gap-screen.component.html",
  styleUrls: ["./gap-screen.component.scss"],
})
export class GapScreenComponent implements OnInit, OnDestroy {
  catalogs: Array<any> = [];
  subs: Subscription;
  display: Array<any> = [];
  reports: Array<any> = [];
  reviews: Array<any> = [];
  errorMessage: any;
  hide: boolean = false;
  downloads: boolean = false;
  todoReportNames: Array<any> = [];
  crossedReportNames: Array<any> = [];
  completedReportNames: Array<any> = [];
  overviewReportNames: Array<any> = [];
  templateDwnldURL: string = PATH.DOWNLOAD_EXCEL;

  logics: SelectItem[] = [
    { label: "No", value: false },
    { label: "Yes", value: true },
  ];
  reportTypes: Array<any> = [
    { label: "Regulatory", value: 1 },
    { label: "MIS", value: 2 },
    { label: "Audit", value: 3 },
  ];
  minDateValue = new Date();
  data: any = {
    reportType: null,
    division: null,
    lastReviewDate: new Date("2020/9/30"),
    logicReviewDate: null,
    logicValidated: null,
    reportName: null,
    reportNo: null,
    userId: "admin",
  };
  reportNames: Array<any> = [];
  token: string;
  user: any;
  selected: string = "";
  router: any;
  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,private roleAuthGuard:RoleAuthGuardService
  ) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  getUser() {
    this.subs = this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res;
      this.data.userId = res.userName;
    });
  }
  goto(input) {
    this.downloads = true;
    this.selected = input;
    this.hide = true;
    if (input == "todo") {
      console.log(input);
      this.overviewReportNames = this.todoReportNames;
    } else if (input == "dueDateCrossed") {
      console.log(input);
      this.overviewReportNames = this.crossedReportNames;
    } else {
      console.log(input);
      this.overviewReportNames = this.completedReportNames;
    }
    console.log("this is clicked" + input);
    for (var i = 0; i < this.overviewReportNames.length; i++) {
      if (
        this.overviewReportNames[i].reportType == "Regulatory" ||
        this.overviewReportNames[i].reportType == 1
      )
        this.overviewReportNames[i].reportType = "Regulatory";
      else if (
        this.overviewReportNames[i].reportType == "MIS" ||
        this.overviewReportNames[i].reportType == 2
      )
        this.overviewReportNames[i].reportType = "MIS";
      else if (
        this.overviewReportNames[i].reportType == "Audit" ||
        this.overviewReportNames[i].reportType == 3
      )
        this.overviewReportNames[i].reportType = "Audit";
    }
    for (var i = 0; i < this.overviewReportNames.length; i++) {
      if (
        this.overviewReportNames[i].logicValidated == "YES" ||
        this.overviewReportNames[i].logicValidated == "true"
      )
        this.overviewReportNames[i].logicValidated = "YES";
      else if (
        this.overviewReportNames[i].logicValidated == "NO" ||
        this.overviewReportNames[i].logicValidated == "false"
      )
        this.overviewReportNames[i].logicValidated = "NO";
    }

    this.overviewReportNames.sort((a, b) => {
      return a.division < b.division ? -1 : a.division > b.division ? 1 : 0;
    });
  }
  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.activatedRoute.params.subscribe((params) => {
      if (params.token) {
        this.token = params.token;
      }
    });

    this.getUser();
    this.httpService.getData(PATH.COMPLIANCE_REPORT_NAMES).subscribe((res) => {
      this.todoReportNames = res.todo;
      this.crossedReportNames = res.dueDateCrossed;
      this.completedReportNames = res.completed;
    });
  }
 
  getSubmittedOverview() {
    this.httpService.getData(PATH.COMPLIANCE_REPORT_NAMES).subscribe((res) => {
      this.todoReportNames = res.todo;
      this.crossedReportNames = res.dueDateCrossed;
      this.completedReportNames = res.completed;
    });
  }

  getReview() {
    this.httpService.getData(PATH.COMPLIANCE_CATALOG).subscribe((res) => {
      this.reviews = res;
    });
  }

  download() {
    this.httpService.download(PATH.DOWNLOAD_EXCEL).subscribe((res) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = "complianceReview.xlsx";
      a.click();
    });
  }
  getCatalog() {
    this.reportNames = [];
    this.reports = [];
    this.data.division=null;
    this.data.reportName=null;
    this.httpService
      .getData(PATH.COMPLIANCE_REVIEW, { reportType: this.data.reportType })
      .subscribe((res) => {
        this.catalogs = [
          // {
          //   division: "Select Option",
          //   reportNo: "Select Option",
          //   reportName: "Select Option",
          //   logicReviewDate: new Date(),
          //   value: null,
          // },
          ...res,
        ];
        this.reportNames = _.uniqBy(this.catalogs, "division");

        // console.log(this.reportNames)
        // this.data.lastReviewDate=new Date(Math.max.apply(null, res.map(function(e) {
        //   return new Date(e.lastReviewDate);
        // })))
      });
  }
  getReports() {
    // this.validation();
    if (this.data.division) {
      // if(this.validation())
      this.reports = this.catalogs.filter((o) => {
        return o.division == this.data.division;
      });
      // this.reports = _.uniqBy(this.reports, "reportName");
      // console.log(this.reports)
    }
  }
  reportChanged() {
    // this.validation();
    // console.log(dt);
    if (this.data.reportName) {
      // if(this.validation())
      let selectedReport = this.reports.find((o) => {
        return o.reportName == this.data.reportName;
      });
      // console.log(selectedReport);
      this.data.lastReviewDate = selectedReport
        ? new Date(selectedReport.lastReviewDate)
        : new Date();
    }

    // this.data.lastReviewDate=new Date(report.logicReviewDate)
  }
  // validation():boolean{
  //   console.log("Report:",this.data.reportType,"\nDivision:",this.data.division,"\nrName:",this.data.reportName)
  //   if(this.data.division=="null"){
  //     this.errorMessage="Enter value for Division";
  //     return false;
  //   }

  //   if(this.data.reportName=="null"){
  //     this.errorMessage="Enter value for Report Name";
  //     return false;
  //   }

  //    if(this.data.reportType=="null"){
  //     this.errorMessage="Enter value for Report Type";
  //       return false;
  //     }
  //   return true;
  // }

  sortBy(input) {
    if (input == "division") {
      this.overviewReportNames.sort(function (a, b) {
        return a.division < b.division ? -1 : a.division > b.division ? 1 : 0;
      });
    } else if (input == "reportType") {
      this.overviewReportNames.sort(function (a, b) {
        return a.reportType < b.reportType
          ? -1
          : a.reportType > b.reportType
          ? 1
          : 0;
      });
    } else if (input == "lastReviewDate") {
      this.overviewReportNames.sort(function (a, b) {
        return a.lastReviewDate < b.lastReviewDate
          ? -1
          : a.lastReviewDate > b.lastReviewDate
          ? 1
          : 0;
      });
    }
  }

  save(form: FormGroup) {
    let dt = form.getRawValue();
    form.markAllAsTouched();

    if (form.invalid) {
      console.log(form.controls["reportType"].value);
      console.log(form.controls["division"].value);
      if (form.controls["reportType"].value == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Please Select Report Type",
        });
      }

      if (form.controls["division"].value == null) {
        console.log("XXXXXXXXXXXXX");
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Please Select Division",
        });
      }
      if (form.controls["reportName"].value == null) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Please Select Report Name",
        });
      }
      return;
    }

    if (
      form.controls["logicValidated"].value == null ||
      form.controls["logicValidated"].value.label == "No"
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail:
          "Please validate report output. If Validated, value should be 'YES'.",
      });
      return;
    }

    this.confirmationService.confirm({
      message: "Are you sure that you want to Save?",
      accept: () => {
        console.log(dt);
        if (!dt.logicValidated) dt.logicValidated = false;
        else dt.logicValidated = dt.logicValidated.value;
        dt.lastReviewDate = new Date();
        this.httpService.postData(dt, PATH.COMPLIANCE_REVIEW).subscribe(
          (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Saved Successfully",
            });
            res.lastReviewDate = new Date(res.lastReviewDate);
            res.logicReviewDate = new Date(res.logicReviewDate);
            res.logicValidated = { value: res.logicValidated };
            // form.patchValue(res);
            this.httpService
              .getData(PATH.COMPLIANCE_REPORT_NAMES)
              .subscribe((res) => {
                console.log(res.todo.length);
                console.log(res.dueDateCrossed.length);
                console.log(res.completed.length);
                this.todoReportNames = res.todo;
                this.crossedReportNames = res.dueDateCrossed;
                this.completedReportNames = res.completed;
              });
            // form.reset();
          },
          (err) => {
            this.messageService.add({
              severity: "Errpr",
              summary: "Error",
              detail: "Compliance review failed ",
            });
          }
        );
      },
      reject: () => {},
    });
  }
}
