import { RoleAuthGuardService } from './../role-auth-guard.service';
import { Table } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-sanction-caution-list',
  templateUrl: './sanction-caution-list.component.html',
  styleUrls: ['./sanction-caution-list.component.scss']
})
export class SanctionCautionListComponent implements OnInit{
  heading: string;
  sanctionData: Array<any> = [];
  TableGetDate:any=[];
  cautionData: Array<any> = [];
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
  checkerForm:FormGroup;

  roles: Array<any> = [];
  role: any = {};
  submittedRecords: Array<any> = [];
  user: any;
  tableNames: Array<any> = [];
  cautionTable: Array<any> = [];
  countryForm: FormGroup;
  isView:boolean=false;
  branchName;
  countryDropDown;
  dropdownYears:any=[];
  selectedQuarter:any;
  quarterEndingDate : any;
  display: Array<any> = [];

  date3: Date;
  total: any = {
    cautionCustomersIntlBodies : 0,
    cautionCustomersMha : 0,
    cautionCustomersOthers : 0,

    sanctionCustomersMha : 0,
    sanctionCustomersOthers : 0,
    sanctionCustomersUnsc: 0,
     }
  OurDebitsNo: any;
  isRes:any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private fb : FormBuilder,
    private roleAuthGuard:RoleAuthGuardService,

  ) { }


  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
    this.heading = "Sanction/Caution list- Number of Customers";

    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    if (this.role.ROLE_CAML_C10_SANCTION_CAUTION_CUSTOMERS_MAKER) {
      this.isMaker = true;
    }

    if (this.role.ROLE_CAML_C10_SANCTION_CAUTION_CUSTOMERS_CHECKER) {
      this.isChecker = true;
    }

    this.prepareTable();
    this.prepareCautionTable();
   this.getQuarters();
    this.prepareCountryForm();
    this.preparereportData();
    this.prepareCautionTableData();
    
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
    });
  }

  prepareTable(){
      this.tableNames = [
      { title: "customerType", name: "I. Sanction Listed Customers",inpType: "number",editable: false},
      { title: "currentQuarter", name: "Current Quarter",inpType: "number",editable: true},
    ];
  }

  prepareCautionTable(){
    this.cautionTable = [
      { title: "customerType", name: "I. Sanction Listed Customers",inpType: "number",editable: false},
      { title: "currentQuarter", name: "Current Quarter",inpType: "number",editable: true},
    ];
  }

  preparereportData()
  {
    this.sanctionData=[
      {customerType:'MHA'},
      {customerType:'UNSC'},
      {customerType:'Other'}
    ]
  }

  prepareCautionTableData(){
    this.cautionData=[
      {customerType:'MHA'},
      {customerType:'International Bodies'},
      {customerType:'Others'}
    ]
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
          let status= this.rejectedFlag?"REJECTED":"SUBMITED";
             this.httpService.getData(PATH.GET_SANCTION_CAUTION_CUSTOMERS + "?quarterEndingDate=" + this.selectedQuarter + "&status=" + status).subscribe((res) => {
              if (res.length > 0) {  
               res.forEach(element => {
                this.TableGetDate = element;                 
               });
               this.sanctionData.forEach(elm=>{
     
                if(elm.customerType == 'MHA'){
                  elm.currentQuarter=this.TableGetDate.sanctionCustomersMha;
                }
                
                if(elm.customerType == 'UNSC'){
                  elm.currentQuarter= this.TableGetDate.sanctionCustomersUnsc;  
                }
          
                if(elm.customerType == 'Other'){
                  elm.currentQuarter = this.TableGetDate.sanctionCustomersOthers;
                }
               
                })
                this.cautionData.forEach(elm=>{
                  if(elm.customerType == 'MHA'){
                    elm.currentQuarter=this.TableGetDate.cautionCustomersMha;
                  }
                  
                  if(elm.customerType == 'International Bodies'){
                    elm.currentQuarter= this.TableGetDate.cautionCustomersIntlBodies;  
                  }
            
                  if(elm.customerType == 'Others'){
                    elm.currentQuarter = this.TableGetDate.cautionCustomersOthers;
                  }
                 
                  })
                this.isRes=true;
                 this.submitted=false;
               }
               else
               { 
                      
                 this.isRes=false;
                 if(status=="SUBMITED"){
                  this.sanctionData.forEach(elm=>{
     
                    if(elm.customerType == 'MHA'){
                      elm.currentQuarter=this.TableGetDate.sanctionCustomersMha;
                    }
                    
                    if(elm.customerType == 'UNSC'){
                      elm.currentQuarter= this.TableGetDate.sanctionCustomersUnsc;  
                    }
              
                    if(elm.customerType == 'Other'){
                      elm.currentQuarter = this.TableGetDate.sanctionCustomersOthers;
                    }
                   
                    })
                    this.cautionData.forEach(elm=>{
                      if(elm.customerType == 'MHA'){
                        elm.currentQuarter=this.TableGetDate.cautionCustomersMha;
                      }
                      
                      if(elm.customerType == 'International Bodies'){
                        elm.currentQuarter= this.TableGetDate.cautionCustomersIntlBodies;  
                      }
                
                      if(elm.customerType == 'Others'){
                        elm.currentQuarter = this.TableGetDate.cautionCustomersOthers;
                      }
                     
                      })
                  this.preparereportData();
                  this.prepareCautionTableData(); 
                 }
                 if(status=="REJECTED"){
                 
                   this.preparereportData();
                   this.prepareCautionTableData(); 
                   this.submitted=true;
                 }
               }
             });
         }

        if (this.isChecker) {
          let status = "SUBMITED" 
            this.httpService.getData(PATH.GET_SANCTION_CAUTION_CUSTOMERS + "?quarterEndingDate=" + this.selectedQuarter +"&status=" + status).subscribe((res) => {
              if (res.length > 0) {
                res.forEach(element => {
                  this.TableGetDate = element;                 
                 });
               
                 this.sanctionData.forEach(elm=>{
       
                    if(elm.customerType == 'MHA'){
                      elm.currentQuarter=this.TableGetDate.sanctionCustomersMha;
                    }
                    
                    if(elm.customerType == 'UNSC'){
                      elm.currentQuarter= this.TableGetDate.sanctionCustomersUnsc;  
                    }
              
                    if(elm.customerType == 'Other'){
                      elm.currentQuarter = this.TableGetDate.sanctionCustomersOthers;
                    }
                   
                    })
                    this.cautionData.forEach(elm=>{
                      if(elm.customerType == 'MHA'){
                        elm.currentQuarter=this.TableGetDate.cautionCustomersMha;
                      }
                      
                      if(elm.customerType == 'International Bodies'){
                        elm.currentQuarter= this.TableGetDate.cautionCustomersIntlBodies;  
                      }
                
                      if(elm.customerType == 'Others'){
                        elm.currentQuarter = this.TableGetDate.cautionCustomersOthers;
                      }
                     
                      })
                this.submitted=false;
              }
              else {
                this.preparereportData();
                this.prepareCautionTableData(); 
                this.submitted=true;
              }
    
            });
        }
      }
    }



  submit(val): void {

//     this.cautionData.forEach(elm=>{
//       if(elm.customerType == 'MHA'){
//         this.total.cautionCustomersMha = elm.currentQuarter;
//       }
      
//       if(elm.customerType == 'International Bodies'){
//         this.total.cautionCustomersIntlBodies = elm.currentQuarter;  
//       }

//       if(elm.customerType == 'Others'){
//         this.total.cautionCustomersOthers = elm.currentQuarter;
//       }    
//       })

//     this.sanctionData.forEach(elm=>{
// 
     
//       if(elm.customerType == 'MHA'){
//         this.total.sanctionCustomersMha = elm.currentQuarter;
//       }
      
//       if(elm.customerType == 'UNSC'){
//         this.total.sanctionCustomersUnsc = elm.currentQuarter;  
//       }

//       if(elm.customerType == 'Other'){
//         this.total.sanctionCustomersOthers = elm.currentQuarter;
//       }
     
//       })

//       this.cautionData.forEach(elm=>{
//         delete elm['currentQuarter'];
//       })
//       this.sanctionData.forEach(elm=>{
//         delete elm['currentQuarter'];
//       })

//     var patch = this.sanctionData.filter(o => o.edit).length > 0 ? true : false;


//     if (patch) {
//       this.submittedRecords = this.sanctionData.filter(o => o.edit);
//     } else {
//      
//     this.submittedRecords = [{
//       "cautionCustomersIntlBodies":  this.total.cautionCustomersIntlBodies,
//       "cautionCustomersMha":  this.total.cautionCustomersMha,
//       "cautionCustomersOthers": this.total.cautionCustomersOthers,
//       "comment": "",
//       "customerType": "",
//       "quarterEndingDate":  this.selectedQuarter,
//       "sanctionCustomersMha": this.total.sanctionCustomersMha,
//       "sanctionCustomersOthers": this.total.sanctionCustomersOthers,
//       "sanctionCustomersUnsc":  this.total.sanctionCustomersUnsc,
//       "status": "SUBMITED"
//       }]
//     }
 
    if(this.isRes){
     
      
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          this.cautionData.forEach(elm=>{
            if(elm.customerType == 'MHA'){
              this.total.cautionCustomersMha = elm.currentQuarter;
            }
            
            if(elm.customerType == 'International Bodies'){
              this.total.cautionCustomersIntlBodies = elm.currentQuarter;  
            }
      
            if(elm.customerType == 'Others'){
              this.total.cautionCustomersOthers = elm.currentQuarter;
            }    
            })
      
          this.sanctionData.forEach(elm=>{
      // console.log(this.sanctionData);
           
            if(elm.customerType == 'MHA'){
              this.total.sanctionCustomersMha = elm.currentQuarter;
            }
            
            if(elm.customerType == 'UNSC'){
              this.total.sanctionCustomersUnsc = elm.currentQuarter;  
            }
      
            if(elm.customerType == 'Other'){
              this.total.sanctionCustomersOthers = elm.currentQuarter;
            }
           
            })
      
            this.cautionData.forEach(elm=>{
              delete elm['currentQuarter'];
            })
            this.sanctionData.forEach(elm=>{
              delete elm['currentQuarter'];
            })
      
          var patch = this.sanctionData.filter(o => o.edit).length > 0 ? true : false;
      
      
          if (patch) {
            this.submittedRecords = this.sanctionData.filter(o => o.edit);
          } else {
            // this.submittedRecords = [...this.sanctionData , ...this.cautionData];
              
      
          this.submittedRecords = [{
            "cautionCustomersIntlBodies":  this.total.cautionCustomersIntlBodies,
            "cautionCustomersMha":  this.total.cautionCustomersMha,
            "cautionCustomersOthers": this.total.cautionCustomersOthers,
            "comment": "",
            "customerType": "",
            "quarterEndingDate":  this.selectedQuarter,
            "sanctionCustomersMha": this.total.sanctionCustomersMha,
            "sanctionCustomersOthers": this.total.sanctionCustomersOthers,
            "sanctionCustomersUnsc":  this.total.sanctionCustomersUnsc,
            "status": "SUBMITED"
            }]
          }
       
      
          var uri = PATH.UPDATE_SANCTION_CAUTION_CUSTOMERS;
            this.httpService
              .updateData(this.submittedRecords, uri)
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
                  this.messageService.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Submitted Successfully",
                  });
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
        this.cautionData.forEach(elm=>{
          if(elm.customerType == 'MHA'){
            this.total.cautionCustomersMha = elm.currentQuarter;
          }
          
          if(elm.customerType == 'International Bodies'){
            this.total.cautionCustomersIntlBodies = elm.currentQuarter;  
          }
    
          if(elm.customerType == 'Others'){
            this.total.cautionCustomersOthers = elm.currentQuarter;
          }    
          })
    
        this.sanctionData.forEach(elm=>{
    // console.log(this.sanctionData);
         
          if(elm.customerType == 'MHA'){
            this.total.sanctionCustomersMha = elm.currentQuarter;
          }
          
          if(elm.customerType == 'UNSC'){
            this.total.sanctionCustomersUnsc = elm.currentQuarter;  
          }
    
          if(elm.customerType == 'Other'){
            this.total.sanctionCustomersOthers = elm.currentQuarter;
          }
         
          })
    
          this.cautionData.forEach(elm=>{
            delete elm['currentQuarter'];
          })
          this.sanctionData.forEach(elm=>{
            delete elm['currentQuarter'];
          })
    
        var patch = this.sanctionData.filter(o => o.edit).length > 0 ? true : false;
    
    
        if (patch) {
          this.submittedRecords = this.sanctionData.filter(o => o.edit);
        } else {
          // this.submittedRecords = [...this.sanctionData , ...this.cautionData];
            
    
        this.submittedRecords = [{
          "cautionCustomersIntlBodies":  this.total.cautionCustomersIntlBodies,
          "cautionCustomersMha":  this.total.cautionCustomersMha,
          "cautionCustomersOthers": this.total.cautionCustomersOthers,
          "comment": "",
          "customerType": "",
          "quarterEndingDate":  this.selectedQuarter,
          "sanctionCustomersMha": this.total.sanctionCustomersMha,
          "sanctionCustomersOthers": this.total.sanctionCustomersOthers,
          "sanctionCustomersUnsc":  this.total.sanctionCustomersUnsc,
          "status": "SUBMITED"
          }]
        }
     
    
        var uri = PATH.POST_SANCTION_CAUTION_CUSTOMERS;
          this.httpService .postData(this.submittedRecords, uri)
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
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: "Submitted Successfully",
                });
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
}

  isSubmitted() {
    if (this.sanctionData) {
      this.sanctionData.map((o) => {
        if (o.status != "SUBMITED") {
          this.submitted = true;
        } else {
        }
      });
    }
  }


  
  rejectedRecords() {
    this.submitted = true;
    this.rejectedFlag = true;
    this.getRecords('REJECTED');
  }


    getData(val) {
      this.httpService.getData(PATH.GET_SANCTION_CAUTION_CUSTOMERS + "?quarterEndingDate=" + this.selectedQuarter +  "&status=" + val).subscribe((res) => {
          
        res.forEach(element => {
          this.TableGetDate = element;                 
         });
       
         this.sanctionData.forEach(elm=>{

            if(elm.customerType == 'MHA'){
              elm.currentQuarter=this.TableGetDate.sanctionCustomersMha;
            }
            
            if(elm.customerType == 'UNSC'){
              elm.currentQuarter= this.TableGetDate.sanctionCustomersUnsc;  
            }
      
            if(elm.customerType == 'Other'){
              elm.currentQuarter = this.TableGetDate.sanctionCustomersOthers;
            }
           
            })
            
            this.cautionData.forEach(elm=>{
              if(elm.customerType == 'MHA'){
                elm.currentQuarter=this.TableGetDate.cautionCustomersMha;
              }
              
              if(elm.customerType == 'International Bodies'){
                elm.currentQuarter= this.TableGetDate.cautionCustomersIntlBodies;  
              }
        
              if(elm.customerType == 'Others'){
                elm.currentQuarter = this.TableGetDate.cautionCustomersOthers;
              }
             
              })


      if ((val == 'REJECTED' || val == 'SUBMITED') && this.display.length != 0) {
          this.submitted = false;
          this.isRes = true;
        }
    
        if(this.display.length==0){
          this.isRes=false;
          if(val=='SUBMITED'){
            // this.prepareReportData();
          }
          if(val=='REJECTED'){
            this.submitted=true;
            // this.prepareReportData();
          }
        }
      });
    }
    
  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }




  confirm(val) {
 
    let msg;
    if (val == "SUBMITED") {
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
        if (val == "SUBMITED") {
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



    this.cautionData.forEach(elm=>{
      if(elm.customerType == 'MHA'){
        this.total.cautionCustomersMha = elm.currentQuarter;
      }
      
      if(elm.customerType == 'International Bodies'){
        this.total.cautionCustomersIntlBodies = elm.currentQuarter;  
      }

      if(elm.customerType == 'Others'){
        this.total.cautionCustomersOthers = elm.currentQuarter;
      }    
      })

    this.sanctionData.forEach(elm=>{
// console.log(this.sanctionData);
     
      if(elm.customerType == 'MHA'){
        this.total.sanctionCustomersMha = elm.currentQuarter;
      }
      
      if(elm.customerType == 'UNSC'){
        this.total.sanctionCustomersUnsc = elm.currentQuarter;  
      }

      if(elm.customerType == 'Other'){
        this.total.sanctionCustomersOthers = elm.currentQuarter;
      }
     
      })

      this.cautionData.forEach(elm=>{
        delete elm['currentQuarter'];
      })
      this.sanctionData.forEach(elm=>{
        delete elm['currentQuarter'];
      })

      let data:any  = [{
        "cautionCustomersIntlBodies":  this.total.cautionCustomersIntlBodies,
        "cautionCustomersMha":  this.total.cautionCustomersMha,
        "cautionCustomersOthers": this.total.cautionCustomersOthers,
        "comment": "",
        "customerType": "",
        "quarterEndingDate":  this.selectedQuarter,
        "sanctionCustomersMha": this.total.sanctionCustomersMha,
        "sanctionCustomersOthers": this.total.sanctionCustomersOthers,
        "sanctionCustomersUnsc":  this.total.sanctionCustomersUnsc,
        "status": input
        }]
        data.forEach(elm=>{
          elm.comment = this.checkerForm.get('comment').value;
          })
    if (submitFlag) {
      this.httpService.postData(data, PATH.POST_SANCTION_CAUTION_CUSTOMERS).subscribe((res) => {
        this.submitted = true;
        let msg;
        if (input == "SUBMITED") {
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
        this.getRecords('SUBMITED');
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
    this.getData('SUBMITED');
  } 

  numberOnly(event:any){   
    const regexpNumber = /^[0-9]*(\.[0-9]{0,2})?$/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

 

}

