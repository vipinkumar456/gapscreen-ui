import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ThousandPipe } from '../services/number.pipe';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-alo',
  templateUrl: './alo.component.html',
  styleUrls: ['./alo.component.scss']
})
export class ALOComponent implements OnInit {


  @Input() generalinfo:any;
  @Output() gotoreportgeneralInfo =new EventEmitter();
  reportData:any=[];
  assetsData:any=[];
  liabilityData:any=[];
  annexure1Data:any=[];
  annexure2Data:any=[];
  annexure2Data2:any=[];
  annexure2Data3:any=[];
  productsData:any=[];
  assetsTable: any[];
  liabilityTable: any[];
  annexure1Table: any[];
  annexure2Table1: any[];
  annexure2Table2: any[];
  annexure2Table3: any[];
  productsTable: any[];
  annexure1SubTable:any[];
  annexure1MainTable:any[];
  Data:any=[];
  tableNames: Array<any> = [];
  cols: any[];
  user: any;
  heading: any;
  date = new Date();
  isMaker: boolean = false;
  isChecker: boolean = false;
  isView:boolean = false;
  uri: string = "";
  countryForm: FormGroup;
  countryDropDown;
  countryCode;
  countryRes;
  branchName;
  quarterEndingDate;
  screenName;
  isAssets:boolean=false;
  isLiability:boolean=false;
  isannexure1:boolean=false;
  isannexure2:boolean=false;
  isProducts:boolean=false;
  isRes:any;
  isSubmitted:boolean=false;
  isNewRecord:boolean=false;
  payloadData:any;
  selectedScreen:any;
  dropdown:any={}; 
  dropdownYears:any=[];
  selectedQuarter:any;
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
    this.heading="ALO"
    this.roleAuthGuard.canActivate();
    this.getUser();
    this.assetsCol();
    this.liabilityCol();
    this.annexure1Col();
    this.annexure2Col();
    this.productsCol();
    this.prepareCountryForm();
    this.prepareannexure1Data();
    this.getCountry();
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
      this.screenName = [{label:"Assets", value:"Assets"},{label:"Liability",value:"Liability"},{label:"Other Products",value:"Other Products"} ,{label:"Annexure I",value:"Annexure I"},{label:"Annexure II",value:"Annexure II"}  ]
    });
  }    
  
  
  assetsCol(){
    this.assetsTable = [
    { title: "itemDescription", name: "Assets", inpType:"number", editable: false ,width:'900px'},
    { title: "oneToTwentyEightDays", name: "1-28 Days", inpType: "number", editable: true,width:'300px'},
    { title: "twentyNineDaysAndUpToThreeMonths",name: "29 Days and upto 3 months",inpType: "number", editable: true,width:'300px'},
    { title: "overThreeMonthsAndUpToSixMonths",name: "Over 3 months and upto 6 months",inpType: "number",editable: true,width:'300px'},
    { title: "overSixMonthsAndUpToOneYear",name: "Over 6 months and upto 1 year",inpType: "number",editable: true,width:'300px'},
    { title: "overOneYearAndUpToThreeYears", name: "Over 1 year and upto 3 years",inpType: "number", editable: true,width:'300px'},
    { title: "overThreeYearsAndUpToFiveYears",name: "Over 3 year and upto 5 years",inpType: "number",editable: true,width:'300px'},
    { title: "overFiveYears",name: "Over  5 years",inpType: "number",editable: true,width:'300px'},
    { title: "nonSensitive",name: "Non-Senitive",inpType: "number",editable: true,width:'300px'},
    { title: "total", name: "Total",inpType: "number", editable: false,width:'300px'},
  ];
  }
  liabilityCol(){
    this.liabilityTable = [
      { title:"itemDescription", name: "Liability", inpType:"number", editable: false ,width:'900px'},
      { title: "oneToTwentyEightDays", name: "1-28 Days", inpType: "number", editable: true,width:'300px'},
      { title: "twentyNineDaysAndUpToThreeMonths",name: "29 Days and upto 3 months",inpType: "number", editable: true,width:'300px'},
      { title: "overThreeMonthsAndUpToSixMonths",name: "Over 3 months and upto 6 months",inpType: "number",editable: true,width:'300px'},
      { title: "overSixMonthsAndUpToOneYear",name: "Over 6 months and upto 1 year",inpType: "number",editable: true,width:'300px'},
      { title: "overOneYearAndUpToThreeYears", name: "Over 1 year and upto 3 years",inpType: "number", editable: true,width:'300px'},
      { title: "overThreeYearsAndUpToFiveYears",name: "Over 3 year and upto 5 years",inpType: "number",editable: true,width:'300px'},
      { title: "overFiveYears",name: "Over 5 years",inpType: "number",editable: true,width:'300px'},
      { title: "nonSensitive",name: "Non-Senitive",inpType: "number",editable: true,width:'300px'},
      { title: "total", name: "Total",inpType: "number", editable: false,width:'300px'},
  ];
  }

  productsCol(){
    this.productsTable = [
      { title:"itemDescription", name: "Other Products", inpType:"number", editable: false ,width:'900px'},
      { title: "oneToTwentyEightDays", name: "1-28 Days", inpType: "number", editable: true,width:'300px'},
      { title: "twentyNineDaysAndUpToThreeMonths",name: "29 Days and upto 3 months",inpType: "number", editable: true,width:'300px'},
      { title: "overThreeMonthsAndUpToSixMonths",name: "Over 3 months and upto 6 months",inpType: "number",editable: true,width:'300px'},
      { title: "overSixMonthsAndUpToOneYear",name: "Over 6 months and upto 1 year",inpType: "number",editable: true,width:'300px'},
      { title: "overOneYearAndUpToThreeYears", name: "Over 1 year and upto 3 years",inpType: "number", editable: true,width:'300px'},
      { title: "overThreeYearsAndUpToFiveYears",name: "Over 3 year and upto 5 years",inpType: "number",editable: true,width:'300px'},
      { title: "overFiveYears",name: "Over 5 years",inpType: "number",editable: true,width:'300px'},
      { title: "nonSensitive",name: "Non-Senitive",inpType: "number",editable: true,width:'300px'},
      { title: "total", name: "Total",inpType: "number", editable: false,width:'300px'},
  ];
  }

  annexure1Col(){
        this.annexure1Table = [
          { title:"itemDescription", name: "Annexure", inpType:"number", editable: false ,width:'900px'},
      ];
      this.annexure1SubTable = [
        { title:"itemDescription", name: "Details of Off-Balance Sheet Exposures", inpType:"number", editable: false ,width:'900px'},
    ];
    this.annexure1MainTable = [
      { title:"itemDescription", name: "", inpType:"number", editable: false ,width:'900px'},
      { title:"annexureOne", name: "", inpType:"number", editable: true ,width:'900px'},
    ];
  }

  annexure2Col(){
    this.annexure2Table1 = [
      { title:"itemDescription", name: "Annexure 2", inpType:"number", editable: false},
      { title: "debitNo", name: "Debit No", inpType: "number", editable: true,},
      { title: "debitAmount",name: "Debit Amount",inpType: "number", editable: true,},
      { title: "creditNo",name: "Credit No",inpType: "number",editable: true},
      { title: "creditAmount",name: "Credit Amount",inpType: "number",editable: true}
  ];
  this.annexure2Table2 = [
    { title:"itemDescription", name: "Annexure 2", inpType:"number", editable: false},
    { title: "debitNo", name: "Debit No", inpType: "number", editable: true},
    { title: "debitAmount",name: "Debit Amount",inpType: "number", editable: true},
    { title: "creditNo",name: "Credit No",inpType: "number",editable: true},
    { title: "creditAmount",name: "Credit Amount",inpType: "number",editable: true}
  ];
  this.annexure2Table3 = [
    { title:"itemDescription", name: "Annexure 2", inpType:"number", editable: false ,width:'500px'},
    { title: "debitNo", name: "Debit No", inpType: "number", editable: true,width:'300px'},
    { title: "debitAmount",name: "Debit Amount",inpType: "number", editable: true,width:'300px'},
    { title: "creditNo",name: "Credit No",inpType: "number",editable: true,width:'300px'},
    { title: "creditAmount",name: "Credit Amount",inpType: "number",editable: true,width:'300px'}
  ];
  }
  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "countryName": ['', Validators.required],
      "branchName": [''],
      "quarterEndingDate": ['', Validators.required],
      "screenName":['',Validators.required],
      "financialYear":['',Validators.required]
    })
  }
  
 
  
  
  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      var date = new Date();
      this.date=date;
      this.prepareAssetsData();
      this.prepareliabilityData();
      this.prepareannexure1Data();
      this.prepareannexure2Data();
      this.prepareannexure2Data2();
      this.prepareannexure2Data3();
      this.prepareProducts();
      });
 }

 submit(itm) {
  let val=this.countryForm.value
  let countryName=val.countryName;
  let screenName=val.screenName;
  let quarterEndingDate=this.selectedQuarter;
  this.annexure2Data.forEach(elm => {
    elm.itemType='Accounts with other branches @'
  });
  this.annexure2Data2.forEach(elm => {
    elm.itemType='Accounts with other Indian bank branches in same foreign center'
  });
  this.annexure2Data3.forEach(elm => {
    elm.itemType='Accounts with other banks'
  });
  if(this.selectedScreen=='Assets'){  this.payloadData=this.assetsData;}
  if(this.selectedScreen=='Liability'){this.payloadData=this.liabilityData}
  if(this.selectedScreen=='Annexure I'){this.payloadData=this.annexure1Data;}
  if(this.selectedScreen=='Annexure II'){this.payloadData=(this.annexure2Data.concat(this.annexure2Data2)).concat(this.annexure2Data3);}
  if(this.selectedScreen=='Other Products'){ this.payloadData=this.productsData;}
  if(!countryName){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Branch Name is required",
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
  if(!screenName){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Screen Name is required",
    });
    return;
  }

  let payload=[];
  this.payloadData.forEach(elm => {
    elm.quarterEndingDate=this.selectedQuarter;
    elm.countryName=this.countryForm.value.countryName
    elm.screenName=this.selectedScreen;
  });
   payload=this.payloadData;
   console.log(payload);
  if(this.isRes && this.selectedScreen!='Annexure II'){
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        this.httpService.updateData(payload, PATH.ALO_SUBMIT).subscribe((res) => {
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
  if(!this.isRes && this.selectedScreen!='Annexure II'){
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        this.httpService.postData(payload, PATH.ALO_SUBMIT).subscribe((res) => {
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
        }
        )
      }
    })
  }

  // annexure2 SUBMIT
  if(this.isRes && this.selectedScreen=='Annexure II'){
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        this.httpService.updateData(payload, PATH.ANNEXURE_SUBMIT).subscribe((res) => {
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
  if(!this.isRes && this.selectedScreen=='Annexure II'){
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        this.httpService.postData(payload, PATH.ANNEXURE_SUBMIT).subscribe((res) => {
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
        }
        )
      }
    })
  }

 
}

  totaladdition()
  {       
     if(this.isAssets){
      this.assetsData.forEach(elm => {
        elm.total=0;
        let oneToTwentyEightDays=0,twentyNineDaysAndUpToThreeMonths=0,overThreeMonthsAndUpToSixMonths=0,overSixMonthsAndUpToOneYear=0,
            overOneYearAndUpToThreeYears=0,overThreeYearsAndUpToFiveYears=0,overFiveYears=0,nonSensitive=0;;
        if(elm.oneToTwentyEightDays){
          oneToTwentyEightDays=parseFloat(elm.oneToTwentyEightDays);
        }
        if(elm.twentyNineDaysAndUpToThreeMonths){
          twentyNineDaysAndUpToThreeMonths=parseFloat(elm.twentyNineDaysAndUpToThreeMonths);
        }
        if(elm.overThreeMonthsAndUpToSixMonths ){
          overThreeMonthsAndUpToSixMonths=parseFloat(elm.overThreeMonthsAndUpToSixMonths);
        }
        if(elm.overSixMonthsAndUpToOneYear){
          overSixMonthsAndUpToOneYear=parseFloat(elm.overSixMonthsAndUpToOneYear);
        }
        if(elm.overOneYearAndUpToThreeYears){
          overOneYearAndUpToThreeYears=parseFloat(elm.overOneYearAndUpToThreeYears);
        }
        if(elm.overThreeYearsAndUpToFiveYears){
          overThreeYearsAndUpToFiveYears=parseFloat(elm.overThreeYearsAndUpToFiveYears);
        }
        if(elm.overFiveYears ){
          overFiveYears=parseFloat(elm.overFiveYears);
        }
        if(elm.nonSensitive){
          nonSensitive=parseFloat(elm.nonSensitive);
        }
        if (elm.oneToTwentyEightDays || elm.twentyNineDaysAndUpToThreeMonths || elm.overThreeMonthsAndUpToSixMonths ||  elm.overSixMonthsAndUpToOneYear || elm.overOneYearAndUpToThreeYears || elm.overThreeYearsAndUpToFiveYears || elm.overFiveYears || elm.nonSensitive) {
          elm.total = oneToTwentyEightDays + twentyNineDaysAndUpToThreeMonths+overThreeMonthsAndUpToSixMonths+overSixMonthsAndUpToOneYear+overOneYearAndUpToThreeYears+overThreeYearsAndUpToFiveYears+overFiveYears+nonSensitive;
          elm.total=parseFloat(elm.total).toFixed(2);
        }
      })
     }
     if(this.isLiability){
      this.liabilityData.forEach(elm => {
        elm.total=0;
        let oneToTwentyEightDays=0,twentyNineDaysAndUpToThreeMonths=0,overThreeMonthsAndUpToSixMonths=0,overSixMonthsAndUpToOneYear=0,
            overOneYearAndUpToThreeYears=0,overThreeYearsAndUpToFiveYears=0,overFiveYears=0,nonSensitive=0;;
        if(elm.oneToTwentyEightDays){
          oneToTwentyEightDays=parseFloat(elm.oneToTwentyEightDays);
        }
        if(elm.twentyNineDaysAndUpToThreeMonths){
          twentyNineDaysAndUpToThreeMonths=parseFloat(elm.twentyNineDaysAndUpToThreeMonths);
        }
        if(elm.overThreeMonthsAndUpToSixMonths ){
          overThreeMonthsAndUpToSixMonths=parseFloat(elm.overThreeMonthsAndUpToSixMonths);
        }
        if(elm.overSixMonthsAndUpToOneYear){
          overSixMonthsAndUpToOneYear=parseFloat(elm.overSixMonthsAndUpToOneYear);
        }
        if(elm.overOneYearAndUpToThreeYears){
          overOneYearAndUpToThreeYears=parseFloat(elm.overOneYearAndUpToThreeYears);
        }
        if(elm.overThreeYearsAndUpToFiveYears){
          overThreeYearsAndUpToFiveYears=parseFloat(elm.overThreeYearsAndUpToFiveYears);
        }
        if(elm.overFiveYears ){
          overFiveYears=parseFloat(elm.overFiveYears);
        }
        if(elm.nonSensitive){
          nonSensitive=parseFloat(elm.nonSensitive);
        }
        if (elm.oneToTwentyEightDays || elm.twentyNineDaysAndUpToThreeMonths || elm.overThreeMonthsAndUpToSixMonths ||  elm.overSixMonthsAndUpToOneYear || elm.overOneYearAndUpToThreeYears || elm.overThreeYearsAndUpToFiveYears || elm.overFiveYears || elm.nonSensitive) {
          elm.total = oneToTwentyEightDays + twentyNineDaysAndUpToThreeMonths+overThreeMonthsAndUpToSixMonths+overSixMonthsAndUpToOneYear+overOneYearAndUpToThreeYears+overThreeYearsAndUpToFiveYears+overFiveYears+nonSensitive;
          elm.total=parseFloat(elm.total).toFixed(2);
        }
      })
     }
     if(this.isProducts){
      this.productsData.forEach(elm => {
        elm.total=0;
        let oneToTwentyEightDays=0,twentyNineDaysAndUpToThreeMonths=0,overThreeMonthsAndUpToSixMonths=0,overSixMonthsAndUpToOneYear=0,
            overOneYearAndUpToThreeYears=0,overThreeYearsAndUpToFiveYears=0,overFiveYears=0,nonSensitive=0;;
        if(elm.oneToTwentyEightDays){
          oneToTwentyEightDays=parseFloat(elm.oneToTwentyEightDays);
        }
        if(elm.twentyNineDaysAndUpToThreeMonths){
          twentyNineDaysAndUpToThreeMonths=parseFloat(elm.twentyNineDaysAndUpToThreeMonths);
        }
        if(elm.overThreeMonthsAndUpToSixMonths ){
          overThreeMonthsAndUpToSixMonths=parseFloat(elm.overThreeMonthsAndUpToSixMonths);
        }
        if(elm.overSixMonthsAndUpToOneYear){
          overSixMonthsAndUpToOneYear=parseFloat(elm.overSixMonthsAndUpToOneYear);
        }
        if(elm.overOneYearAndUpToThreeYears){
          overOneYearAndUpToThreeYears=parseFloat(elm.overOneYearAndUpToThreeYears);
        }
        if(elm.overThreeYearsAndUpToFiveYears){
          overThreeYearsAndUpToFiveYears=parseFloat(elm.overThreeYearsAndUpToFiveYears);
        }
        if(elm.overFiveYears ){
          overFiveYears=parseFloat(elm.overFiveYears);
        }
        if(elm.nonSensitive){
          nonSensitive=parseFloat(elm.nonSensitive);
        }
        if (elm.oneToTwentyEightDays || elm.twentyNineDaysAndUpToThreeMonths || elm.overThreeMonthsAndUpToSixMonths ||  elm.overSixMonthsAndUpToOneYear || elm.overOneYearAndUpToThreeYears || elm.overThreeYearsAndUpToFiveYears || elm.overFiveYears || elm.nonSensitive) {
          elm.total = oneToTwentyEightDays + twentyNineDaysAndUpToThreeMonths+overThreeMonthsAndUpToSixMonths+overSixMonthsAndUpToOneYear+overOneYearAndUpToThreeYears+overThreeYearsAndUpToFiveYears+overFiveYears+nonSensitive;
          elm.total=parseFloat(elm.total).toFixed(2);
        }
      })
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

  prepareAssetsData()
  {
    this.assetsData=[
      {
        itemDescription:"1.Cash on hand and balances with central banks/Monetary Authority",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"2.1. Local government",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"2.2. India Related",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"2.3. OECD Countries",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"2.4. Others",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"3.1. with branches in the same foreign centre",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"3.2. with branches in other foreign centres",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"3.3. with india branches",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"4.1.In Current Account",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"4.2.Other deposits",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.1. Loans against Deposits/Securities Held in India",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.2. Loans against LC/LOC by H.O.",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.3.1. Short term Facilities",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.3.2. BA facilities ",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.3.3. Syndicated Loans",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.3.4. Others",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.4. Other India related funded exposure",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.5.1. Loans to Problem Countries",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.5.2. Other Sovereign Loans",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.6. Real Estate Exposures",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.7. Commercial loans",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.1.8. Other loans",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"5.2. Bills Purchased and Discounted",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"6.1. Specific Provisions",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"6.2. Interest Suspense",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"8. Accumulated Losses",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"9. Other Assets",createdBy:this.user,createdDate:this.date
      }
    ]
  }
  prepareliabilityData()
  {
    this.liabilityData=[
      {
        itemDescription:"10.1. Assigned Capital",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"10.2. Support funds",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"10.3. Retained earnings",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"10.4. Others",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"11.1. In Current Account",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"11.2. Other deposits",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"12.1. with branches in the same foreign centre",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"12.2. with branches in other foreign centres",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"12.3. with India branches",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"13.1. In Current Account",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"13.2. Other deposits",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"14. Other debt instruments ",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"15.1. General Provisions",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"15.2. Others",createdBy:this.user,createdDate:this.date
      },
    ]
  }
  prepareannexure1Data()
  {
    this.annexure1Data=[
      {
        itemDescription:"16.1. Issued on client a/c",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"16.2.Issued on banks' a/c",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"17. Payment Guarantees / acceptances",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"18. Performance guarantees issued",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"19. Loan commitments",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"20. Outstanding FOREX Contracts",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"21. Outstanding int. rate swaps",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"22. Forward Rate Agreements",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"23. Other future and forward contracts",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"24. Currency options bought",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"25. Currency Options written",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"Others",createdBy:this.user,createdDate:this.date
      },
    ]
  }
  prepareannexure2Data()
  {
    this.annexure2Data=[
      {
        itemDescription:"(i) Over 3 months and upto 6 months",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"(ii) Over 6 months and upto 12 months",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"(iii) Over 1 year and upto 2 years",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"(iv) Over 2 years",createdBy:this.user,createdDate:this.date
      }
    ]
  }  
  prepareannexure2Data2(){
      this.annexure2Data2=[
        {
          itemDescription:"(i) Over 3 months and upto 6 months",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(ii) Over 6 months and upto 12 months",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(iii) Over 1 year and upto 2 years",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(iv) Over 2 years",createdBy:this.user,createdDate:this.date
        }
      ]
    } 
    prepareannexure2Data3(){
      this.annexure2Data3=[
        {
          itemDescription:"(i) Over 3 months and upto 6 months",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(ii) Over 6 months and upto 12 months",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(iii) Over 1 year and upto 2 years",createdBy:this.user,createdDate:this.date
        },
        {
          itemDescription:"(iv) Over 2 years",createdBy:this.user,createdDate:this.date
        }
      ]
    } 

  prepareProducts()
  {
    this.productsData=[
      {
        itemDescription:"i. FRAs",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"ii. Swaps",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"iii. Futures",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"iv. Options",createdBy:this.user,createdDate:this.date
      },
      {
        itemDescription:"v. Others",createdBy:this.user,createdDate:this.date
      },
      
    ]
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
    let screenName=this.selectedScreen;
    this.assetsData=[];this.liabilityData=[];this.productsData=[];this.annexure1Data=[];this.annexure2Data=[];this.annexure2Data2=[];this.annexure2Data3=[]
    if(this.countryForm.valid){
        if(this.selectedScreen!='Annexure II'){
        this.httpService.getData(PATH.ALO_GET + "?countryName="+countryName+"&quarterEndingDate="+this.selectedQuarter+"&screenName="+this.selectedScreen).subscribe((res) => {
          console.log(res);
        if(res.length>0){
          if(this.selectedScreen=='Assets'){
            this.assetsData=res;
            }
          if(this.selectedScreen=='Liability'){
            this.liabilityData=res;
            }
          if(this.selectedScreen=='Other Products'){
            this.productsData=res
            }
          if(this.selectedScreen=='Annexure I'){
            this.annexure1Data=res
            }
          this.isRes=true;
          this.isView=true;
          this.viewScreen()
        }
        else{
          if(this.selectedScreen=='Assets'){this.prepareAssetsData()}
          if(this.selectedScreen=='Liability'){this.prepareliabilityData()}
          if(this.selectedScreen=='Other Products'){this.prepareProducts()}
          if(this.selectedScreen=='Annexure I'){this.prepareannexure1Data()}
          this.isView=true;
          this.isRes=false;
          this.viewScreen()
        }
        });
        }

      //  Annexure2 get
      if(this.selectedScreen=='Annexure II'){ 
        this.isRes=false;
        this.httpService.getData(PATH.ANNEXURE_GET + "?countryName="+countryName+"&itemType="+'Accounts with other branches @'+"&quarterEndingDate="+this.selectedQuarter+"&screenName="+this.selectedScreen).subscribe((res) => {
          if(res.length>0){
            if(this.selectedScreen=='Annexure II'){
              this.annexure2Data=res;
              this.isRes=true;
              }
          }
          else
          {
            this.prepareannexure2Data();
          }
        });
        this.httpService.getData(PATH.ANNEXURE_GET + "?countryName="+countryName+"&itemType="+'Accounts with other Indian bank branches in same foreign center'+"&quarterEndingDate="+this.selectedQuarter+"&screenName="+this.selectedScreen).subscribe((res) => {
            if(res.length>0){
            this.annexure2Data2=res;
            this.isRes=true;
            }
            else
            {
              this.prepareannexure2Data2();
            }
        });
        this.httpService.getData(PATH.ANNEXURE_GET + "?countryName="+countryName+"&itemType="+'Accounts with other banks'+"&quarterEndingDate="+this.selectedQuarter+"&screenName="+this.selectedScreen).subscribe((res) => {
            if(res.length>0){
                this.annexure2Data3=res;
                this.isRes=true;
                }
              else
              {
                this.prepareannexure2Data3();
              }  
          });
        this.viewScreen();
      }
    }
    this.isSubmitted=false;
  }

    viewScreen(){
      if(this.selectedScreen=='Assets'){
        this.isAssets=true;this.isLiability=false;this.isannexure1=false;this.isannexure2=false;this.isProducts=false;
        this.payloadData=this.assetsData;
      }
      if(this.selectedScreen=='Liability'){
        this.isLiability=true;this.isAssets=false;this.isannexure1=false;this.isannexure2=false;this.isProducts=false;
        this.payloadData=this.liabilityData
      }
      if(this.selectedScreen=='Annexure I'){
        this.isannexure1=true;this.isAssets=false;this.isLiability=false;this.isannexure2=false;this.isProducts=false;
        this.payloadData=this.annexure1Data;
      }
      if(this.selectedScreen=='Annexure II'){
        this.isannexure2=true;this.isannexure1=false;this.isAssets=false;this.isLiability=false;this.isProducts=false;
        this.payloadData=this.annexure2Data;
      }
      if(this.selectedScreen=='Other Products'){
        this.isProducts=true;this.isannexure2=false;this.isannexure1=false;this.isAssets=false;this.isLiability=false;
        this.payloadData=this.productsData;
      }
    }

    
  
  }