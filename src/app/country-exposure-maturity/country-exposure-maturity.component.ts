import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleAuthGuardService } from '../role-auth-guard.service';
import { emit } from 'process';

@Component({
  selector: 'app-country-exposure-maturity',
  templateUrl: './country-exposure-maturity.component.html',
  styleUrls: ['./country-exposure-maturity.component.scss']
})
export class CountryExposureMaturityComponent implements OnInit  {
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
  countryForm: FormGroup;
  countryDropDown;
  countryCode;
  countryRes;
  exposureCountryCode;
  countryClassification;
  branchName;
  isRes:any;
  isSubmitted:boolean=false;
  isNewRecord:boolean=false;
  dropdown:any={}; 
  quarterEndingDate;
  isView:boolean = false;
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
    this.roleAuthGuard.canActivate();
    this.getUser();
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_COUNTRY_EXPOSURE_MATURITY) {
      this.isMaker = true
    }

    if (this.role.ROLE_NOSTRO_ACCOUNTS_CHECKER) {
      this.isChecker = true
    }
    this.heading = "Country Exposure & Maturity";
    this.prepareTable();
    this.prepareCountryForm();
    this.getCountry();
    this.getCemDropdowns('Exposure Country Code');
    this.getCemDropdowns('Country Classification');
  }

  prepareTable(){
    this.tableNames = [
      {
        title: "exposureCountryCode",
        name: "Exposure Country Code",
        inpType: "text",
        editable: true
      },
      {
        title: "countryClassification",
        name: "Country Classification",
        inpType: "text",
        editable: true
      },
      {
        title: "dueWithin6Months",
        name: "Due Within 6 Months",
        inpType: "number",
        editable: true
      },
      {
        title: "between6MonthsTo1Year",
        name: "Between 6 Months to 1 Year",
        inpType: "number",
        editable: true
      },
      {
        title: "between1YearAnd5Years",
        name: "Between 1 Year and 5 Years",
        inpType: "number",
        editable: true
      },
      {
        title: "dueAfter5Years",
        name: "Due after 5 Years",
        inpType: "number",
        editable: true
      },
      {
        title: "total",
        name: "Total",
        inpType: "number",
        editable: false
      },
      // {
      //   title: "createdBy",
      //   name: "Created By",
      //   subText: "",
      //   inpType: "text",
      //   editable: false,        
      // },
      // {
      //   title: "createdOn",
      //   name: "Created On",
      //   subText: "",
      //   inpType: "text",
      //   editable: false,
      // }
    ];
  }

  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "countryName": ['', Validators.required],
      "branchName": [''],
      "quarterEndingDate": ['', Validators.required],
      "financialYear":['',Validators.required]
    })
  }
  

  getRecords(itm) {
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
    if(this.countryForm.valid){
      this.httpService.getData(PATH.CEM_GET + "?countryName="+countryName+"&quarterEndingDate="+this.selectedQuarter).subscribe((res) => {
        console.log(res);
       if(res.length>0){
         this.display=res;
         this.isRes=true;
         this.isView=true;
       }
       else{
         this.prepareTable();
         this.display=[];
         this.isView=true;
       }
       
       });
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
      console.log(this.countryDropDown);
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
      // this.dropdown.years = [{label:"2024-2025",value:"2024-2025"},{label:"2023-2024",value:"2023-2024"},{label:"2022-2023",value:"2022-2023"},{label:"2021-2022",value:"2021-2022"},
      //                     {label:"2020-2021",value:"2020-2021"},{label:"2019-2020",value:"2019-2020"},{label:"2018-2019",value:"2018-2019"}]
      });
  }

  getCemDropdowns(itm){
    this.httpService.getData(PATH.CEM_DROPDOWNS+itm).subscribe((res) => {
      console.log(res);
      if(itm=='Exposure Country Code')
      {
        this.exposureCountryCode=res;
      }
      if(itm=='Country Classification')
      {
        this.countryClassification=res;
      }
     });
  }

  totaladdition(itm, name) {

    this.display.forEach(elm => {
      elm.total=0;
      let dueWithin6Months=0,between6MonthsTo1Year=0,between1YearAnd5Years=0,dueAfter5Years=0;
      if(elm.dueWithin6Months){
        dueWithin6Months=parseFloat(elm.dueWithin6Months);
      }
      if(elm.between6MonthsTo1Year){
        between6MonthsTo1Year=parseFloat(elm.between6MonthsTo1Year);
      }
      if(elm.between1YearAnd5Years ){
        between1YearAnd5Years=parseFloat(elm.between1YearAnd5Years);
      }
      if(elm.dueAfter5Years){
        dueAfter5Years=parseFloat(elm.dueAfter5Years);
      }
      if (elm.dueWithin6Months || elm.between6MonthsTo1Year || elm.between1YearAnd5Years ||  elm.dueAfter5Years) {
        elm.total = dueWithin6Months + between6MonthsTo1Year+between1YearAnd5Years+dueAfter5Years;
        elm.total=parseFloat(elm.total).toFixed(2);
      }
    })
    
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
  
    let payload=[];
    for (var i = 0; i < this.display.length; i++) {
      var currentRow = this.display[i];
      if(!currentRow.exposureCountryCode || currentRow.exposureCountryCode==undefined){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Country Code is required",
        });
        return;
      }
      if(!currentRow.countryClassification || currentRow.countryClassification==undefined){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Country Classification is required",
        });
        return;
      }
      //  console.log(currentRow.periodFrom.toString().split(","))
    
    }
    this.display.forEach(elm => {
      elm.quarterEndingDate=this.selectedQuarter;
      elm.countryName=this.countryForm.value.countryName;
      
    });
     payload=this.display;
     console.log(payload);
    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          this.httpService.updateData(payload, PATH.CEM_SUBMIT).subscribe((res) => {
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
          this.httpService.postData(payload, PATH.CEM_SUBMIT).subscribe((res) => {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.isSubmitted=true;
          })
        }
      })
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
    
    let payload={
      'countryClassification':'','countryName':'','exposureCountryCode':'','quarterEndingDate':''

    }
    console.log(this.display);
    payload.countryClassification=this.display[val]['countryClassification'];
    payload.countryName=this.countryForm.value.countryName;
    payload.exposureCountryCode=this.display[val]['exposureCountryCode'];
    payload.quarterEndingDate=this.selectedQuarter;
    console.log(payload);
    if(this.display[val]['newRecord']==true){
      // const index: number = this.display.indexOf(val);
      this.display.splice(val, 1);
    }
    else{
      this.confirmationService.confirm({
        message: "Are you sure that you want to delete?",
        accept: () => {
          this.httpService.deleteWithData(payload,PATH.CEM_DELETE).subscribe((res) => {
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
      // id: '',
      createdBy: this.user,
      createdOn: date,
    });

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
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
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
