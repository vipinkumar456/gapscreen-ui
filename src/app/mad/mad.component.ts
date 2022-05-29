import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { Table } from "primeng/table";
import { disableDebugTools, Title, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mad',
  templateUrl: './mad.component.html',
  styleUrls: ['./mad.component.scss']
})
export class MadComponent implements OnInit {
  positionsForm: FormGroup;
  pageHeading: string;
  formData: any;
  map = new Map();
  annexurName: any;
  errorMessage;
  dropDown: any = {};
  reportType = [];
  quarters: any;
  tableType1: boolean = false;
  tableType2: boolean = false;
  comments: any;
  status: string;
  annexuresData: Array<any> = [];
  quarter;
  defDataExternalRating;
  defDataPipelineStress;
  defDataRecoveryInitiatives;
  defGrossAdvances;
  isMaker: boolean = false;
  isChecker: boolean = false;
  isTableData: boolean = false;
  statusFlag: boolean = false;
  def;
  reportStatus;
  reportStatusFlag;
  isEditableQ1: boolean = false;
  isEditableQ2: boolean = false;
  isEditableQ3: boolean = false;
  isEditableQ4: boolean = false;
  newAnnexureData: any = [];
  q1Status;
  q2Status;
  q3Status;
  q4Status;
  isUpdate: boolean = false;
  isQuarter: boolean = false;
  buttonVariable: string = 'Save';
  quarterFlag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ti: Title,
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.prepareForm()
// API call for get all quaters
    this.httpService.getData(PATH.POSITION_GET_ALL).subscribe((res) => {
      this.prepareDropdown(res);
      this.prepareData();
      this.getQuarterData(this.formData);
    });
  }

  // for dropdown rp name and year
  prepareForm() {
    this.positionsForm = this.fb.group({
      "annexureName": ['', Validators.required],
      "finYear": ['', Validators.required]
    })
  }

  // call on search when rp and year selected
  submitForm() {
    this.formData = this.positionsForm.value;
    let formVal = this.positionsForm.value;
    let data = {
      "finYear": formVal.finYear,
      "annexureName": formVal.annexureName,
      "quarter": "ALL"
    }
    if (this.positionsForm.valid) {
// API call for getting all records
      this.httpService.getData(PATH.POSITION_GET_RECORDS, data).subscribe((res) => {

        let resData: any = res
        let newData: any = [];


        if (resData) {

          let q1Data = resData[0].annexureResponses;
          let q2Data = resData[1].annexureResponses;
          let q3Data = resData[2].annexureResponses;
          let q4Data = resData[3].annexureResponses;
          this.q1Status = resData[0].status;
          this.q2Status = resData[1].status;
          this.q3Status = resData[2].status;
          this.q4Status = resData[3].status;

          const data = [];
          let dataLength: number;

          if (this.formData.annexureName == "ExternalRating") {
            dataLength = this.defDataExternalRating.length - 1;
          } else if (this.formData.annexureName == "PipelineStress") {
            dataLength = this.defDataPipelineStress.length - 1;
          } else if (this.formData.annexureName == "RecoveryInitiatives") {
            dataLength = this.defDataRecoveryInitiatives.length - 1;
          } else if (this.formData.annexureName == "GrossAdvances") {
            dataLength = this.defGrossAdvances.length - 1;
          }

          for (let i = 0; i <= dataLength; i++) {

            let def;

            if (this.formData.annexureName == "ExternalRating") {
              def = this.defDataExternalRating[i];
            } else if (this.formData.annexureName == "PipelineStress") {
              def = this.defDataPipelineStress[i];
            } else if (this.formData.annexureName == "RecoveryInitiatives") {
              def = this.defDataRecoveryInitiatives[i];
            } else if (this.formData.annexureName == "GrossAdvances") {
              def = this.defGrossAdvances[i];
            }
            let q1 = q1Data.find(o => { return o.parameterName == def.parameterName }) ? q1Data.find(o => { return o.parameterName == def.parameterName }) : def;
            let q2 = q2Data.find(o => { return o.parameterName == def.parameterName }) ? q2Data.find(o => { return o.parameterName == def.parameterName }) : def;
            let q3 = q3Data.find(o => { return o.parameterName == def.parameterName }) ? q3Data.find(o => { return o.parameterName == def.parameterName }) : def;
            let q4 = q4Data.find(o => { return o.parameterName == def.parameterName }) ? q4Data.find(o => { return o.parameterName == def.parameterName }) : def;

            let col = {
              'parameterName': q4.parameterName, title: def['title'], 'Q1': q1.amount,
              'grossNPAQ1': q1.grossNPA, 'osBalanceQ1': q1.osBalance, 'percentileNPAQ1': q1.percentileNPA,
              'Q2': q2.amount, 'grossNPAQ2': q2.grossNPA, 'osBalanceQ2': q2.osBalance,
              'percentileNPAQ2': q2.percentileNPA, 'Q3': q3.amount, 'grossNPAQ3': q3.grossNPA,
              'osBalanceQ3': q3.osBalance, 'percentileNPAQ3': q3.percentileNPA,
              'Q4': q4.amount, 'grossNPAQ4': q4.grossNPA, 'osBalanceQ4': q4.osBalance,
              'percentileNPAQ4': q4.percentileNPA
            };
            data.push(col);
          }
          this.annexuresData = data;
        }
        this.getTableHeading(this.formData.annexureName);
        this.isTableData = true;
        this.report(this.formData.annexureName)
        this.getRoleByAnnexure(this.formData.annexureName)
      })
    } else {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "All fields are required",
      });
      return;
    }
  }

  // For set table heading as par list name

  getTableHeading(val) {
    let tableHeading = [
      { level: "ExternalRating", value: "External Rating of fresh sanctions" },
      { level: "PipelineStress", value: "Pipeline stress" },
      { level: "RecoveryInitiatives", value: "Position of Recovery - Recovery initiatives" },
      { level: "GrossAdvances", value: "Advances and NPAs (Gross)" },
    ]

    let report: any = {}
    report = tableHeading.filter((o) => o.level === val);
    this.pageHeading = report[0].value;
  }

  // For dropDown

  prepareDropdown(data) {
    this.annexurName = data;
    this.dropDown.annexur = this.annexurName.map(i => { return { label: i, value: i } })
    this.quarters = [{ label: "Apr -June(Q1)", value: "Q1" }, { label: "July - Sep(Q2)", value: "Q2" }, { label: "Oct - Dec(Q3)", value: "Q3" }, { label: "Jan - March(Q4)", value: "Q4" }]
    let years = ["2024-2025","2023-2024", "2022-2023", "2021-2022", "2020-2021", "2019-2020", "2018-2019"]
    this.dropDown.years = years.map(i => { return { label: i, value: i } })
  }

// decalre table types
  report(val) {
    let type1 = ["PipelineStress", "RecoveryInitiatives", "ExternalRating"]
    let type2 = ["GrossAdvances"];

    if (type1.find(elm => elm == val)) {
      this.tableType1 = true
      this.tableType2 = false
      return;
    }
    if (type2.find(elm => elm == val)) {
      this.tableType1 = false
      this.tableType2 = true
      return
    }
  }
  
// calls on save
  save() {
    let quarter = this.quarter;
    this.pushDataToArray(quarter);
    let data = {
      "annexureName": this.formData.annexureName,
      "annexureRequests": this.newAnnexureData,
      "comments": this.comments,
      "finYear": this.formData.finYear,
      "quarter": this.quarter,
      "status": "UPDATED"
    }
    // API call for save and create
    this.httpService.postData(data, PATH.POSITION_POST_SAVE_CREATE).subscribe((res) => {
      this.status = res.status;
      if (this.status == undefined) {
        this.buttonVariable = 'Save';
      } else {
        this.buttonVariable = 'Update';
      }
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Records Saved Successfully",
      });
    },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        this.submitForm();
      })
  }
  pushDataToArray(quarter) {
    if (this.formData.annexureName == 'GrossAdvances') {
      this.annexuresData.forEach(elm => {
        if (quarter == "Q1") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': 0, 'grossNPA': elm.grossNPAQ1, 'osBalance': elm.osBalanceQ1, 'percentileNPA': elm.percentileNPAQ1 })
        }
        if (quarter == "Q2") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': 0, 'grossNPA': elm.grossNPAQ2, 'osBalance': elm.osBalanceQ2, 'percentileNPA': elm.percentileNPAQ2 })
        }
        if (quarter == "Q3") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': 0, 'grossNPA': elm.grossNPAQ3, 'osBalance': elm.osBalanceQ3, 'percentileNPA': elm.percentileNPAQ3 })
        }
        if (quarter == "Q4") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': 0, 'grossNPA': elm.grossNPAQ4, 'osBalance': elm.osBalanceQ4, 'percentileNPA': elm.percentileNPAQ4 })
        }
      })
    } else {
      this.annexuresData.forEach(elm => {
        if (quarter == "Q1") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': elm.Q1, 'grossNPA': 0, 'osBalance': 0, 'percentileNPA': 0 })
        }
        if (quarter == "Q2") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': elm.Q2, 'grossNPA': 0, 'osBalance': 0, 'percentileNPA': 0 })
        }
        if (quarter == "Q3") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': elm.Q3, 'grossNPA': 0, 'osBalance': 0, 'percentileNPA': 0 })
        }
        if (quarter == "Q4") {
          this.newAnnexureData.push({ 'parameterName': elm.parameterName, 'amount': elm.Q4, 'grossNPA': 0, 'osBalance': 0, 'percentileNPA': 0 })
        }
      })
    }
  }
// called in save

  submitOrAPPROVOrREJECT(input) {

    // if (this.status == "CREATED" || this.status == "UPDATED" || this.status == "REJECTED") {
    //   this.updateData()
    // }

    let submitFlag = true;
    if (input == "REJECTED" && !this.comments) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag = false;
    }

    let data = {
      "annexureName": this.formData.annexureName,
      "annexureRequests": this.newAnnexureData,
      "comments": this.comments,
      "finYear": this.formData.finYear,
      "quarter": this.quarter,
      "status": input
    }
    if (submitFlag) {
      // API call for submit approve and reject
      this.httpService.postData(data, PATH.POSITION_POST_SUBMIT_APPROVE_REJECT).subscribe((res) => {
        let quarter = res.quarter
        let status = res.status
        this.status = res.status;
        if (status == 'SUBMITTED' || status == 'APPROVED' || this.isChecker) {

          if (quarter == 'Q1') {
            this.isEditableQ1 = false;
          }
          if (quarter == 'Q2') {
            this.isEditableQ2 = false;
          }
          if (quarter == 'Q3') {
            this.isEditableQ3 = false;
          }
          if (quarter == 'Q4') {
            this.isEditableQ4 = false;
          }
        } else {
          if (quarter == 'Q1') {
            this.isEditableQ1 = true;
          }
          if (quarter == 'Q2') {
            this.isEditableQ2 = true;
          }
          if (quarter == 'Q3') {
            this.isEditableQ3 = true;
          }
          if (quarter == 'Q4') {
            this.isEditableQ4 = true;
          }
        }

        let succesMsg;
        if (input == 'SUBMITTED') {
          succesMsg = "Records Submitted Successfully"
        } else if (input == 'APPROVED') {
          succesMsg = "Records Approved Successfully"
        } else if (input == 'REJECTED') {
          succesMsg = "Records Rejected Successfully"
        }

        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: succesMsg,
        });

        this.submitForm();

      },(err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
        })
    }
  }

  // calls on submit
  confirm(val) {
    let msg;
    // same for APPROVED and REJECTED
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
          let quarter = this.quarter;
          this.pushDataToArray(quarter);
          let data = {
            "annexureName": this.formData.annexureName,
            "annexureRequests": this.newAnnexureData,
            "comments": this.comments,
            "finYear": this.formData.finYear,
            "quarter": this.quarter,
            "status": "UPDATED"
          }
          this.httpService.patch(data, PATH.POSITION_PATCH_UPDATE).subscribe((res) => {
            this.submitOrAPPROVOrREJECT(val)
          });
        } else {
           this.submitOrAPPROVOrREJECT(val)
        }
      }
    });
  }

  // For quarter data

  getQuarterData(val) {
    this.isEditableQ1 = false;
    this.isEditableQ2 = false;
    this.isEditableQ3 = false;
    this.isEditableQ4 = false;

    this.quarterFlag = false;
    this.comments = "";
    let formVal = this.positionsForm.value;
    let data = {
      "finYear": formVal.finYear,
      "annexureName": formVal.annexureName,
      "quarter": val
    }
    if (this.positionsForm.valid) {
      this.getRoleByAnnexure(formVal.annexureName)
      if (val == 'Q1') {
        this.quarterFlag = true;
      }
      if (val == 'Q2') {
        if (this.q1Status == 'APPROVED') {
          this.quarterFlag = true;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Previous quarter data is not approved",
          });
        }
      }
      if (val == 'Q3') {
        if (this.q2Status == 'APPROVED') {
          this.quarterFlag = true;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Previous quarter data is not approved",
          });
        }
      }
      if (val == 'Q4') {
        if (this.q3Status == 'APPROVED') {
          this.quarterFlag = true;
        } else {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Previous quarter data is not approved",
          });
        }
      }
      if (this.quarterFlag) {
        this.httpService.getData(PATH.POSITION_GET_RECORDS, data).subscribe((res) => {
          this.status = res[0].status;
          this.comments = res[0].comments;
          let quarter = res[0].quarter;
          this.isQuarter = true;
          if (this.status == undefined) {
            this.buttonVariable = 'Save';
          } else {
            this.buttonVariable = 'Update';
          }
          if ((this.status == 'SUBMITTED' || this.status == 'APPROVED') && this.isMaker) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "This quarter is already submitted or approved",
            });
          }
          if (this.isChecker && this.status == 'APPROVED') {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "This quarter is already approved",
            });
          }
          if (this.status == 'SUBMITTED' || this.status == 'APPROVED') {

            if (quarter == 'Q1') {
              this.isEditableQ1 = false;
              this.q1Status = this.status;
            }
            if (quarter == 'Q2') {
              this.isEditableQ2 = false;
              this.q2Status = this.status;
            }
            if (quarter == 'Q3') {
              this.isEditableQ3 = false;
              this.q3Status = this.status;
            }
            if (quarter == 'Q4') {
              this.isEditableQ4 = false;
              this.q4Status = this.status;
            }
          } else {
            if (quarter == 'Q1') {
              this.q1Status = status;
              if (this.isMaker)
                this.isEditableQ1 = true
            }

            if (quarter == 'Q2') {
              this.q2Status = status;
              if (this.isMaker)
                this.isEditableQ2 = true;

            }
            if (quarter == 'Q3') {
              this.q2Status = status;
              if (this.isMaker)
                this.isEditableQ3 = true;
            }
            if (quarter == 'Q4') {
              this.q2Status = status;
              if (this.isMaker)
                this.isEditableQ4 = true;
            }
          }
        })
      }
    }

  }

  // table title and column names
  prepareData() {

    this.defDataExternalRating = [
      { title: 'AAA', parameterName: 'aaa', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'AA', parameterName: 'aa', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'A ', parameterName: 'a', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'BBB', parameterName: 'bbb', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'BB', parameterName: 'b', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'B', parameterName: 'b', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'C', parameterName: 'c', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'D', parameterName: 'd', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Unrated', parameterName: 'unrated', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },

    ]

    this.defDataPipelineStress = [{ title: 'Standard Restructured exposure', parameterName: 'standRestExpo', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'RFAs exposure (Standard + NPAs)', parameterName: 'rfaExpo', amount: '' },
    { title: 'Signing of ICA1 Pending (exposure)(Standard + NPAs)', parameterName: 'signingPending', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposures below hurdle level rating(Standard) ', parameterName: 'expoBelowHur', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposures   that   have   seen   ratings downgrade (Standard)	', parameterName: 'expoDownGrade', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposures with stressed sectors', parameterName: 'expoWithStdSec', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Project loans where DCCO was not achieved / extended (exposure for Standard accounts)', parameterName: 'proLoans', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposures under special regulatory/supervisory dispensation (Standard + NPAs)', parameterName: 'expoUnderSpec', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposures under Resolution Plan2 (Standard + NPAs)', parameterName: 'expoUnderRes', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    { title: 'Exposure where forensic audit is in progress (Standard + NPAs)', parameterName: 'forensicAudit', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    ]

    this.defDataRecoveryInitiatives = [
      { title: 'Stressed Asset Management Vertical (SAMV)', parameterName: 'samv', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'War Room', parameterName: 'warRoom', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Sale to ARCs', parameterName: 'sale', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Others	', parameterName: 'others', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Recovery from IBC / NCLT Accounts	', parameterName: 'recovery', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Recovery in Written Off Accounts	', parameterName: 'recoverOff', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'OTS Scheme ', parameterName: 'ots', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: ' Total Recovery', parameterName: 'totalRecovery', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: ' Provision Coverage Ratio (with Technical Write Off)', parameterName: 'withWriteOff', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: ' Provision Coverage Ratio (without Technical Write Off)', parameterName: 'withoutWriteoff', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },

    ]
    this.defGrossAdvances = [
      { title: 'Corporate/Others', parameterName: 'corp', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Retail', parameterName: 'retail', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'MSME ', parameterName: 'msme', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
      { title: 'Agriculture', parameterName: 'agri', amount: '', grossNPA: '', osBalance: '', percentileNPA: '' },
    ]

  }

  // API call for getting roles

  getRoleByAnnexure(ev) {
    this.isMaker = false;
    this.isChecker = false;
    this.httpService.getData(PATH.POSITION_GET_ROLES + ev).subscribe((res) => {
      let reportRole = res[0];
      if (reportRole) {
        if (reportRole.includes("MAKER")) {
          this.isMaker = true;
          this.isChecker = false;
        }
        if (reportRole.includes("CHECKER")) {
          this.isChecker = true;
          this.isMaker = false;
          this.isEditableQ1 = false;
          this.isEditableQ2 = false;
          this.isEditableQ3 = false;
          this.isEditableQ4 = false;
        }
      }
    });
  }

  arrayOf(n) {
    return Array(n);
  }

// gross adv:to find total
  findSum(col) {
    var total = 0;
    this.annexuresData.forEach((item) => {
      let itemVal = parseFloat(item[col]);
      if (itemVal)
        total += itemVal;
    });
    return total;
  }

  // gross adv:to find percentile
  findPercentile(gross, os, col, annexur) {
    let percent
    if (parseFloat(annexur[gross]) > 0 && parseFloat(annexur[os]) > 0) {
      percent = (parseInt(annexur[gross]) / parseInt(annexur[os])) * 100;
      annexur[col] = percent;
      return percent.toFixed(2);
    }
  }

// api call for updating data
  updateData() {
    let quarter = this.quarter;
    this.pushDataToArray(quarter);
    let data = {
      "annexureName": this.formData.annexureName,
      "annexureRequests": this.newAnnexureData,
      "comments": this.comments,
      "finYear": this.formData.finYear,
      "quarter": this.quarter,
      "status": "UPDATED"
    }
    this.httpService.patch(data, PATH.POSITION_PATCH_UPDATE).subscribe((res) => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Records Saved Successfully",
      });
      this.submitForm();
    },
      (err) => {

      });
    this.submitForm();


  }
  // called on save button
  saveOrUpdateData() {
    if (this.buttonVariable == 'Save') {
      this.save();
    } else if (this.buttonVariable == 'Update') {
      this.updateData();
    }
// this.quarter = null;
  }
  // quater reset 
  dropDownValChange(val) {
    this.comments = "";
    if (val) {
      this.quarter = "";
      this.isEditableQ1 = false;
      this.isEditableQ2 = false;
      this.isEditableQ3 = false;
      this.isEditableQ4 = false;

    }
  }
// to find percentile sum in gross adv 
  findPercentileSum(npa, gross) {
    if (npa > 0 && gross > 0) {
      return ((parseFloat(npa) / parseFloat(gross)) * 100).toFixed(2)
    } else {
      return null;
    }
  }

}
