import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleAuthGuardService } from '../role-auth-guard.service';


@Component({
  selector: 'app-pci',
  templateUrl: './pci.component.html',
  styleUrls: ['./pci.component.scss']
})
export class PCIComponent implements OnInit  {
  heading: string;
  display: Array<any> = [];
  issuerData: Array<any> = [];
  submittedToAdd: any;
  myGroup: any;
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
  issuertableNames: Array<any>=[];
  countryForm: FormGroup;
  countryDropDown;
  countryCode;
  countryRes;
  branchName;
  sectionName;
  isRes:any;
  isSubmitted:boolean=false;
  isNewRecord:boolean=false;
  quarterEndingDate;
  selectedSection;
  categoryValues;
  homeCountryValues;
  hostCountryValues;
  assetClassificationValues;
  isView:boolean = false;
  isBorrower:boolean=false;
  isIssuer:boolean=false;
  dropdown:any={}; 
  dropdownYears:any=[];
  selectedQuarter:any;
  total: any = {
    outstandingDebit: 0,
    outstandingCredit: 0,
    amountInvolvedDebit: 0,
    amountInvolvedCredit: 0,
    action : ""
}


  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService
  ) { }


  ngOnInit(): void {
    this.getUser();
    this.roleAuthGuard.canActivate();
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    this.heading = "PCI";
    this.prepareTable();
    this.prepareIssuerTable();
    this.prepareCountryForm();
    this.getCountry();
    this.getPCIDropdonws('Category');
    this.getPCIDropdonws('Asset Classification as per Home Country');
    this.getPCIDropdonws('Asset Classification as per Host Country');
    this.getPCIDropdonws('Asset Classification');
  }

  prepareTable(){
    this.tableNames = [
      { title: "borrowerName",name: "Borrower Name",inpType: "text",editable: true },
      { title: "borrowerGroupName",name: "Borrower Group Name",inpType: "text",editable: true },
      { title: "industry",name: "Industry",inpType: "text",editable: true },
      { title: "soverignChar",name: "Soverign Character",inpType: "text",editable: true },
      { title: "category",name: "Category (New or Existing)",inpType: "text",editable: true },
      { title: "totalLmtSanctioned",name: "Total Limits Sanctioned",inpType: "number",editable: false },
      { title: "fundedLmtSanctioned",name: "Funded Limits Sanctioned",inpType: "number",editable: true },
      { title: "nonFundedLmtSanctioned",name: "Non- Funded Limits Sanctioned",inpType: "number",editable: true },
      { title: "amountOutstanding",name: "Amount Outstanding",inpType: "number",editable: true },
      { title: "ofwhichSecured",name: "Of Which Secured",inpType: "number",editable: true },
      { title: "homeCountry",name: "Asset Classification as per Home Country",inpType: "text",editable: true },
      { title: "hostCountry",name: "Asset Classification as per Host Country",inpType: "text",editable: true },
      { title: "provHeldAtBranch",name: "Provisions Held at Branch",inpType: "number",editable: true },
      { title: "provHeldAtHeadOffice",name: "Provisions Held at Head Office",inpType: "number",editable: true },
      { title: "interestSuspense",name: "Interest Suspense",inpType: "number",editable: true },
      { title: "total",name: "Total",inpType: "text",editable: false },
      { title: "provReqToBeHeldByRegAuth",name: "Provision required to be held by regu. auth.",inpType: "number",editable: true },
      { title: "shortfall",name: "Shortfall",inpType: "text",editable: false },
      { title: "hosupportFunds",name: "H.O. support funds",inpType: "text",editable: true },
      { title: "devDuringTheQuarter",name: "Developments during the quarter",inpType: "text",editable: true },
      // { title: "createdBy",name: "Created By",subText: "",inpType: "text",editable: false},
      // { title: "createdOn",name: "Created On",subText: "",inpType: "text",editable: false}
    ];
  }

  prepareIssuerTable(){
    this.issuertableNames = [
      { title: "issuerName",name: "Issuer Names",inpType:"text",editable: true },
      { title: "issuerGroupName",name: "Issuer Group Name",inpType: "text",editable: true },
      { title: "soverignChar",name: "Soverign Character",inpType: "text",editable: true },
      { title: "category",name: "Category (New or Existing)",inpType: "text",editable: true },
      { title: "bookValue",name: "Book Value",inpType: "number",editable: true },
      { title: "marketValue",name: "Market Value",inpType: "number",editable: true },
      { title: "assetClassification",name: "Asset Classification",inpType: "number",editable: true },
      { title: "provHeldAtBranch",name: "Provisions Held at Branch",inpType: "number",editable: true },
      { title: "provHeldAtHeadOffice",name: "Provisions Held at Head Office",inpType: "number",editable: true },
      { title: "totalProvisions",name: "Total Provisions",inpType: "number",editable: false },
      { title: "provReqToBeHeldByRegAuth",name: "Provisions Required to be held by regu. Auth.",inpType: "number",editable: true },
      { title: "shortfall",name: "Shortfall",inpType: "number",editable: false },
      { title: "hosupportFund",name: "H.O. Support Fund",inpType: "number",editable: true },
      { title: "devDuringTheQuarter",name: "Developments during the Quarter",inpType: "text",editable: true },
      // { title: "createdBy",name: "Created By",subText: "",inpType: "text",editable: false},
      // { title: "createdOn",name: "Created On",subText: "",inpType: "text",editable: false}
    ];
  }

  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "countryName": ['', Validators.required],
      "branchName": [''],
      "quarterEndingDate": ['', Validators.required],
      "sectionName": ['',Validators.required],
      "financialYear":['',Validators.required]
    })
  }

  getPCIDropdonws(itm){
    this.httpService.getData(PATH.PCI_DROPDOWNS+itm).subscribe((res) => {
      console.log(res);
      if(itm=='Category'){
        this.categoryValues=res;
      }
      if(itm=='Asset Classification as per Home Country')
      {
        this.homeCountryValues=res;
      }
      if(itm=='Asset Classification as per Host Country'){
        this.hostCountryValues=res;
      }
      if(itm=='Asset Classification as per Home Country'){
        this.assetClassificationValues=res;
      }
      });
  }

  getRecords() {
    let val=this.countryForm.value
    let countryName=val.countryName;
    let quarterEndingDate=val.quarterEndingDate
    let quarterDateSplit=quarterEndingDate.split("-");
      if(quarterDateSplit[0]=='03'){
        if(val.financialYear && val.quarterEndingDate){
          let financialYear=val.financialYear.split("-");
          this.selectedQuarter=financialYear[1]+'-'+val.quarterEndingDate
         }
      }
      else
      {
        if(val.financialYear && val.quarterEndingDate){
          let financialYear=val.financialYear.split("-");
          this.selectedQuarter=financialYear[0]+'-'+val.quarterEndingDate
         }
      }
    console.log(this.selectedQuarter);
    this.isRes=false;
    this.isSubmitted=false;
    this.isBorrower=false;
    this.isIssuer=false;
    if(this.countryForm.valid){
      if(this.selectedSection=='Part-A'){
        this.httpService.getData(PATH.PCI_BORROWER_GET + "?countryName="+countryName+"&quarterEndingDate="+this.selectedQuarter).subscribe((res) => {
          console.log(res);
        if(res.length>0){
          this.display=res;
          this.isRes=true;
          this.isBorrower=true;
        }
        else{
          this.prepareTable();
          this.display=[];
          this.isBorrower=true;
        }
        });
      }
      if(this.selectedSection=='Part-B'){
        this.httpService.getData(PATH.PCI_ISSUER_GET + "?countryName="+countryName+"&quarterEndingDate="+this.selectedQuarter).subscribe((res) => {
          console.log(res);
        if(res.length>0){
          this.issuerData=res;
          this.isRes=true;
          this.isIssuer=true;
        }
        else{
          this.prepareIssuerTable();
          this.issuerData=[];
          this.isIssuer=true;
        }
        });
      }
    }
  }


  getCountry(){
    this.httpService.getData(PATH.GET_COUNTRY).subscribe((res) => {
      console.log(res);
      let country=res;
      this.countryRes=res;
      this.countryDropDown=country.map(elm =>{return {label:elm.countryName,value:elm.countryName}});
      this.countryCode=country.map(elm =>{return {label:elm.countryCode,value:elm.countryCode}});
      this.branchName=country.map(elm =>{return {label:elm.branchName,value:elm.branchName}});
      let year=new Date().getFullYear() 
        let today = new Date();
        let month=today.getMonth()+1;
        let currentQuarter,currentYear,prev1Year,prev2Year,nextYear;
        if(month<=3){
          currentQuarter=4;
          currentYear=year-1
          nextYear=year;
          prev1Year=year-2;
          prev2Year=year-3;
        }
        else if(month<=6){
          currentQuarter=1;
          currentYear=year;
          nextYear=year+1;
          prev1Year=year-1;
          prev2Year=year-2;
        }
        else if(month<=9){
          currentQuarter=2;
          currentYear=year;
          nextYear=year+1;
          prev1Year=year-1;
          prev2Year=year-2;
        }
        else if(month<=12){
          currentQuarter=3;
          currentYear=year;
          nextYear=year+1;
          prev1Year=year-1;
          prev2Year=year-2;
        }
        this.dropdownYears.push({'label':currentYear+'-'+nextYear,value:currentYear+'-'+nextYear},{'label':prev1Year+'-'+currentYear,value:prev1Year+'-'+currentYear},{'label':prev2Year+'-'+prev1Year,value:prev2Year+'-'+prev1Year}); 
        this.quarterEndingDate = [{label:"Apr -June", value:"06-30"},{label:"July - Sep",value:"09-30"},{label:"Oct - Dec",value:"12-31"} ,{label:"Jan - March",value:"03-31"}]
        this.sectionName = [{label:"Part-A", value:"Part-A"},{label:"Part-B",value:"Part-B"}]
        // this.dropdown.years = [{label:"2024-2025",value:"2024-2025"},{label:"2023-2024",value:"2023-2024"},{label:"2022-2023",value:"2022-2023"},{label:"2021-2022",value:"2021-2022"},
        //                     {label:"2020-2021",value:"2020-2021"},{label:"2019-2020",value:"2019-2020"},{label:"2018-2019",value:"2018-2019"}] 
    });
  }



  totaladdition(itm, name) {
    if(this.selectedSection=='Part-A'){
      this.display.forEach(elm => {
        let fundedLmtSanctioned=0,nonFundedLmtSanctioned=0;
        elm.totalLmtSanctioned=0,elm.total=0,elm.shortfall=0;
        if(elm.fundedLmtSanctioned){
          fundedLmtSanctioned=parseFloat(elm.fundedLmtSanctioned);
        }
        if(elm.nonFundedLmtSanctioned){
          nonFundedLmtSanctioned=parseFloat(elm.nonFundedLmtSanctioned);
        }
        if (elm.fundedLmtSanctioned || elm.nonFundedLmtSanctioned) {
          elm.totalLmtSanctioned = fundedLmtSanctioned + nonFundedLmtSanctioned
          elm.totalLmtSanctioned=parseFloat(elm.totalLmtSanctioned).toFixed(2);
        }
  
        let provHeldAtBranch=0,provHeldAtHeadOffice=0,interestSuspense=0,provReqToBeHeldByRegAuth=0;
        if(elm.provHeldAtBranch){
          provHeldAtBranch=parseFloat(elm.provHeldAtBranch);
        }
        if(elm.provHeldAtHeadOffice){
          provHeldAtHeadOffice=parseFloat(elm.provHeldAtHeadOffice);
        }
        if(elm.interestSuspense){
          interestSuspense=parseFloat(elm.interestSuspense);
        }
        if(elm.provReqToBeHeldByRegAuth){
          provReqToBeHeldByRegAuth=parseFloat(elm.provReqToBeHeldByRegAuth);
        }
        if (elm.provHeldAtBranch || elm.provHeldAtHeadOffice || elm.interestSuspense || elm.provReqToBeHeldByRegAuth) {
          elm.total = provHeldAtBranch + provHeldAtHeadOffice + interestSuspense;
          elm.total=parseFloat(elm.total).toFixed(2);
          elm.shortfall=provReqToBeHeldByRegAuth-parseFloat(elm.total);
          elm.shortfall=parseFloat(elm.shortfall).toFixed(2);
        }
      })
    }
    if(this.selectedSection=='Part-B'){
      this.issuerData.forEach(elm => {
      
        let provHeldAtBranch=0,provHeldAtHeadOffice=0,interestSuspense=0,provReqToBeHeldByRegAuth=0;
        elm.totalProvisions=0,elm.shortfall=0;
        if(elm.provHeldAtBranch){
          provHeldAtBranch=parseFloat(elm.provHeldAtBranch);
        }
        if(elm.provHeldAtHeadOffice){
          provHeldAtHeadOffice=parseFloat(elm.provHeldAtHeadOffice);
        }
        if(elm.provReqToBeHeldByRegAuth){
          provReqToBeHeldByRegAuth=parseFloat(elm.provReqToBeHeldByRegAuth);
        }
        if (elm.provHeldAtBranch || elm.provHeldAtHeadOffice || elm.provReqToBeHeldByRegAuth) {
          elm.totalProvisions = provHeldAtBranch + provHeldAtHeadOffice;
          elm.totalProvisions=parseFloat(elm.totalProvisions).toFixed(2);
          elm.shortfall=provReqToBeHeldByRegAuth-parseFloat(elm.totalProvisions);
          elm.shortfall=parseFloat(elm.shortfall).toFixed(2);
        }
      })
    }
    
  }

  add() {
    this.isSubmitted=false;
    this.insertRow();
  }

  submit(itm) {
    let val=this.countryForm.value
    let countryName=val.countryName;
    let quarterEndingDate=this.selectedQuarter;
    
    if(!countryName){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "country Name is required",
      });
      return;
   
    }
    if(!quarterEndingDate){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Quarter Ending Date is required",
      });
      return;
    }
    if(!this.selectedSection){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Select Screen",
      });
      return;
    }

    let payload=[];
    if(this.selectedSection=='Part-A'){
      this.display.forEach(elm => {
        elm.quarterEndingDate=this.selectedQuarter;
        elm.countryName=this.countryForm.value.countryName;
      });
       payload=this.display;
      if(this.isRes){
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            this.httpService.updateData(payload, PATH.PCI_BORROWER_SUBMIT).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.isSubmitted=true;
            },
            (err) => {
            
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
            })
           
          }
        })
      }
      else{
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            this.httpService.postData(payload, PATH.PCI_BORROWER_SUBMIT).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.isSubmitted=true;
              this.getRecords();
            })
          }
        })
      }
    }

    if(this.selectedSection=='Part-B'){
      this.issuerData.forEach(elm => {
        elm.quarterEndingDate=this.selectedQuarter;
        elm.countryName=this.countryForm.value.countryName
      });
       payload=this.issuerData;
      if(this.isRes){
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            this.httpService.updateData(payload, PATH.PCI_ISSUER_SUBMIT).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.isSubmitted=true;
            },
            (err) => {
            
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
            })
           
          }
        })
      }
      else{
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            this.httpService.postData(payload, PATH.PCI_ISSUER_SUBMIT).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.isSubmitted=true;
              this.getRecords();
            })
          }
        })
      }
    }
   
   
  }

  insertRow() {
 
    this.pushNewRowData();
  }

  delete(val: number,data): void {
    
    let payload={
      'countryName':'','id':'','quarterEndingDate':''

    }
    console.log(data);
    console.log(this.display);
    payload.countryName=this.countryForm.value.countryName;
    payload.quarterEndingDate=this.selectedQuarter;
    payload.id=data.id;
    if(this.selectedSection=='Part-A'){
      if(this.display[val]['newRecord']==true){
        this.display.splice(val, 1);
      }
    
      else{
        this.confirmationService.confirm({
          message: "Are you sure that you want to delete?",
          accept: () => {
            this.httpService.deleteWithData(payload,PATH.PCI_BORROWER_DELETE).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "delete Successfully",
              });
              // const index: number = this.display.indexOf(val);
              this.display.splice(val, 1);
            })
          }
        })
      }
    }
    if(this.selectedSection=='Part-B'){
      if(this.issuerData[val]['newRecord']==true){
        this.issuerData.splice(val, 1);
      }
    
      else{
        this.confirmationService.confirm({
          message: "Are you sure that you want to delete?",
          accept: () => {
            this.httpService.deleteWithData(payload,PATH.PCI_ISSUER_DELETE).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "delete Successfully",
              });
              // const index: number = this.display.indexOf(val);
              this.issuerData.splice(val, 1);
            })
          }
        })
      }
    }
    

  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
    }
  pushNewRowData() {
    if(this.selectedSection=='Part-A'){
      var date = new Date();
      this.display.push({
        newRecord: true,
        edit: false,
        status: 'SUBMITTED',
        // id: '',
        createdBy: this.user,
        createdOn: date,
      });
    }
    if(this.selectedSection=='Part-B'){
      var date = new Date();
      this.issuerData.push({
        newRecord: true,
        edit: false,
        status: 'SUBMITTED',
        // id: '',
        createdBy: this.user,
        createdOn: date,
      });
    }
   
}

  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
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



  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }
  
  numberOnlyWithDismal(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
    var t = event.target.value;
    event.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 2)) : t;
  }



}