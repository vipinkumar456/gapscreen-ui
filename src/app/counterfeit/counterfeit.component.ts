import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { EmailValidator, Validators } from "@angular/forms";
import { Router} from '@angular/router'
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: "app-counterfeit",
  templateUrl: "./counterfeit.component.html",
  styleUrls: ["./counterfeit.component.scss"],
})
export class CounterfeitComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = false;
  formData: any;
isSubmitFlag:boolean=true;
  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
  isChecker:boolean=false;
  isMaker:boolean=false;
    changed:boolean=false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  accountNumber:any;
  submittedRecords: Array<any> = [];
  maxDateValue=new Date();
  branchCodes: Array<any> = [];
  serialNumber:any;
  submittedToAdd:boolean=false;
  heading: string;
  user: any;
  editMode:boolean= false;
  branchRefNo: any;
  comments: any;
  regexspecChar =  "[^(a-zA-z0-9 )]"
  regexpEmail = new RegExp(/^(([^>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  // regexpRef = new RegExp(/^(([^>\[\]\\.,;:\s@"]+(\.[^<>\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  reportStatus: any;
  reportStatusFlag: boolean;
  pattern: string | RegExp
  fb: any;
  ngForm: any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router:Router,private roleAuthGuard:RoleAuthGuardService
  ) {}

  add(): void {
    if(this.submittedToAdd){
    this.display=[];
    this.submittedToAdd=false;
    
    }
    this.submitted = false;
    this.accountNumber="";
     this.getBranchCode();  
  }

  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
   this.getUser();
   this.deleteBar=true;
    this.deleteBox=true;
    this.getVal();   
    this.heading="COUNTERFEIT CURRENCY REPORT (KYC FORMAT) FOR THE MONTH OF AUGUST 2021"
    this.tableNames = [
      {
        title: "branchRefNo",
        name: "Branch Ref No.(BSR Code[7digit])",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "branchId",
        name: "Branch ID",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "branchName",
        name: "Branch Name",
        subText: "",
        inpType: "text",
        editable: false,
        required: true,
      },
      {
        title: "address",
        name: "Address [Min 15char]",
        subText: "",
        inpType: "text",
        editable: false,
        required: true,
      },
      {
        title: "city",
        name: "City",
        subText: "",
        inpType: "text",
        editable: false,
        required: true,
      },
      {
        title: "stateCode",
        name: "State Code",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "pin",
        name: "PIN",
        subText: "",
        inpType: "number",
        editable: false,
        required: true,
      },
      {
        title: "countryCode",
        name: "Country Code",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
      },
      {
        title: "telephoneNo",
        name: "Telephone",
        subText: "",
        inpType: "number",
        editable: true,
        required: false,
      },
      {
        title: "mobileNo",
        name: "Mobile",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
      },
      {
        title: "faxNo",
        name: "Fax",
        subText: "",
        inpType: "number",
        editable: true,
        required: false,
      },
      {
        title: "branchEmail",
        name: "Branch E-mail",
        subText: "",
        inpType: "email",
        editable: true,
        required: true,
      },
      {
        title: "denomination",
        name: "Denomination",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
      },
      {
        title: "currencySerialNo",
        name: "Currency Serial No.",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "tenderingDate",
        name: "Date of Tendering",
        subText: "",
        inpType: "date",
        editable: true,
        required: true,
      },
      {
        title: "cashTendered",
        name: "Cash Tendered(Amount in Rs.) ",
        subText: "",
        inpType: "number",
        editable: true,
        required: false,
      },
      {
        title: "detectionDate",
        name: "Date of Detection",
        subText: "",
        inpType: "date",
        editable: true,
        required: true,
      },
      {
        title: "detectedAt",
        name: "Detected At",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "informedPolice",
        name: "Police Informed",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
      },
      {
        title: "policeReportDetails",
        name: "Police report Details",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
      },
      {
        title: "tenderingPerson",
        name: "Tendering Person",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "accountNumber",
        name: "Account No",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "accountHolder",
        name: "Account Holder",
        subText: "",
        inpType: "text",
        editable: false,
        required: true,
      },
      {
        title: "priority",
        name: "Priority",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "createdBy",
        name: "Created By",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "createdDate",
        name: "Created On",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "action",
        name: "Action",
        subText: "",
        inpType: "",
        editable: true,
        required: false,
      },
     
    ];
    
  }

  isSubmitted() {
    if (this.display) {
      this.display.map((o) => {
        if (o.status != "SUBMITTED") {
          this.submitted = false;
        } else {
        }
      });
    }
  }
 
  submit(): void {
    if (this.display.length == 0) {
      return;
    }

    var patch=this.display.filter(o => o.edit).length>0?true:false;

          if(patch){
            this.submittedRecords=this.display.filter(o => o.edit);
          }else{
            this.submittedRecords=this.display;
          }    

        for(var i=0;i<this.submittedRecords.length;i++){
          var currentRow=this.submittedRecords[i];
          
          if(!currentRow.branchRefNo){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Branch ref no is required",
            });
            return;
          }

          if((currentRow.branchRefNo && currentRow.branchRefNo.trim().length!=7)){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Branch ref should be 7 characters",
            });
            return;
          }

      if(!currentRow.branchId){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Branch ID is required",
        });
        return;
      }else{
        var resp=currentRow.branchId.match(this.regexspecChar);
        if(resp!=null && resp.length>0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "No Special characters allowed!",
        });
          return;
        }
      }  

      if(currentRow.branchId && !currentRow.branchName){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Enter valid Branch ID",
        });
        return;
      }
 
      if(!currentRow.branchEmail){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Branch E-mail is required",
        });
        return;
      }else{
        if(!this.regexpEmail.test(currentRow.branchEmail)){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:"Enter Vaild E-mail!",
          });
          return;
        }
      }

      if(!currentRow.denomination){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Denomination is required",
        });
        return;
      }

     if(!currentRow.currencySerialNo){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Currency Serial No is required",
      });
      return;
    }else{
      var resp=currentRow.currencySerialNo.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      } 
    }

    if(!currentRow.tenderingDate){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Date Of Tendering is required",
      });
      return;
  }

  if(currentRow.cashTendered){
    var resp=currentRow.cashTendered.match(this.regexspecChar);
    if(resp!=null && resp.length>0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "No Special characters allowed!",
    });
      return;
    }
  }
  
  if(!currentRow.detectionDate){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Date Of Detection is required",
    });
    return;
  }

  if(!currentRow.detectedAt){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Detected at is required",
    });
    return;
  }

  if(!currentRow.tenderingPerson){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Tendering Person is required",
    });
    return;
  }else{
    var resp=currentRow.tenderingPerson.match(this.regexspecChar);
    if(resp!=null && resp.length>0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "No Special characters allowed!",
    });
      return;
    } 
  }

  if(!currentRow.accountHolder){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Account Number is required",
    });
    return;
  }else{
    var resp=currentRow.accountHolder.match(this.regexspecChar);
    if(resp!=null && resp.length>0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "No Special characters allowed!",
    });
      return;
    } 
  }

  if(currentRow.accountHolder && !currentRow.accountHolder){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Enter Valid Account Number",
    });
    return;
  }
}
  this.submittedRecords.map(o => {
    o.detectionDate=moment(o.detectionDate).format("YYYY-MM-DD")
    o.tenderingDate=moment(o.tenderingDate).format("YYYY-MM-DD")
  });

  this.confirmationService.confirm({
    message: "Are you sure you want to submit?",
    accept: () => {
      var uri = !patch?PATH.COUNTERFEIT_SUBMIT:PATH.PATCH_EDIT;
    
     if(!patch)
      this.httpService
        .postData(
          
             this.submittedRecords,
          uri
        )
        .subscribe(
          (res) => {
            res.map( o => {
              o.edit=false;
            })
            this.submitted=true;
            this.changed = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.display=res;
                       this.submittedToAdd=true;
                       this.isSubmitted();
``          },
          (err) => {
            this.changed = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          }
        );
       if(patch){
        this.httpService
        .patch(
          
           this.submittedRecords,
          
          uri
        )
        .subscribe(
          (res) => {
            res.map( o => {
              o.edit=false;
            })
            this.submitted=true;
            this.changed = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
            this.display=res;
                       this.submittedToAdd=true;
                       this.isSubmitted();
          },
          (err) => {
            this.changed = false;
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: err.message,
            });
          }
        );
         }
        

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


  
editClicked(currentRow){
  this.editMode=true;
  currentRow.edit=true;
  currentRow.createdDate=moment(currentRow.createdDate).format("YYYY-MM-DD")
  currentRow.detectionDate=new Date(currentRow.detectionDate)
  currentRow.tenderingDate=new Date(currentRow.tenderingDate)
 
}

editUnClicked(currentRow){
  this.editMode=false;
  currentRow.edit=false;

  currentRow.createdDate=moment(currentRow.createdDate).format("YYYY-MM-DD")
}
// nextBtn(){
//   this.router.navigateByUrl('/ncrb');
// }

delete(index: number): void {
  this.display.splice(index, index + 1);
}
edit(){
    this.httpService.getData(PATH.PATCH_EDIT).subscribe((res) => {
      this.user = res.userName;
    });
  


}

getBranchDetails(event, item, type) {
  if(event){
  
    item.branchId = item.branchId.toUpperCase();
    this.uri = PATH.OMBUDSMAN_GETBRANCHNAME + item.branchId;
    let branch = this.httpService.getData(this.uri);
    branch.subscribe((branchResponse) => {
           
           if (branchResponse==null) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Enter valid Branch ID",
            });
            item.branchName ='';
            item.address ='';
            item.city ='';
            item.stateCode ='';
            item.pin = ''
            this.isSubmitFlag=false;
          }else{
            item.branchName = branchResponse.branchName;
            item.address = branchResponse.add1 + ', ' + branchResponse.add2;
            item.city = branchResponse.city;
            item.stateCode = branchResponse.state;
            item.pin = branchResponse.pincode
          }
        }, err => {
          this.messageService.add({
            severity:"error",
            summary:"Error",
            detail:err.message
          })
      });
  }
}
 
getAccountName(event, item, type) {
  if(event){
    this.uri = PATH.OMBUDSMAN_GETCUSTOMERNAME + item.accountNumber;
    var account = this.httpService.get(this.uri);
      account.then((customerName) => {
          item.accountHolder = customerName;
          if (customerName == "Invalid Account") {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Enter Valid Account Number",
            });
          }
          this.isValid();
        })
        .catch((err) => {
        });
  }
}

isValid() {
  let invalidRecords = this.display.filter((o) => {
    return (
      o.branchName == "Invalid Branch Code" ||
      o.customerName == "Invalid Account"
    );
  });
  invalidRecords.length > 0
    ? (this.formInvalid = true)
    : (this.formInvalid = false);
}
  
  confirm(val) {
    let msg ;
      // same for APPROVED and REJECTED
    if(val == "SUBMITTED"){
       msg = "Are you sure that you want to perform this submit?"
    }
    if(val == "REJECTED"){
      msg = "Are you sure that you want to perform this reject?"
   }
   if(val == "APPROVED"){
    msg = "Are you sure that you want to perform this approve?"
  }
  this.confirmationService.confirm({
    message: msg ,
 accept: () => {
   if(val == "SUBMITTED"){
    let data ={
      "comments": "",
    }
    
    }
   }
   }
  
);
}
getSubmitted(){
  if(this.branchRefNo.trim().length==0){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Enter Valid Ac No./Reference No.",
  });
  return;
}
  this.httpService.getData(PATH. COUNTERFEIT_GET_ALL+"?branchRefNo="+this.branchRefNo.toUpperCase()).subscribe(res=>{
    res.map(o=>{
      
      o.detectionDate = moment(o.detectionDate).format("YYYY-MM-DD");
      o.detectionDate = moment(o.detectionDate).format("YYYY-MM-DD");
      o.edit=false;
    })
    this.display=res;
    console.log(res);
    // this.account
    
    this.submittedToAdd=true;
    this.submitted = true;
    
    this.isSubmitted()
  })
}

  

getVal(){
  if(this.isMaker && this.reportStatus == 'SUBMITTED'){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "This  data is already submitted",
    });
  }

  if(this.isChecker && this.reportStatus == 'APPROVED'){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "This  data is already approved",
    });
  }

  if(this.reportStatus==null  || this.reportStatus=='UPDATED' || this.reportStatus=='REJECTED'){
    this.reportStatusFlag = true;
  }




}

getUser() {
  this.httpService.getData(PATH.GET_USER).subscribe((res) => {
    this.user = res.userName;
  });
}

 getBranchCode(){

  //  this.httpService.getData(PATH.OMBUDSMAN_GETBRANCHCODES).subscribe(res=>{
    // this.serialNumber=res.serialNo;
     var date = new Date();
     this.display.push({
      newRecord:true, 
      edit:false, 
       
      branchRefNo:null,
      branchName:null,
      address:null,
      city:null,
      stateCode:null,
      pin:null,
      countryCode:null,
      telephoneNo:null,
      mobileNo:null,
      branchEmail:null,
      denomination:null,
      currencySerialNo:null,
      cashTendered:null,
      detectedAt:null,
      informedPolice:null,
      policeReportDetails:null,
      // detectionDate: moment(date).format("YYYY-MM-DD"), 
      // tenderingDate: moment(date).format("YYYY-MM-DD"),
      tenderingPerson:"",
      accountHolder:null,
      accountNumber:null,
      priority:null,
      createdBy:this.user,
      createdDate: moment(date).format("DD-MM-YYYY"),
    });
} 

sortBy(header){
  if(header.inputType=="number"){
    this.submittedRecords.sort(function (a, b) {
      return parseFloat(a[header.title]) - parseFloat(b[header.title]);
    });
  }
  else if(header.inputType=="text"){
    this.submittedRecords.sort(function (a, b) {
      return a[header.title] - b[header.title]
    });
  }else{
    this.submittedRecords.sort(function (a, b) {
      var c:any = new Date(a[header.title]);
      var d:any = new Date(b[header.title]);
      return c-d;
    });
  }
  

}
}
