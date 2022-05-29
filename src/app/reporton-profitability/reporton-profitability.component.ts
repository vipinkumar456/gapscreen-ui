import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from "../services/http.service";
import { ActivatedRoute,Router } from '@angular/router';
import { PATH } from "../app.constants";
import { ignoreElements } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: 'app-reporton-profitability',
  templateUrl: './reporton-profitability.component.html',
  styleUrls: ['./reporton-profitability.component.scss']
})
export class ReportonProfitabilityComponent implements OnInit {

  countryForm: FormGroup;
  reportData:any=[];
  tableNames: Array<any> = [];
  cols: any[];
  tableheadingNames: any[];
  user: any;
  heading: any;
  date = new Date();
  isMaker: boolean = false;
  isChecker: boolean = false;
  isView:boolean = false;
  uri: string = "";
  countryDropDown;
  branchName;
  roles: Array<any> = [];
  role: any = {};
  quarterEndingDate : any;
  isRes:any;
  isSubmitted:boolean=false;
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
    this.roleAuthGuard.canActivate();
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
    if (this.role.ROLE_NOSTRO_ACCOUNTS_MAKER) {
      this.isMaker = true
    }
    if (this.role.ROLE_NOSTRO_ACCOUNTS_CHECKER) {
      this.isChecker = true
   }
   this.heading="Report On Profitability"
    this.getUser();
    this.table();
    this.prepareCountryForm();
    this.getCountry();
  }
  
  table(){
    this.tableNames = [
      { title: "reportOnProfitability", name: "Report On Profitability", inpType:"number", editable: false ,width:'800px'},
      { title: "currentQuarter", name: "Current Quarter", inpType: "number", editable: true,width:'500px'},
      { title: "cumulativePosition",name: "Cumulative Position",inpType: "number", editable: true,width:'500px'},
   ];
   
    this.tableheadingNames = [
    { title: "AmountInUSMillion", name: "(Amount in US $ million)", inpType:"number", editable: false },
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
  preparereportData()
  {
    this.reportData=[
      {
        reportOnProfitability:"On  Balances  With  Monetary Authority,  Inter  Branch/Bank  deposits  and  credits",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Loans  and  Advances  (non-bank) ",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Government  Securities",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Other  Investments",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Other  interest  Bearing Assets",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Customer  Deposits",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"On  Inter  Branch/  Bank  Borrowings",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"All  Other",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Fee  Income",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Profit/loss  On  Forex  Trading",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Profit/loss  On  Securities  Trading",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Miscellaneous  Income",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Staff  Expense",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Other  Expenses",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Bad  debts  written  off",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Extra  Ordinary loss(  Other  write  off)",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"H.O.administration  charges",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Provisions  (other  than  tax)",createdBy:this.user,createdDate:this.date
      },
      // {
      //   reportOnProfitability:"profit/loss  before  tax(9-10-11-12-13)",createdBy:this.user,createdDate:this.date
      // },
      {
        reportOnProfitability:"Provision  for  tax",createdBy:this.user,createdDate:this.date
      },
      // {
      //   reportOnProfitability:"Net  profit  /  Net  loss",createdBy:this.user,createdDate:this.date
      // },
      {
        reportOnProfitability:"Remittance  to  H.O.  expenses",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Remittance  to  H.O.  profit",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Remittance to H.O. others",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Business  per  Employee",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Profit  per  Employee",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Average  Yield  on  Interest  Earning Assets",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Average  Cost  of  Funds",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Return  on  Assets",createdBy:this.user,createdDate:this.date
      },
      {
        reportOnProfitability:"Interest  Spread",createdBy:this.user,createdDate:this.date
      }
    ]
  }
  
  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      this.preparereportData();
      });
      
    }

    getCountry(){
      this.httpService.getData(PATH.GET_COUNTRY).subscribe((res) => {
        console.log(res);
        let country=res;
        this.countryDropDown=country.map(elm =>{return {label:elm.countryName,value:elm.countryName}});
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
        // this.dropdown.years = [{label:"2024-2025",value:"2024-2025"},{label:"2023-2024",value:"2023-2024"},{label:"2022-2023",value:"2022-2023"},{label:"2021-2022",value:"2021-2022"},
        //                     {label:"2020-2021",value:"2020-2021"},{label:"2019-2020",value:"2019-2020"},{label:"2018-2019",value:"2018-2019"}]
      });
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
        this.httpService.getData(PATH.ROP_GET + "?countryName="+countryName+"&quarterEndingDate="+this.selectedQuarter).subscribe((res) => {
          console.log(res);
         if(res.length>0){
           this.reportData=res;
           this.isRes=true;
           this.isView=true;
         }
         else{
           this.preparereportData();
           this.isView=true;
         }
         
         });
      }
    }

    getRoles() {
      this.roles.map((o) => {
        this.role[o.role] = true;
      });
    }

    totaladdition(itm,name,tableName)
    {       
            
    }

    submit(itm) {
      let val=this.countryForm.value
      let countryName=val.countryName;
      let quarterEndingDate=this.selectedQuarter
 
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
      let payload={
        reportData:''
      };
      this.reportData.forEach(elm => {
        elm.quarterEndingDate=this.selectedQuarter;
        elm.countryName=this.countryForm.value.countryName;
        // elm.financialYear=this.countryForm.value.financialYear;
      });
       payload=this.reportData;
       console.log(payload);
      if(this.isRes){
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            this.httpService.updateData(payload, PATH.ROP_SUBMIT).subscribe((res) => {
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
            this.httpService.postData(payload, PATH.ROP_SUBMIT).subscribe((res) => {
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