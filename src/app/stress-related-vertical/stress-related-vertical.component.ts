import { Component, OnInit } from "@angular/core";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { ConfirmationService, MessageService } from "primeng/api";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stress-related-vertical',
  templateUrl: './stress-related-vertical.component.html',
  styleUrls: ['./stress-related-vertical.component.scss']
})
export class StressRelatedVerticalComponent implements OnInit {
  saveData: any = null;
  displayModal: boolean;
  sales: any[];
  currentFY = new Date().getFullYear();
  params: any = {
    // sector: "MSME",
    finYear: null,
    quarter: "ALL",
  };
  Sectorname: string = null;
  title: string = null;
  currentYearData: Array<any> = [];
  previousYearData: Array<any> = [];
  quarters: Array<any> = ["Q1", "Q2", "Q3", "Q4"];
  sectors: Array<any> = [];
  quarterWiseData: Array<any> = [];
  data = {};
  Url: string = null;
  submitUrl: string = null;
  groupValues: any = {};
  clonedProducts: { [s: string]: any } = {};
  type: string = null;
  isValueEmpty: any;
  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // console.log(this.currentFY)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.type = params["index"];

    });

    switch (this.type) {
      case "4":
        this.Url = PATH.RECOVERY_INITIATIVE;
        this.submitUrl = PATH.RECOVERY_INITIATIVE_SUBMIT;
        this.title = "Table 4(i): Position of Recovery - Recovery initiatives";
        this.sectors = [];
        this.Sectorname = "Recovery Initiatives";
        this.sectors.push({ name: "Stressed    Asset    Management    Vertical (SAMV)", title: "Stressed    Asset    Management    Vertical (SAMV)" },
          { name: "War Room", title: "War Room" },
          { name: "OTS Scheme (below Rs. 1 Crore)", title: "OTS Scheme (below Rs. 1 Crore)" },
          { name: "OTS Scheme (Rs. 1 - 50 Crore)", title: "OTS Scheme (Rs. 1 - 50 Crore)" },
          { name: "Sale to ARCs", title: "Sale to ARCs" },
          { name: "Others", title: "Others" },
          { name: "Recovery from IBC / NCLT Accounts", title: "Recovery from IBC / NCLT Accounts" },
          { name: "total", title: "Total Recovery", type: "recovery" },
          { name: "blank", title: "blank", type: "blank" },
          { name: "Provision Coverage Ratio (with Technical Write Off)", title: "Provision Coverage Ratio (with Technical Write Off)" },
          { name: "Provision Coverage Ratio (without Technical Write Off)", title: "Provision Coverage Ratio (without Technical Write Off)" });
        this.data = {
          "Stressed    Asset    Management    Vertical (SAMV)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "War Room": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "OTS Scheme (below Rs. 1 Crore)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "OTS Scheme (Rs. 1 - 50 Crore)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Sale to ARCs": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Others": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          // "Total Recovery": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          // "blank": { },
          "Recovery from IBC / NCLT Accounts": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Provision Coverage Ratio (with Technical Write Off)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Provision Coverage Ratio (without Technical Write Off)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
        }
        this.getPreviousAnnex();
        this.getAnnex();
        break;
      case "6":
        this.Url = PATH.PIPELINE_STRESS;
        this.submitUrl = PATH.PIPELINE_STRESS_SUBMIT;
        this.title = "Table 6 (ii): Pipeline stress";
        this.Sectorname = "Parameter";
        this.sectors = [];
        this.sectors.push({ name: "Standard Restructured exposure", title: "Standard Restructured exposure" },
          { name: "RFAs exposure (Standard + NPAs)", title: "RFAs exposure (Standard + NPAs)" },
          { name: "Signing of ICA1 Pending (exposure)(Standard + NPAs)", title: "Signing of ICA1 Pending (exposure)(Standard + NPAs)" },
          { name: "Exposures below hurdle level rating(Standard)", title: "Exposures below hurdle level rating(Standard)" },
          { name: "Exposures that have seen ratingsdowngrade (Standard)", title: "Exposures that have seen ratingsdowngrade (Standard)" },
          { name: "Exposures with stressed sectors", title: "Exposures with stressed sectors" },
          { name: "Project loans where DCCO was not achieved / extended (exposure for Standard accounts)", title: "Project loans where DCCO was not achieved / extended (exposure for Standard accounts)" },
          { name: "Exposures under special regulatory/supervisory dispensation (Standard + NPAs)", title: "Exposures under special regulatory/supervisory dispensation (Standard + NPAs)" },
          { name: "Exposures under Resolution Plan2 (Standard + NPAs)", title: "Exposures under Resolution Plan2 (Standard + NPAs)" },
          { name: "Exposure where forensic audit is in progress (Standard + NPAs)", title: "Exposure where forensic audit is in progress (Standard + NPAs)" });
        this.data = {
          "Standard Restructured exposure": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "RFAs exposure (Standard + NPAs)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Signing of ICA1 Pending (exposure)(Standard + NPAs)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposures below hurdle level rating(Standard)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposures that have seen ratingsdowngrade (Standard)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposures with stressed sectors": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Project loans where DCCO was not achieved / extended (exposure for Standard accounts)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposures under special regulatory/supervisory dispensation (Standard + NPAs)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposures under Resolution Plan2 (Standard + NPAs)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Exposure where forensic audit is in progress (Standard + NPAs)": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
        }
        this.getPreviousAnnex();
        this.getAnnex();
        break;
      case "6iii":
        this.Url = PATH.EXTERNAL_RATING;
        this.submitUrl = PATH.EXTERNAL_RATING_SUBMIT;
        this.title = " Table 6 (iii): External Rating of fresh sanctions";
        this.Sectorname = "Rating";
        this.sectors = [];
        this.sectors.push({ name: "AAA", title: "AAA" },
          { name: "AA", title: "AA" },
          { name: "A", title: "A" },
          { name: "BBB", title: "BBB" },
          { name: "BB", title: "BB" },
          { name: "B", title: "B" },
          { name: "C", title: "C" },
          { name: "D", title: "D" },
          { name: "Unrated", title: "Unrated" });
        this.data = {
          "AAA": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "AA": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "A": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "BBB": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "BB": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "B": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "C": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "D": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
          "Unrated": { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
        }
        this.getPreviousAnnex();
        this.getAnnex();
        break;
      default:
        this.router.navigate(["home"]);
    }
  }
  getAnnex(sector?) {
    let params = { ...this.params };
    params.finYear = this.currentFY + "-" + (this.currentFY + 1);
    this.httpService.getData(this.Url, params).subscribe((res) => {
      this.quarterWiseData = res;
      this.groupValues = _.groupBy(this.quarterWiseData, "parameterName");
      Object.keys(this.data).map((o) => {
        if (this.groupValues[o]) {
          let qt = _.groupBy(this.groupValues[o], "quarter");
          Object.keys(this.data[o]).map((q) => {
            if (qt[q]) {
              this.data[o][q] = qt[q][qt[q].length - 1];
            } else {
              this.data[o][q] = {
                parameterName: o,
                quarter: q,
                amount: null,
                finYear: params.finYear,
                new: true,
                status: "CREATED",
              };
            }
          });
        } else {
          Object.keys(this.data[o]).map((q) => {
            this.data[o][q] = {
              parameterName: o,
              quarter: q,
              amount: null,
              finYear: params.finYear,
              new: true,
              status: "CREATED",
            };
          });
        }
      });
      console.log(this.data);
    });
  }
  getPreviousAnnex() {
    let params = { ...this.params };
    params.finYear = this.currentFY - 1 + "-" + this.currentFY;
    delete params.quarter;
    this.httpService.getData(this.Url, params).subscribe((res) => {
      this.previousYearData = res;
    });
  }

  arrayOf(n) {
    return Array(n);
  }
  findData(sector, i) {
    // console.log(sector,i)
    if (i == 0) {
      let dt = this.previousYearData.find((o) => {
        return o.sector == sector;
      });
      return dt ? dt['amount'] : "";
    }
    if (i == 5) {
      let dt = this.currentYearData.find((o) => {
        return o.sector == sector;
      });
      return dt ? dt['amount'] : "";
    }
  }

  findSum(i) {
    if (this.type != "4") {
      return;
    }
    if (i == 0) {

      var total = 0;
      this.previousYearData.forEach((item) => {
        total += item['amount'];
      });
      return total ? total.toFixed(2) : null;
    }
    if (i == 5) {
      var total = 0;
      this.currentYearData.forEach((item) => {
        total += item['amount'];
      });
      return total ? total.toFixed(2) : null;
    } else {
      var total = 0;
      Object.keys(this.data).map((k) => {
        if (k != "Provision Coverage Ratio (with Technical Write Off)" && k != "Provision Coverage Ratio (without Technical Write Off)") {
          total += this.data[k]["Q" + i]['amount'] ? this.data[k]["Q" + i]['amount'] : 0;
        }
      });
      return total ? total.toFixed(2) : null;
    }
  }

  isEditable(dataSector, q) {
    if (dataSector["Q" + q]["status"]) {
      if (q == 1) {
        if (dataSector["Q" + q]["status"] == "SUBMITTED") {
          return false;
        } else {
          dataSector["editable"] = q;
          return true;
        }
      } else {
        if (
          dataSector["Q" + q]["status"] != "SUBMITTED" &&
          dataSector["Q" + (q - 1)]["status"] == "SUBMITTED"
        ) {
          dataSector["editable"] = q;
          return true;
        } else {
          return false;
        }
      }
    }
  }

  save() {
    Object.keys(this.data).map((o, i) => {
      let dt = this.data[o]["Q" + this.data[o].editable];
      if (this.data[o]["Q" + this.data[o].editable].new && dt.amount) {
        this.httpService
          .postData(this.data[o]["Q" + this.data[o].editable], this.Url)
          .subscribe((res) => {
            if (this.type == "6iii" && i >= 8 || this.type == "6" && i >= 9 || this.type == "4" && i >= 8) {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Saved Successfully",
              });
              this.getAnnex();
            }
          }, err => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Cannot Save Negative value",
            });
            this.getAnnex();
          });
      } else {
        this.httpService
          .patch(this.data[o]["Q" + this.data[o].editable], this.Url)
          .subscribe((res) => {
            if (this.type == "6iii" && i >= 8 || this.type == "6" && i >= 9 || this.type == "4" && i >= 8) {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Updated Successfully",
              });
              this.getAnnex();
            }
          }, err => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Cannot Save Negative value",
            });
            this.getAnnex();
          });
      }
    });
  }

  post() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Submit?',
      accept: () => {
        if (!this.checkValues()) {
          this.submitData();
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Cannot Submit Empty/Negative values",
          });
        }
      }, reject: () => {

      }
    });
  }

  checkValues() {
    let val = [];
    Object.keys(this.data).filter((o, i) => {
      let dt = this.data[o]["Q" + this.data[o].editable];
      if (dt.amount && dt.amount > 0) {
        val.push("false");
      } else {
        val.push("true");
      }
    });
    return val.includes("true");
  }

  submitData() {
    Object.keys(this.data).map((o, i) => {
      this.httpService
        .postData(this.data[o]["Q" + this.data[o].editable], this.submitUrl)
        .subscribe((res) => {
          if (this.type == "6iii" && i >= 8 || this.type == "6" && i >= 10 || this.type == "4" && i >= 8) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Saved Successfully",
            });
          }
          this.getAnnex();
        });
    });
  }

}

