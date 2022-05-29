import { Component, OnInit } from "@angular/core";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { ConfirmationService, MessageService } from "primeng/api";
@Component({
  selector: "app-annex",
  templateUrl: "./annex.component.html",
  styleUrls: ["./annex.component.scss"],
})
export class AnnexComponent implements OnInit {
  saveData: any = null;
  displayModal: boolean;
  sales: any[];
  currentFY = new Date().getFullYear();
  params: any = {
    // sector: "MSME",
    finYear: null,
    quarter: "ALL",
  };
  currentYearData: Array<any> = [];
  previousYearData: Array<any> = [];
  quarters: Array<any> = ["Q1", "Q2", "Q3", "Q4"];
  sectors: Array<any> = [
    { name: "Corporate", title: "Corporate" },
    { name: "Retail", title: "Retail" },
    { name: "MSME", title: "MSME" },
    { name: "Aggriculture", title: "Agriculture" },
  ];
  quarterWiseData: Array<any> = [];
  data = {
    Corporate: { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
    Retail: { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
    MSME: { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
    Aggriculture: { Q1: {}, Q2: {}, Q3: {}, Q4: {} },
  };
  groupValues: any = {};
  clonedProducts: { [s: string]: any } = {};

  constructor(
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    // console.log(this.currentFY)
  }

  ngOnInit(): void {
    // this.getAnnex();
    this.getPreviousAnnex();
    this.getAnnex();
    // this.getCurrentAnnex();
    // this.loaded=true;
  }
  getAnnex(sector?) {
    let params = { ...this.params };
    params.finYear = this.currentFY + "-" + (this.currentFY + 1);
    this.httpService.getData(PATH.ANNEX, params).subscribe((res) => {
      this.quarterWiseData = res.advancesResponseList;
      this.groupValues = _.groupBy(this.quarterWiseData, "sector");
      // console.log(this.groupValues);
      Object.keys(this.data).map((o) => {
        if (this.groupValues[o]) {
          let qt = _.groupBy(this.groupValues[o], "quarter");
          // console.log(qt);
          Object.keys(this.data[o]).map((q) => {
            if (qt[q]) {
              // qt[q][0]['status']=null;
              this.data[o][q] = qt[q][qt[q].length - 1];
              // console.log(qt[q][0]["status"]);
            } else {
              this.data[o][q] = {
                sector: o,
                quarter: q,
                osBalance: null,
                grossNPA: null,
                percentileNPA: null,
                finYear: params.finYear,
                new: true,
                status: "CREATED",
              };
            }
          });
        } else {
          Object.keys(this.data[o]).map((q) => {
            this.data[o][q] = {
              sector: o,
              quarter: q,
              osBalance: null,
              grossNPA: null,
              percentileNPA: null,
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
    this.httpService.getData(PATH.ANNEX, params).subscribe((res) => {
      this.previousYearData = res.advancesResponseList;
      // console.log(res);
    });
  }
  getCurrentAnnex() {
    let params = { ...this.params };
    params.finYear = this.currentFY + "-" + (this.currentFY + 1);
    delete params.quarter;
    this.httpService.getData(PATH.ANNEX, params).subscribe((res) => {
      this.currentYearData = res.advancesResponseList;
    });
  }
  arrayOf(n) {
    return Array(n);
  }
  findData(sector, i, col) {
    // console.log(sector,i)
    if (i == 0) {
      let dt = this.previousYearData.find((o) => {
        return o.sector == sector;
      });
      return dt ? dt[col] : "";
    }
    if (i == 5) {
      let dt = this.currentYearData.find((o) => {
        return o.sector == sector;
      });
      return dt ? dt[col] : "";
    }
  }
  findSum(i, col) {
    if (i == 0) {
      var total = 0;
      this.previousYearData.forEach((item) => {
        total += item[col];
      });

      return total ? total.toFixed(2) : null;
    }
    if (i == 5) {
      var total = 0;
      this.currentYearData.forEach((item) => {
        total += item[col];
      });
      return total ? total.toFixed(2) : null;
    } else {
      var total = 0;
      Object.keys(this.data).map((k) => {
        total += this.data[k]["Q" + i][col] ? parseFloat(this.data[k]["Q" + i][col]) : 0;
      });
      if (col == 'percentileNPA' && total >= 99) {
        total = 100;
      }
      return total ? total.toFixed(2) : null;
    }
  }
  save(sector, quarter) {
    if (this.data[sector]["Q" + quarter].new) {
      this.httpService
        .postData(this.data[sector]["Q" + quarter], PATH.ANNEX)
        .subscribe((res) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Created Successfully",
          });
          this.getAnnex();
        });
    } else {
      this.httpService
        .patch(this.data[sector]["Q" + quarter], PATH.ANNEX)
        .subscribe((res) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Updated Successfully",
          });
          this.getAnnex();
        });
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
  onRowEditInit(sector, index) {
    // this.clonedProducts = Object.assign({}, this.data[sector]);
    this.clonedProducts[index] = _.cloneDeep(this.data[sector]);

    // console.log(this.clonedProducts);
  }
  onRowEditCancel(sector, index) {
    // console.log(this.clonedProducts);
    this.data[sector] = this.clonedProducts[index];
    delete this.clonedProducts[index];
    // return data;
  }
  onRowEditSave(data) {
    console.log(data);
    this.displayModal = true;
    this.saveData = data;
  }
  saveAnnex() {
    Object.keys(this.data).map((o, i) => {
      let dt = this.data[o]["Q" + this.data[o].editable];
      if (this.data[o]["Q" + this.data[o].editable].new && (dt.osBalance || dt.grossNPA || dt.percentileNPA)) {
        this.httpService
          .postData(this.data[o]["Q" + this.data[o].editable], PATH.ANNEX)
          .subscribe((res) => {
            if (i >= 3) {
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
          .patch(this.data[o]["Q" + this.data[o].editable], PATH.ANNEX)
          .subscribe((res) => {
            if (i >= 3) {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Updated Successfully",
              });
              this.getAnnex();
            }
          });
      }
    });
  }

  postAnnex() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Submit?',
      accept: () => {
        if (!this.checkValues()) {
          this.submitData();
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Cannot Submit Empty/Zero values",
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
      if ((dt.osBalance && dt.osBalance > 0) && (dt.grossNPA && dt.grossNPA > 0) && (dt.percentileNPA && dt.percentileNPA > 0)) {
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
        .postData(this.data[o]["Q" + this.data[o].editable], PATH.ANNEX_POST)
        .subscribe((res) => {
          if (i >= 3) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.getAnnex();
          }
        });
    });
  }

  findPercentile(os, gross, name?, index?) {
    let percent
    if (parseFloat(os) > 0 && parseFloat(gross) > 0) {
      percent = (parseInt(gross) / parseInt(os)) * 100;
      this.data[name]['Q' + index]['percentileNPA'] = percent;
      return percent.toFixed(2);
    } else {
      return null;
    }
  }

  findPercentileSum(npa, gross) {
    if (npa > 0 && gross > 0) {
      return ((parseFloat(npa) / parseFloat(gross)) * 100).toFixed(2)
    } else {
      return null;
    }
  }

}
