import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from 'primeng/table';
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";

@Component({
  selector: "app-stress-related",
  templateUrl: "./stress-related.component.html",
  styleUrls: ["./stress-related.component.scss"],
})
export class StressRelatedComponent implements OnInit {
  title: string = "";
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  @ViewChild('accountForm') public accountForm: NgForm;

  changed: boolean = false;
  type: any = null;
  data: Array<any> = [];
  getUrl: string = null;
  patchUrl: string = null;
  postUrl: string = null;
  submitUrl: string = null;
  downloadUrl: string = null;
  clonedAccounts: { [s: string]: any } = {};
  submitted: boolean = true;
  tableNames: Array<any> = [];
  qts: Array<any> = ["March 31", "June 30", "September 30", "December 31"]
  quarter = null;
  year = null;
  size: number = 20;
  isPaginationRequired: boolean = false;
  totalRecords: number = 0;
  activePage: number = 1;
  pages: Array<any> = [];
  @ViewChild('dt') dataTable: Table;
  subText = "Standard accounts";
  totalPages: any;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private elementRef: ElementRef,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    let currentMonth = new Date().getMonth()
    let currentYear = new Date().getFullYear()
    let qt = ~~(currentMonth / 3)
    // console.log(qt)
    this.quarter = qt ? this.qts[qt - 1] : this.qts[3]
    if (!qt) {
      this.year = currentYear - 1
    } else {
      this.year = currentYear
    }
    this.route.params.subscribe((params) => {
      this.type = params["type"];
      if (this.type == "8-standard" || this.type == "8-npa" || this.type == "4" || this.type == "7-standard" || this.type == "7-npa" || this.type == "5") {
        this.tableNames = [];
        this.tableNames.push(
          { name: "Borrower Name", title: "borrowerName", inputType: "text" },
          { name: "Segment", title: "segment", inputType: "text", subText: "(Infra, NBFC, SME, Retail, Telcom, etc.)" },
          { name: "Exposure", title: "exposure", inputType: "number" },
          { name: "OutStanding", title: "outstanding", inputType: "number", subText: "(FB+NFB+Inv)" },
          { name: "Assett Classification", title: "assetClassification", inputType: "text", subText: "(Including SMA status)" },
          { name: "Provision Made", title: "provision", inputType: "number" });
      } else {
        this.tableNames = [];
        this.tableNames.push(
          { name: "Borrower Name", title: "borrowerName", inputType: "text" },
          { name: "Exposure", title: "exposure", inputType: "number" },
          { name: "OutStanding", title: "outstanding", inputType: "number" });
        this.isPaginationRequired = true;
      }
      switch (this.type) {
        case "8-standard":
          this.getUrl = PATH.ACCOUNT_BORROWALS_STD;
          this.postUrl = PATH.ACCOUNT_BORROWALS_STD_IMPORT;
          this.patchUrl = PATH.ACCOUNT_BORROWALS_STD_UPDATE;
          this.submitUrl = PATH.ACCOUNT_BORROWALS_STD_SUBMIT;
          this.title =
            "Top 20 Borrowal accounts where forensic audit is on-going";
          this.downloadUrl =
            "./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
          this.getData();
          break;
        case "8-npa":
          this.getUrl = PATH.ACCOUNT_BORROWALS_NPA;
          this.postUrl = PATH.ACCOUNT_BORROWALS_NPA_IMPORT;
          this.patchUrl = PATH.ACCOUNT_BORROWALS_NPA_UPDATE;
          this.submitUrl = PATH.ACCOUNT_BORROWALS_NPA_SUBMIT;
          this.title =
            "Top 20 Borrowal accounts where forensic audit is on-going";
          this.subText = "NPA accounts";
          this.downloadUrl =
            "./assets/files/Top 20 Borrowal Accounts where Forensic Audit is on-going.xlsx";
          this.getData();
          break;
        case "4":
          this.getUrl = PATH.ACCOUNT_STRESSED;
          this.postUrl = PATH.ACCOUNT_STRESSED_IMPORT;
          this.patchUrl = PATH.ACCOUNT_STRESSED_UPDATE;
          this.submitUrl = PATH.ACCOUNT_STRESSED_SUBMIT;
          this.downloadUrl =
            "./assets/files/Top 20 Stressed Accounts Identified by Bank.xlsx";
          this.title = "Top 20 Stressed accounts identified by bank";
          this.getData();
          break;
        case "5":
          this.getUrl = PATH.ACCOUNT_WATCHlIST;
          this.postUrl = PATH.ACCOUNT_WATCHlIST_IMPORT;
          this.patchUrl = PATH.ACCOUNT_WATCHlIST_UPDATE;
          this.submitUrl = PATH.ACCOUNT_WATCHlIST_SUBMIT;
          this.downloadUrl =
            "./assets/files/Top 20 Watch List Accounts Identified by Bank.xlsx";
          this.title = " Top 20 Watch list accounts identified by bank";
          this.getData();
          break;
        case "7-standard":
          this.getUrl = PATH.ACCOUNT_REGULATORY_STD;
          this.postUrl = PATH.ACCOUNT_REGULATORY_STD_IMPORT;
          this.patchUrl = PATH.ACCOUNT_REGULATORY_STD_UPDATE;
          this.submitUrl = PATH.ACCOUNT_REGULATORY_STD_SUBMIT;
          this.title =
            "Top 20 Accounts where special regulatory/ supervisory dispensation/ deferment in provisioning has been allowed";
          this.downloadUrl =
            "./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
          this.getData();
          break;
        case "7-npa":
          this.getUrl = PATH.ACCOUNT_REGULATORY_NPA;
          this.postUrl = PATH.ACCOUNT_REGULATORY_NPA_IMPORT;
          this.patchUrl = PATH.ACCOUNT_REGULATORY_NPA_UPDATE;
          this.submitUrl = PATH.ACCOUNT_REGULATORY_NPA_SUBMIT;
          this.title =
            "Top 20 Accounts where special regulatory/ supervisory dispensation/ deferment in provisioning has been allowed";
          this.subText = "NPA accounts";
          this.downloadUrl =
            "./assets/files/Top 20 Accounts where Special Regulatory-Supervisory dispensation-Deferment in Provisioning has been allowed.xlsx";
          this.getData();
          break;
        case "6":
          this.getUrl = PATH.ACCOUNT_DCCO_DEFERMENT + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_DCCO_DEFERMENT_IMPORT;
          this.patchUrl = PATH.ACCOUNT_DCCO_DEFERMENT_UPDATE;
          this.submitUrl = PATH.ACCOUNT_DCCO_DEFERMENT_SUBMIT;
          this.title =
            "Top 20 Accounts where deferment in DCCO has been allowed";
          this.downloadUrl =
            "./assets/files/Top 20 Accounts where deferment in DCCO has been allowed.xlsx";
          this.getData();
          break;
        case "9-standard":
          this.getUrl = PATH.ACCOUNT_RP_IMPLEMENTED_STD + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_RP_IMPLEMENTED_STD_IMPORT;
          this.patchUrl = PATH.ACCOUNT_RP_IMPLEMENTED_STD_UPDATE;
          this.submitUrl = PATH.ACCOUNT_RP_IMPLEMENTED_STD_SUBMIT;
          this.downloadUrl =
            "./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
          this.title = "List of accounts where Resolution Plan has been implemented as per June 07, 2019 circular of RBI ";
          this.getData();
          break;
        case "9-npa":
          this.getUrl = PATH.ACCOUNT_RP_IMPLEMENTED_NPA + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_RP_IMPLEMENTED_NPA_IMPORT;
          this.patchUrl = PATH.ACCOUNT_RP_IMPLEMENTED_NPA_UPDATE;
          this.submitUrl = PATH.ACCOUNT_RP_IMPLEMENTED_NPA_SUBMIT;
          this.subText = "NPA sccounts";
          this.downloadUrl =
            "./assets/files/List of accounts where Resolution Plan has been implemented.xlsx";
          this.title = "List of accounts where Resolution Plan has been implemented as per June 07, 2019 circular of RBI ";
          this.getData();
          break;
        case "10-standard":
          this.getUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_STD + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_STD_IMPORT;
          this.patchUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_STD_UPDATE;
          this.submitUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_STD_SUBMIT;
          this.tableNames.push({ name: "Provision Made", title: "provision", inputType: "number" },
            { name: "Additional provision for non-implementation of RP", title: "additionalProvision", inputType: "number" });
          this.downloadUrl =
            "./assets/files/List of accounts where RP could not be implemented.xlsx";
          this.title = "List of accounts where RP could not be implemented within 180 days from end of Review Period";
          this.getData();
          break;
        case "10-npa":
          this.getUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_NPA + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_NPA_IMPORT;
          this.patchUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_NPA_UPDATE;
          this.submitUrl = PATH.ACCOUNT_RP_NOT_IMPLEMENTED_NPA_SUBMIT;
          this.subText = "NPA accounts";
          this.tableNames.push({ name: "Provision Made", title: "provision", inputType: "number" },
            { name: "Additional provision for non-implementation of RP", title: "additionalProvision", inputType: "number" });
          this.downloadUrl =
            "./assets/files/List of accounts where RP could not be implemented.xlsx";
          this.subText = "NPA accounts";
          this.title = "List of accounts where RP could not be implemented within 180 days from end of Review Period";
          this.getData();
          break;
        case "11-standard":
          this.getUrl = PATH.ACCOUNT_IBC_STD + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_IBC_STD_IMPORT;
          this.patchUrl = PATH.ACCOUNT_IBC_STD_UPDATE;
          this.submitUrl = PATH.ACCOUNT_IBC_STD_SUBMIT;
          this.tableNames = [];
          this.tableNames.push({ name: "Borrower Name", title: "borrowerName", inputType: "text" },
            { name: "Current Status", title: "currentStatus", inputType: "text", subText: "(SMA 0,SMA 1, SMA 2, SubStandard, D1, D2)" },
            { name: "OutStanding", title: "outstanding", inputType: "number", subText: "(FB+NFB+Inv)" },
            { name: "Provision Made", title: "provision", inputType: "number" },
            { name: "Recovery Expected", title: "recoveryExpected", inputType: "number", subText: "(Amount)" },
            { name: "Remarks (along with ", title: "assetClassification", inputType: "text", subText: "month/year by when recovery is expected)" });
          this.downloadUrl =
            "./assets/files/Accounts currently in IBC.xlsx";
          this.title = "Accounts currently in IBC";
          this.getData();
          break;
        case "11-npa":
          this.getUrl = PATH.ACCOUNT_IBC_NPA + `?pageNumber=${this.activePage}&size=20`;
          this.postUrl = PATH.ACCOUNT_IBC_NPA_IMPORT;
          this.patchUrl = PATH.ACCOUNT_IBC_NPA_UPDATE;
          this.submitUrl = PATH.ACCOUNT_IBC_NPA_SUBMIT;
          this.tableNames = [];
          this.tableNames.push({ name: "Borrower Name", title: "borrowerName", inputType: "text" },
            { name: "Current Status", title: "currentStatus", inputType: "text", subText: "(SMA 0,SMA 1, SMA 2, SubStandard, D1, D2)" },
            { name: "OutStanding", title: "outstanding", inputType: "number", subText: "(FB+NFB+Inv)" },
            { name: "Provision Made", title: "provision", inputType: "number" },
            { name: "Recovery Expected", title: "recoveryExpected", inputType: "number", subText: "(Amount)" },
            { name: "Remarks (along with ", title: "assetClassification", inputType: "text", subText: "month/year by when recovery is expected)" });
          this.downloadUrl =
            "./assets/files/Accounts currently in IBC.xlsx";
          this.title = "Accounts currently in IBC";
          this.subText = "NPA accounts";
          this.getData();
          break;
        default:
          this.router.navigate(["home"]);
      }
    });
  }
  upload() {
    this.fileInput.nativeElement.click();
  }

  getData() {
    let url = this.getUrl;
    this.httpService.getData(this.getUrl).subscribe((res) => {
      if (this.isPaginationRequired) {
        this.data = res['content'];
        this.totalRecords = res['totalElements'];
        this.totalPages = res['totalPages'];
        this.pages = Array(this.totalPages);
      } else {
        this.data = res;
      }

      this.submitted = true;
      this.isSubmitted()
    });
  }

  uploadFile() {
    const formData = new FormData();
    const fileBrowser = this.fileInput.nativeElement;
    console.log(fileBrowser.files[0]);
    formData.append("file", fileBrowser.files[0]);
    this.httpService.postData(formData, this.postUrl).subscribe((res) => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Uploaded Successfully",
      });
      this.getData()
    }, err => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
      this.getData();
    });
  }

  onRowEditInit(account) {
    this.clonedAccounts[account.id] = { ...account };
  }

  onRowEditSave(account) {
    // console.log(account);
    this.httpService.patch(account, this.patchUrl).subscribe(
      (res) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Record Updated Successfully",
        });
        this.getData();
      },
      (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
        this.getData();
      }
    );
  }

  onRowEditCancel(account, index: number) {
    this.data[index] = this.clonedAccounts[account.id];
    delete this.data[account.id];
  }

  download() {
    let link = document.createElement("a");
    link.setAttribute("type", "hidden");
    link.href = this.downloadUrl;
    link.click();
    link.remove();
  }

  save(type) {
    if (type == 'SAVE') {
      this.httpService.patch(this.data, this.patchUrl).subscribe((res) => {
        this.changed = false;
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Records Updated Successfully",
        });
        this.getData();
      },
        (err) => {
          this.changed = false;
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
          this.getData();
        })
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Submit?',
        accept: () => {
          this.httpService.postData(this.data, this.submitUrl).subscribe((res) => {
            this.changed = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Records Submitted Successfully",
            });
            this.getData();
          },
            (err) => {
              this.changed = false;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: err.message,
              });
              this.getData();
            })
        }, reject: () => {
          console.log("reject");
        }
      });
    }

  }
  ngAfterViewChecked() {
    this.elementRef.nativeElement.parentElement.addEventListener('click', (e) => {
      // console.log(e.target.tagName)
      if (e.target.tagName === 'TD') {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault()
      }
    });
    // this.elementRef.nativeElement.parentElement.addEventListener('dblclick',(e) => {

    // });

  }
  event(e) {
    e.stopPropagation()
  }

  isSubmitted() {
    if (this.data) {
      this.data.map(o => {
        if (o.status != "SUBMITTED") {
          this.submitted = false;
        } else {

        }
      });
    }
  }

  setPage(page) {
    this.activePage = page;
    this.getData();
  }

}
