import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: "app-ncrb",
  templateUrl: "./ncrb.component.html",
  styleUrls: ["./ncrb.component.scss"],
})
export class NcrbComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = false;
  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
  after:boolean = true;
  pattern = "[1-9]|1";
  changed:boolean=false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  accountNo:any;
  submittedRecords: Array<any> = [];
  maxDateValue=new Date();
  branchCodes: Array<any> = [];
  serialNumber:any;
  submittedToAdd:boolean=false;
  heading: string;
  user: any;
  editMode:boolean= false;
  serialNoLocal: number=0;
  regexspecChar =  "[^(a-zA-z0-9 )]"
  regexpEmail = new RegExp(/^(([^>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  currencyType: any;
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private roleAuthGuard:RoleAuthGuardService
  ) {}

  add(): void {
    if(this.submittedToAdd){
      this.display=[];
    this.submittedToAdd=false;
    this.after=true
    this.submit();
    
    }
    this.submitted = false;
    // this.accountNo="";
    // this.getUser();
    this.serialNoLocal=this.serialNoLocal+1;
     this.getBranchCode();  
  }

  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
    this.getUser();
    this.deleteBar=true;
    this.deleteBox=true;
   
     this.heading="COUNTERFEIT CURRENCY REPORT (NCRB FORMAT) FOR THE MONTH OF AUGUST 2021"
    this.tableNames = [
      
      {
        title: "serialNo",
        name: "S.no",
        subText: "",
        inpType: "number",
        editable: false,
        required: false,
        
      },
      {
        title: "currencyType",
        name: "Currency Type",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "noteType",
        name: "Note Type",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
        
      },
      {
        title: "denomination",
        name: "Denomination",
        subText: "",
        inpType: "number",
        editable: true,
        required: false,
        
      },
      {
        title: "quantity",
        name: "Quantity",
        subText: "",
        inpType: "number",
        editable: false,
        required: false,
        
      },
      {
        title: "amount",
        name: "Amount",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
        
      },
      {
        title: "series",
        name: "Series",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      
      },
      {
        title: "noteNumber",
        name: "Note Number",
        subText: "",
        inpType: "number",
        editable: true,
        required: true,
        
      },
      {
        title: "detectionDate",
        name: "Date of Detection ",
        subText: "",
        inpType: "date",
        editable: true,
        required: true,
      
      },
      {
        title: "detectionPlace",
        name: "Place of Detection ",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
        
      },
      {
        title: "detectionSource",
        name: "Source Of Detection",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "watermarkAvailable",
        name: "Watermark Available",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
        
      },
      {
        title: "currencyDesign",
        name: "Currency Design",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "pre2005Note",
        name: "Pre 2005 Note ",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
        
      },
      {
        title: "securityThread",
        name: "Security Thread",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
        
      },
      {
        title: "quality",
        name: "Quality",
        subText: "",
        inpType: "text",
        editable: true,
        required: false,
        
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
debugger
    var patch=this.display.filter(o => o.edit).length>0?true:false;

          if(patch){

            this.submittedRecords=this.display.filter(o => o.edit);
          }else{
            this.submittedRecords=this.display;
          }    

         
    for(var i=0;i<this.submittedRecords.length;i++){
      var currentRow=this.submittedRecords[i];
     
      
    
      if(currentRow.currencyType==null || currentRow.currencyType.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Currency Type is required",
        });
        return;
      }var resp=currentRow.currencyType.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      } 
       if(currentRow.noteType==null || currentRow.noteType.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Note Type is required",
        });
         return;
      }var resp=currentRow.noteType.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      } 
      if(currentRow.denomination==null || currentRow.denomination.trim().lenght==0  ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Denomination is required",
        });
        return;
      
      } if(currentRow.amount==null || currentRow.amount.trim().lenght==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Amount is required",
        });
        return;
      } if(currentRow.series==null || currentRow.series.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Series  is required",
        });
        return;
      }var resp=currentRow.series.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      }
       if(currentRow.noteNumber==null || currentRow.noteNumber.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Note Number  is required",
        });
        return;
      } if(currentRow.detectionDate ==null || currentRow.detectionDate.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: " Date of Detection required",
        });
        return;
      } if(currentRow.detectionPlace==null || currentRow.detectionPlace.trim().length==10){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Detection Place is required",
        });
        return;
      }var resp=currentRow.detectionPlace.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      }
       if((currentRow.detectionSource==null || currentRow.detectionSource.trim().lenght==0 )   ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Source Of Detection is required",
        });
        return;
      
    }
      if(currentRow.watermarkAvailable==null || currentRow.watermarkAvailable.trim().lenght==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Water Mark Availabe is required",
        });
        return;
    
    }var resp=currentRow.watermarkAvailable.match(this.regexspecChar);
    if(resp!=null && resp.length>0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "No Special characters allowed!",
    });
    return;
    }
     if(currentRow.currencyDesign==null || currentRow.currencyDesign.trim().length==0 ){
    
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Currency design is required",
      });
      return;
    }var resp=currentRow.currencyDesign.match(this.regexspecChar);
    if(resp!=null && resp.length>0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "No Special characters allowed!",
    });
    return;
    }
    if(currentRow.pre2005Note==null || currentRow.pre2005Note.trim().lenght==0 ){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Pre Note is required",
      });
      return;
  
  }var resp=currentRow.pre2005Note.match(this.regexspecChar);
  if(resp!=null && resp.length>0){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "No Special characters allowed!",
  });
  return;
  }
  if(currentRow.securityThread==null || currentRow.securityThread.trim().lenght==0 ){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Security Thread  is required",
    });
    return;

}var resp=currentRow.securityThread.match(this.regexspecChar);
if(resp!=null && resp.length>0){
this.messageService.add({
  severity: "error",
  summary: "Error",
  detail: "No Special characters allowed!",
});
return;
}
if(currentRow.quality==null || currentRow.quality.trim().lenght==0 ){
  this.messageService.add({
    severity: "error",
    summary: "Error",
    detail: "Quality is required",
  });
  return;

}var resp=currentRow.quality.match(this.regexspecChar);
if(resp!=null && resp.length>0){
this.messageService.add({
  severity: "error",
  summary: "Error",
  detail: "No Special characters allowed!",
});
return;
}

  }

    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = !patch?PATH.NCRB_SUBMIT:PATH.PATCH_EDIT;
      
       if(!patch)
      //  this.submittedRecords.serialNo=""
        this.httpService

          .postData(

            
               this.submittedRecords,
            uri
          )
          .subscribe(
            (res) => {
              this.submittedRecords = res;
              this.display = res;
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
         if(patch){
          this.httpService
          .patch(
            {
              inputList: this.submittedRecords,
            },
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
     this.after = false

          
  
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
  }

  editUnClicked(currentRow){
    this.editMode=false;
    currentRow.edit=false;
    currentRow.createdDate=moment(currentRow.createdDate).format("YYYY-MM-DD")
  }

  delete(index: number): void {
    this.display.splice(index, index + 1);
  }

  edit(){
      this.httpService.getData(PATH.PATCH_EDIT).subscribe((res) => {
        this.user = res.userName;
      });
  }

  fileUpload(event, item, type) {
    if (type.inpType == "file") {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      item.document = formData;
    }
  }
 
  getSubmitted(){
      if(this.currencyType.trim().length==0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Enter Valid Ac No./Reference No.",
      });
      return;
    }
      this.httpService.getData(PATH. NCRB_GET+"?branchRefNo="+this.currencyType.toUpperCase()).subscribe(res=>{
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
        serialNo: this.serialNoLocal,
        currencyType:"Note",
        quantity:1,
        detectionSource:"By bank",
        currencyDesign:"MGWN",
        createdDate: moment(date).format("YYYY-MM-DD"),
        createdBy:this.user,
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
