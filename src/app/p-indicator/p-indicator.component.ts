import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Route } from "@angular/router";
import { Table } from "primeng/table";
import { Title } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";

@Component({
  selector: "app-p-indicator",
  templateUrl: "./p-indicator.component.html",
  styleUrls: ["./p-indicator.component.scss"],
})
export class PIndicatorComponent implements OnInit, OnDestroy {
  changed: boolean = false;
  submitted: boolean = true;
  data: Array<any> = [];
  display: Array<any> = [];
  displayCopy: Array<any> = [];
  tableNames = [];
  heading: String;
  prevTitle: string;
  id: String;
  currentFY = new Date().getFullYear();
  params: any = {};
  apiParams: any = {};
  @ViewChild("dt") dataTable: Table;
  getUrl: string = null;
  isAdd: boolean = false;
  divisions = [];
  selectedDivision: any = "all";
  dropdownCheck: boolean = false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  metricsWeightageSum: number = 0;
  presentQtrScoreSum:number=0;
  saveBox:boolean = false;
  submitBox:boolean = false;
  

  constructor(
    private route: ActivatedRoute,
    private ti: Title,
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  filter() {
    let dummy = [];
    if (this.selectedDivision == "all") {
      console.log("1234")
      dummy = [...this.displayCopy];
    } else
      dummy = this.displayCopy.filter((o) => {
        return o.divisionName == this.selectedDivision;
      });
      console.log("5678 "+this.selectedDivision+" 1224245 "+dummy.length)
    if (this.id == "POTWM") {
     console.log("FILTER CALLED")
      this.metricsWeightageSum = _.sumBy(dummy, function (o) {
        console.log(o.metricsWeightage)
        return parseInt(o.metricsWeightage);
      });
      this.presentQtrScoreSum = _.sumBy(dummy, function (o) {
        return parseInt(o.presentQtrScore);
      });
     
    }
  }

  ngOnDestroy(): void {
    this.ti.setTitle(this.prevTitle);
  }
  add(): void {
    // console.log("dis:",this.display);
    this.submitted = false;
    if (this.id == "PI") {
      this.display.push({ kpi: "", value: null, status: "" });
    }
  }
  delete(index: number): void {
    this.display.splice(index, index + 1);
  }
  ngOnInit(): void {
    console.log("hh");
    let params = { ...this.params };
    params.finYear = this.currentFY + "-" + (this.currentFY + 1);
    this.prevTitle = this.ti.getTitle();
    this.ti.setTitle("Ease 3.0");
    this.route.params.subscribe((p) => {
      var id = p["id"];
      this.id = id;
      if (id == "PI") {
        this.isAdd = false;
        this.dropdownCheck = false;
        this.deleteBox = true;
        this.deleteBar = true;
        this.saveBox=true;
        this.submitBox=true;
        this.heading = "Performance Indicator";
        this.tableNames = [
          {
            name: "KPI",
            title: "kpi",
            subText: "",
            inpType: "text",
            editable: true,
          },
          {
            name: "Values",
            title: "value",
            subText: "",
            inpType: "number",
            editable: true,
          },
        ];
        this.display = [];
        this.getUrl = PATH.PERFORMANCE_INDICATOR;
        this.getData(this.apiParams);
      } else if (id == "AWB") {
        this.dropdownCheck = false;
        this.isAdd = false;
        this.deleteBox = false;
        this.deleteBar = false;
        this.saveBox=false;
        this.submitBox=false;

        this.heading = "Area wise (with weight) break up of Bank's score";
        this.tableNames = [
          {
            name: "Area",
            subText: "",
            title: "area",
            inpType: "text",
            editable: false,
          },
          {
            name: "Weight",
            subText: "",
            title: "weight",
            inpType: "number",
            editable: false,
          },
          {
            name: "Current Qtr",
            subText: "Score",
            title: "presentQtrScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Previous Qtr",
            subText: "Score",
            title: "previousQtrScore",
            inpType: "number",
            editable: false,
          },          
          {
            name: "Baseline",
            subText: "Score",
            title: "baselineScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Estimated ",
            subText: "Score",
            title: "estimatedScoreOfNextQtr",
            inpType: "number",
            editable: false,
          },
        ];
        this.display = [];
        this.getUrl = PATH.AREA_WISE;
        this.getData(this.apiParams);
      } else if (id == "APWB") {
        this.dropdownCheck = false;
        this.isAdd = false;
        this.deleteBox = false;
        this.deleteBar = false;
        this.submitBox=true;
        this.saveBox=true;
        this.heading = "AP wise break up of Bank's Score";
        this.tableNames = [
          {
            name: "Action Point",
            subText: "",
            title: "actionPoint",
            inpType: "number",
            editable: false,
          },
          {
            name: "Description",
            subText: "",
            title: "description",
            inpType: "text",
            editable: false,
          },
          {
            name: "Metrics Weightage",
            subText: "",
            title: "metricsWeightage",
            inpType: "number",
            editable: false,
          },
          {
            name: "Current Qtr ",
            subText: "Score",
            title: "presentQtrScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Previous Qtr",
            subText: "Score",
            title: "previousQtrScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Baseline ",
            subText: "Score",
            title: "baselineScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Estimated ",
            subText: "Score",
            title: "estimatedScore",
            inpType: "number",
            editable: true,
          },

        ];
        this.display = [];
        this.getUrl = PATH.AP_WISE;
        this.getData(this.apiParams);
      } else if ("POTWM") {
        this.dropdownCheck = true;
        this.isAdd = false;
        this.deleteBox = false;
        this.deleteBar = false;
        this.saveBox=true;
        this.submitBox=true;

        this.heading = "Performance by top metrics (by weight)";
        this.tableNames = [
          {
            name: "Metrics ID",
            subText: "",
            title: "metricsId",
            inpType: "text",
            editable: false,
          },
          {
            name: "Metrics Description",
            subText: "",
            title: "metricsDescription",
            inpType: "text",
            editable: false,
          },
          {
            name: "Division Name",
            subText: "",
            title: "divisionName",
            inpType: "text",
            editable: false,
          },
          {
            name: "Metrics Weightage",
            subText: "",
            title: "metricsWeightage",
            inpType: "number",
            editable: true,
          },
          {
            name: "Current Qtr",
            subText: "Score",
            title: "presentQtrScore",
            inpType: "number",
            editable: true,
          },
          {
            name: "Gap",
            subText: "",
            title: "metricsWeightage-presentQtrScore",
            inpType: "number",
            editable: false,
          },
          {
            name: "Bank Performance",
            subText: "",
            title: "banksPerformance",
            inpType: "number",
            editable: true,
          },
          {
            name: "Benchmark Performance",
            subText: "",
            title: "benchmarkPerformance",
            inpType: "number",
            editable: true,
          },

          {
            name: "Comments",
            subText: "",
            title: "comments",
            inpType: "text",
            editable: true,
          },
          {
            name: "Tentative Timelines",
            subText: "",
            title: "tentativeTimeLines",
            inpType: "date",
            editable: true,
          },
        ];
        this.display = [];
        this.getUrl = PATH.METRICS;
        this.getData(this.apiParams);
      }
    });

    this.httpService.getSelectionObs().subscribe(
      (res) => {
        if (res) {
          let url = "";
          if (this.id == "PI") {
            url = PATH.PERFORMANCE_INDICATOR;
          } else if (this.id == "AWB") {
            url = PATH.AREA_WISE;
          } else if (this.id == "APWB") {
            url = PATH.AP_WISE;
          } else {
            url = PATH.METRICS;
          }
          this.apiParams["finYear"] = res["finYear"]["name"];
          this.apiParams["quarter"] = res["quarter"]["label"];
          this.getData(this.apiParams);
        }
      },
      (err) => {
        console.log(err);
      }
    );

   
  }

  getData(params) {
    console.log("GET DATA CALLED")
    if (params.finYear && params.quarter) {
      this.httpService.getData(this.getUrl, params).subscribe((res) => {
        // res=[]
        this.display = res;
        

        this.displayCopy = res;
        if (this.id == "POTWM") {
          this.filter();
        }
        this.divisions = _.uniqBy(this.display, "divisionName");
        if (res.length == 0) {
          // this.isAdd=false;
        } else {
          // this.isAdd=true
        }
        this.submitted = true;
        this.isSubmitted(this.id);
      });
    }
  }

  save(type) {
    let url = "";
    this.display.map((data, id) => {
      data["finYear"] = this.apiParams["finYear"];
      data["quarter"] = this.apiParams["quarter"];
    });
    let payload = { inputList: this.display };
    if (type == "PI") {
      url = PATH.PERFORMANCE_INDICATOR;
    } else if (type == "AWB") {
      url = PATH.AREA_WISE;
    } else if (type == "APWB") {
      url = PATH.AP_WISE;
    } else {
      url = PATH.METRICS;
    }
    this.httpService.patch(payload, url).subscribe(
      (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Saved Successfully",
        });
        // this.display = res;
        this.getData(this.apiParams);
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      }
    );
  }

  submit(type) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        let url = "";
        this.display.map((data, id) => {
          data["finYear"] = this.apiParams["finYear"];
          data["quarter"] = this.apiParams["quarter"];
        });
        let payload = { inputList: this.display };
        if (type == "PI") {
          url = PATH.PERFORMANCE_INDICATOR_SUBMIT;
        } else if (type == "AWB") {
          url = PATH.AREA_WISE_SUBMIT;
        } else if (type == "APWB") {
          url = PATH.AP_WISE_SUBMIT;
        } else {
          url = PATH.METRICS_SUBMIT;
        }
        this.httpService.postData(payload, url).subscribe(
          (res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Saved Successfully",
            });
            // this.display = res;
            this.getData(this.apiParams);
          },
          (err) => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          }
        );
      },
      reject: () => {
        console.log("reject");
      },
    });

    // this.getData(url, this.apiParams);
  }
  isSubmitted(id) {
    if (this.display) {
      console.log("XXXXXXX1")
      if(id == "PI"){
        this.isAdd=true;
      }

      this.display.map((o) => {
        console.log("XXXXXXXXXXXXXXXX")
        if (o.status != "SUBMITTED") {
          this.submitted = false;
          // this.isAdd=true;
          
        }
        if(o.status == "SUBMITTED"){
          this.isAdd=false;
          this.submitted=true;
        }
        else {
        }
      });
    }
  }
  fileUpload(event, item, type) {
    if (type == "file") {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      item.document = formData;
    }
    this.filter();
  }

  sortBy(header) {
    if (header.inputType == "number") {
      this.display.sort(function (a, b) {
        return parseFloat(a[header.title]) - parseFloat(b[header.title]);
      });
    } else if (header.inputType == "text") {
      this.display.sort(function (a, b) {
        return a[header.title] - b[header.title];
      });
    } else {
      this.display.sort(function (a, b) {
        var c: any = new Date(a[header.title]);
        var d: any = new Date(b[header.title]);
        return c - d;
      });
    }
  }
}
