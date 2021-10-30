import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";

@Component({
  selector: "app-banking",
  templateUrl: "./exposure-qccp.component.html",
  styleUrls: ["./exposure-qccp.component.scss"],
})
export class ExposureQccpComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = false;
  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
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
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService
  ) {}

  add(): void {
    if(this.submittedToAdd){
    this.display=[];
    this.submittedToAdd=false;
    
    }
    this.submitted = false;
    this.accountNo="";
    // this.getUser();
     this.getBranchCode();  
  }

  ngOnInit(): void {
   this.deleteBar=true;
    this.deleteBox=true;
   
     this.heading="Format for reporting of exposures to QCCP's"
    this.tableNames = [
      
      {
        title: "date",
        name: "Date",
        subText: "",
        inpType: "date",
        editable: false,
        required: false,
        
      },
      {
        title: "tradeExposure",
        name: "Trade Exposure",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "defaultFundExposure",
        name: "Default Fund Exposure",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
        
      },
      {
        title: "others",
        name: "Others Exposure 4",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      {
        title: "totalExposure",
        name: "Total Exposure as a Percentage of Tier 1 capital",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
        
      },
      
      
    ];
      //this.getBranchCode();
    
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

          console.log(this.submittedRecords)
          console.log(patch)

    for(var i=0;i<this.submittedRecords.length;i++){
      var currentRow=this.submittedRecords[i];
      console.log(currentRow);
      console.log("XXXXXXXXXX "+currentRow.branchName?.toString().trim().length);
      
      // if(currentRow.txnDateToString==null){
      //   this.messageService.add({
      //     severity: "error",
      //     summary: "Error",
      //     detail: "Date is required",
      //   });
      //   return;
       if(currentRow.branchName==null || currentRow.branchName.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Branch Name is required",
        });
        return;
      }
        if(currentRow.circleName==null || currentRow.circleName.trim().length==0){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Circle Name is required",
          });
          return;
        }
          if(currentRow.zoneName==null || currentRow.zoneName.trim().length==0){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Zone Name is required",
            });
            return;
      } if(currentRow.officeName==null || currentRow.officeName.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Office Name is required",
        });
        return;
      } if(currentRow.complaintNo==null || currentRow.complaintNo.trim().length!=15 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Complaint No should be 15 characters",
        });
         return;
      }if(currentRow.boLetterDate==null  ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "BoLetter Date is required",
        });
        return;
      } if(currentRow.penaltyAmount==null || currentRow.penaltyAmount<=0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Penalty Amount is required",
        });
        return;
      } if(currentRow.paymentDate==null ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Payment Date is required",
        });
        return;
      } if(currentRow.customerAcctNo==null || currentRow.customerAcctNo.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Customer AcctNo is required",
        });
        return;
      } if(currentRow.customerName==null || currentRow.customerName.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Customer Name is required",
        });
        return;
      } if(currentRow.complaintInBrief ==null || currentRow.complaintInBrief.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: " Brief Of complaint is required",
        });
        return;
      } if(currentRow.penaltyReason==null || currentRow.penaltyReason.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Reason of Penalty is required",
        });
        return;
      } if((currentRow.penaltyReason=="Others" && currentRow.penaltyReasonSubCategory==null )  || (currentRow.penaltyReason=="ATM / Debit Cards" && currentRow.penaltyReasonSubCategory==null )){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Reason of Penalty Sub-Category is required",
        });
        return;
      
    }
      if(currentRow.staffAccountabilityStatus==null || currentRow.staffAccountabilityStatus.trim().lenght==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Staff Accountability Status is required",
        });
        return;
    
    }
     if( (currentRow.staffAccountabilityStatus!="Not percieved" && currentRow.remarks==null ) ){
    
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Outcome of case/present status of Staff Accountability Examined is required",
      });
      return;
    }
   
  
  }

    this.submittedRecords.map(o => {
      o.boLetterDate=moment(o.boLetterDate).format("YYYY-MM-DD")
      o.paymentDate=moment(o.paymentDate).format("YYYY-MM-DD")
    });
    
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = !patch?PATH.OMBUDSMAN_SUBMITALL:PATH.PATCH_EDIT;
       if(!patch)
        this.httpService
          .postData(
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
              // console.log(res + "Submitted");
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.display=res;
              console.log(this.display);
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
              // console.log(res + "Submitted");
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              this.display=res;
              console.log(this.display);
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
  onChange(){

  }

  boDateSelector(item){
    console.log(item);
   // this.maxDateValue=item.boLetterDate;
    item.paymentDate=null;
  

  }


  editClicked(currentRow){
    this.editMode=true;
    currentRow.edit=true;

    currentRow.enteredOn=moment(currentRow.enteredOn).format("DD-MM-YYYY")
    currentRow.paymentDate=new Date(currentRow.paymentDate)
    currentRow.boLetterDate=new Date(currentRow.boLetterDate)
  }

  editUnClicked(currentRow){
    this.editMode=false;
    currentRow.edit=false;

    currentRow.enteredOn=moment(currentRow.enteredOn).format("DD-MM-YYYY")
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
    if (type.title=="penaltyReason"){
      item.penaltyReasonSubCategory = null;
    }
    if (type.title=="staffAccountabilityStatus"){
      item.remarks = null;
    }
    if (type.title=="branchCode"){
      item.branchName = null;
      item.circleName = null;
      item.zoneName = null;


    }
    if (type.title=="boLetterDate"){
      this.maxDateValue=item.boLetterDate;
      console.log("hhhhhhhh");
    }
    if (type.title == "branchCode") {
      item.branchCode = item.branchCode.toUpperCase();
      this.uri = PATH.OMBUDSMAN_GETBRANCHNAME + item.branchCode;
      var branch = this.httpService.getData(this.uri);
      console.log(branch)
      branch
        .subscribe((branchResponse) => {
           console.log(branchResponse.circleName);
          item.branchName = branchResponse.branchName;
          item.circleName = branchResponse.circleName;
          item.zoneName = branchResponse.zoneName;
          if (!branchResponse) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Enter Valid Branch Code",
            });
          }
          
          
       
          this.isValid();

        }, err => {
          this.messageService.add({
            severity:"error",
            summary:"Error",
            detail:err.message
          })
      });
 
     } else if (type.title == "customerAcctNo") {
      item.customerAcctNo = item.customerAcctNo.toUpperCase();
      if (type.title=="customerAcctNo"){
        item.customerName = null;
      }
      this.uri = PATH.OMBUDSMAN_GETCUSTOMERNAME + item.customerAcctNo;
      var account = this.httpService.get(this.uri);
      account
        .then((customerName) => {
          item.customerName = customerName;
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
  getSubmitted(){
    if(this.accountNo.trim().length==0){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: "Enter Valid Ac No./Reference No.",
    });
    return;
  }
    console.log(this.accountNo.toUpperCase())
    this.httpService.getData(PATH.OMBUDSMAN_SUBMITTED_BY_CUSTOMER+this.accountNo.toUpperCase()).subscribe(res=>{
      res.map(o=>{
        o.txnDateToString = moment(o.txnDate).format("DD-MM-YYYY");
        o.edit=false;
      })
      this.display=res;
      console.log(res);
      
      this.submittedToAdd=true;
      this.submitted = true;
      //this.isSubmitted()
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
        txnDate: moment(date).format("YYYY-MM-DD"),
        txnDateToString: moment(date).format("DD-MM-YYYY"),
        serialNo: this.serialNumber,
        branchCode: null,
        branchName: null,
        circleName:null,
        zoneName:null,
        officeName: null,
        complaintNo: null,
        boLetterDate: null,
        penaltyAmount: null,
        paymentDate: null,
        customerAcctNo: null,
        customerName: "",
        complaintInBrief: null,
        penaltyReason: null,
        staffAccountabilityStatus: null,
        remarks: null,
        enteredBy:this.user,
        enteredOn: moment(date).format("DD-MM-YYYY"),
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
