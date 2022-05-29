import { RoleAuthGuardService } from './../role-auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-penalties-related-matters',
  templateUrl: './penalties-related-matters.component.html',
  styleUrls: ['./penalties-related-matters.component.scss']
})
export class PenaltiesRelatedMattersComponent implements OnInit  {
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
  submitted: boolean = false;
  rejectedFlag: boolean = false;
  comments: any;
  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];
  countryForm: FormGroup;
  checkerForm: FormGroup;
  isView:boolean=false;
  dropdownYears:any=[];
  quarterEndingDate : any;
  selectedQuarter:any;
  isRes:any;
  id:any;
  localDelete:boolean = true;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private fb :FormBuilder,
    private roleAuthGuard:RoleAuthGuardService,
  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading = "Table E3: Warnings, Show-cause, Penalties, Sanctions etc. for AML-CFT related matters";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });

    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_CAML_E3_AMLCFT_RELATED_MATTERS_MAKER) {
      this.isMaker = true
    }

    if (this.role.ROLE_CAML_E3_AMLCFT_RELATED_MATTERS_CHECKER) {
      this.isChecker = true
      }

    this.prepareCountryForm();
    this.prepareTable();
    this.getQuarters();
  // This Form is For checker Reject Comment
    this.checkerForm = this.fb.group({
      "comment": [''],
    })
  }

  prepareCountryForm(){
    this.countryForm = this.fb.group({
      "quarterEndingDate": ['', Validators.required],
      "financialYear":['',Validators.required]
    })
  }

  getQuarters(){
    this.httpService.getData(PATH.GET_COUNTRY).subscribe((res) => {
      let year=new Date().getFullYear() 
      let today = new Date();
      let month=today.getMonth()+1;
      let currentQuarter, currentYear, prev1Year, prev2Year, nextYear;
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
    });
  }


  prepareTable(){
    this.tableNames = [
      { title: "date", name: "Date",inpType: "date",editable: true},
      { title: "penalisingAuthority", name: "Penalising Authority",inpType: "number",editable: true},
      { title: "natureOfPenalAction", name: "Nature of penal action",inpType: "number",editable: true},
      { title: "overseasRegulatorCountry", name: "Country (in case of overseas regulator)",inpType: "number",editable: true},
      { title: "supervisoryActionTaken", name: "Supervisory action taken",inpType: "number",editable: true},
      { title: "amount", name: "Amount, if any #",inpType: "number",editable: true},
      { title: "actionTakenByTheBank", name: "Brief Description of the Action taken by the bank/ Control measures introduced",inpType: "number",editable: true},
      { title: "courtProceedingsStatus", name: "Brief Description of court proceedings / prosecutions initiated against and their status",inpType: "number",editable: true},
      { title: "remarks", name: "Remarks",inpType: "number",editable: true},
    ];
    }


    getRecords(val) {
      if (this.countryForm.valid){
           this.isView = true;
            let val = this.countryForm.value;
        
          let quarterEndingDate = val.quarterEndingDate
          let quarterDateSplit = quarterEndingDate.split("-");
          if (quarterDateSplit[0] == '03') {
            if (val.financialYear && val.quarterEndingDate) {
              let financialYear = val.financialYear.split("-");
              this.selectedQuarter = financialYear[1] + '-' + val.quarterEndingDate  
            }
          }
          else {
            if (val.financialYear && val.quarterEndingDate) {
              let financialYear = val.financialYear.split("-");
              this.selectedQuarter = financialYear[0] + '-' + val.quarterEndingDate
            }
          }
          if (this.isMaker) {
            let status= this.rejectedFlag?"REJECTED":"SUBMITTED";
               this.httpService.getData(PATH.GET_AML_CFT_RELATED_MATTERS + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
                 if (res.length > 0) {
                   this.display = res;
                   this.isRes=true;
                   this.submitted=false;    
                 }
                 else
                 { 
                  this.submitted=false;
                   this.isRes=false;
                   if(status=="SUBMITTED"){
                    this.prepareTable();
                    this.display=[];

                   }
                   if(status=="REJECTED"){
                     this.display=[];
                    this.prepareTable();
                  
                   }
                 }
               });
           }

          if (this.isChecker) {
            let status = "SUBMITTED" 
              this.httpService.getData(PATH.GET_AML_CFT_RELATED_MATTERS + "?quarterEndingDate=" + this.selectedQuarter +"&status=" + status).subscribe((res) => {
                if (res.length > 0) {
                  this.display = res;
                  this.submitted=false;
                }
                else {
                  this.display=[];
                  this.prepareTable();
                  this.submitted=true;
                }
              });
          }
        }
      }
 

      add() {
        // this.isSubmitted=false;
        this.insertRow();
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
        }
        this.submitted = false;
        this.pushNewRowData();
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

    delete(val: number): void {
      // if(this.localDelete == true){
      // const index: number = this.display.indexOf(val);
      // this.display.splice(index, 1); }
      // else{
      
      this.display.forEach(elm=>{
        this.id = elm.id;        
        })
        this.confirmationService.confirm({
          message: "Are you sure that you want to delete?",
          accept: () => {
            this.httpService.deleteData(PATH.DELETE_AML_CFT_RELATED_MATTERS+this.id).subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "delete Successfully",
              });
              this.display.splice(val, 1);
            })
          }
        })
      // }

    }
  

    submit(val): void {
     
      this.display.forEach(elm=>{
        elm.quarterEndingDate = this.selectedQuarter;
        elm.status = "SUBMITTED";
        })
      var patch = this.display.filter(o => o.edit).length > 0 ? true : false;
  
      if (patch) {
        this.submittedRecords = this.display.filter(o => o.edit);
      } else {
        this.submittedRecords = this.display;
      }
    
      this.submittedRecords.forEach(elm => {
        elm.status = "SUBMITTED"
      })
  
      console.log(this.submittedRecords);
      
      if(this.isRes){
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            var uri = PATH.UPDATE_AML_CFT_RELATED_MATTERS;
              this.httpService
                .updateData(this.submittedRecords, uri)
                .subscribe(
                  (res) => {
    
                    res.map(o => {
                      o.edit = false;
                    })
                    this.messageService.add({
                      severity: "success",
                      summary: "Success",
                      detail: "Submitted Successfully",
                    });
                    this.submitted = true;
                    this.changed = false;
                    if (this.rejectedFlag) {
                      this.getData('REJECTED');
                    }
                  
                    this.localDelete = false;
                    this.isSubmitted();
                  },
                  (err) => {
                    this.changed = false;
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
                );
           
          },
          reject: () => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Terminated by User",
            });
          },
        });
      }
      if(!this.isRes){
     this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          var uri = PATH.POST_AML_CFT_RELATED_MATTERS;
            this.httpService
              .postData(this.submittedRecords, uri)
              .subscribe(
                (res) => {
                  res.map(o => {
                    o.edit = false;
                  })
                  this.submitted = true;
                  this.changed = false;
                  if (this.rejectedFlag) {
                    this.getData('REJECTED');
                  }
                
                  this.localDelete = false;
                  this.isSubmitted();
                  this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Submitted Successfully",
                  });
                  },
                (err) => {
                  this.changed = false;
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
              );
         
        },
        reject: () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Terminated by User",
          });
        },
      });
    }
  }
  
  
  isSubmitted() {
    if (this.display) {
      this.display.map((o) => {
        if (o.status != "SUBMITTED") {
          this.submitted = true;
        } else {
        }
      });
    }
  }
  
  getData(val) {
    this.httpService.getData(PATH.GET_AML_CFT_RELATED_MATTERS + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
      this.display = res;  
    if ((val == 'REJECTED' || val == 'SUBMITTED') && this.display.length != 0) {
        this.submitted = false;
        this.isRes = true;
      }
  
      if(this.display.length==0){
        this.isRes=false;
        if(val=='SUBMITTED'){
         
        }
        if(val=='REJECTED'){
          this.submitted=true;     
        }
      }
    });
  }
  
  
    rejectedRecords() {
      this.checkedData = [];
      this.display = [];
      this.submitted = false;
      this.rejectedFlag = true;
      this.getRecords('REJECTED');
    }
    
   
  
    getRoles() {
      this.roles.map((o) => {
        this.role[o.role] = true;
      });
    }
    confirm(val) {
   
      let msg;
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
            let data = {
              "comments": "",
  
            }
          } else {
            this.submitOrApproveOrREJECT(val)
          }
        }
      });
    }
    submitOrApproveOrREJECT(input) {
     
      let submitFlag = true;
      if (input == "REJECTED" && !this.comments) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Comment is required",
        });
        submitFlag = false;
      }
  
      this.display.forEach(elm=>{
        elm.comment = this.checkerForm.get('comment').value;
        })
  
      let data: any = this.display
      data.forEach((el) => {
        el.status = input
      })
      
      if (submitFlag) {
        this.httpService.postData(data, PATH.POST_AML_CFT_RELATED_MATTERS).subscribe((res) => {
          this.submitted = true;
          let msg;
          if (input == "SUBMITTED") {
            msg = "Records Submitted Successfully"
          }
          if (input == "REJECTED") {
            msg = "Records Rejected Successfully"
          }
          if (input == "APPROVED") {
            msg = "Records Approved Successfully"
          }
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: msg,
          });
          this.getRecords('SUBMITTED');
          this.checkedData = [];
          this.checkerForm.reset();
        }, (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
        })
      }
    }
   
    AllSubmittedRecords() {
      this.display = [];
      this.submitted=false;
      this.rejectedFlag = false;
      this.getData('SUBMITTED');
    }
  
  numberOnly(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

 

}
 
