import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { from } from "rxjs";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as moment from "moment";
import { MenuItemContent } from "primeng/menu";
import { RoleAuthGuardService } from "../role-auth-guard.service";
@Component({
  selector: "app-equifax",
  templateUrl: "./equifax.component.html",
  styleUrls: ["./equifax.component.scss"],
})
export class EquifaxComponent implements OnInit {
  display: Array<any> = [];
  editedRecords: Array<any> = [];
  tableNames: Array<any> = [];
  submitted: boolean = false;
  isAdd: boolean = true;
  uri: string = "";
  formInvalid: boolean = false;
  serialNumber:any;
  accountNumber;


  pattern = "[1-9]|1";
  changed:boolean=false;
  deleteBox: boolean = false;
  deleteBar: boolean = false;
  accountNo:any;
  submittedRecords: Array<any> = [];
  maxDateValue=new Date();
  branchCodes: Array<any> = [];
  submittedToAdd:boolean=false;
  heading: string;
  user: any;
  editMode:boolean= false;
  regexspecChar =  "[^(a-zA-z0-9 )]"
  regexpEmail = new RegExp(/^(([^>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
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
    }
    this.submitted = false;
    // this.accountNo="";
    // this.getUser();

     this.getBranchCode();  
  }

  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
    this.getUser();
    this.deleteBar=true;
    this.deleteBox=true;
   
     this.heading="Current Account Review"
    this.tableNames = [
      {
        title: "branchCode",
        name: "Branch",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },      
      {
        title: "zoneName",
        name: "Zone",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "circleName",
        name: "Circle",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "customerAcctNo",
        name: "Account Number",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "customerId",
        name: "Customer ID",
        subText: "",
        inpType: "text",
        editable: false,
        required: false,
      },
      {
        title: "customerName",
        name: "Account Name",
        subText: "",
        inpType: "text",
        editable: false,
        required: true,
      },
      {
        title: "status",
        name: "Action Taken",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      {
        title: "remarks",
        name: "Remarks",
        subText: "",
        inpType: "text",
        editable: true,
        required: true,
      },
      // {
      //   title: "dataUpdated",
      //   name: "Data Updated",
      //   subText: "",
      //   inpType: "",
      //   editable: true,
      //   required: true,
      // },
      {
        title: "createdBy",
        name: "Created By",
        subText: "",
        inpType: "date",
        editable: false,
        required: false,
      },
      {
        title: "createdOn",
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
        editable: false,
        required: false,
      },
    ];
    
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

  submit(): void {
  

    var patch=this.display.filter(o => o.edit).length>0?true:false;

          if(patch){
            this.submittedRecords=this.display;
          }else{
            this.submittedRecords=this.display;
          }    

    for(var i=0;i<this.submittedRecords.length;i++){
      var currentRow=this.submittedRecords[i];
    
       if(currentRow.zoneName==null || currentRow.zoneName.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "BranchCode is required or Enter valid Branch Code ",
        });
        return;
      } if(currentRow.circleName==null || currentRow.circleName.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "BranchCode is required or Enter valid Branch Code",
        });
        return;
      } if(currentRow.branchCode==null || currentRow.branchCode.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "BranchCode is required or Enter valid Branch Code",
        });
         return;
     
      
      } var resp=currentRow.branchCode.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      }
      if(currentRow.customerAcctNo==null || currentRow.customerAcctNo.trim().lenght==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Account Number is required",
        });
        return;
    
      } if(currentRow.status==null || currentRow.status.trim().length==0){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: " Status  is required",
        });
        return;
      } if(currentRow.remarks ==null || currentRow.remarks.trim().length==0 ){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: " Remarks are  required",
        });
        return;
      }var resp=currentRow.remarks.match(this.regexspecChar);
      if(resp!=null && resp.length>0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "No Special characters allowed!",
      });
      return;
      } 
      // if(currentRow.dataUpdated ==null || currentRow.dataUpdated.trim().length==0 ){
      //   this.messageService.add({
      //     severity: "error",
      //     summary: "Error",
      //     detail: " Data Update is required",
      //   });
      //   return;
      // }
   


  }

  this.confirmationService.confirm({
    message: "Are you sure you want to submit?",
    accept: () => {
      var uri = !patch?PATH.EQUIFAX_SUBMIT:PATH.PATCH_EDIT;
    
     if(!patch)
      this.httpService
        .postData(
          {
            inputList:this.submittedRecords,
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
            // this.display=res;
            // console.log(this.display);
              this.display=[];
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
            this.display=[];
            // console.log(this.display);
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


   
  }

  editUnClicked(currentRow){
    this.editMode=false;
    currentRow.edit=false;
  currentRow.createdDate=moment(currentRow.createdDate).format("YYYY-MM-DD")


  }

  delete(val: number): void {
    // this.display.splice(index, index + 1);
    const index: number = this.display.indexOf(val);
    this.display.splice(index, 1);
  }
  edit(){
      this.httpService.getData(PATH.PATCH_EDIT).subscribe((res) => {
        this.user = res.userName;
      });
    


  }

  fileUpload(event, item, type) {
    if (type.title=="customerAcctNo"){
      item.customerId = null;
      item.customerName = null;

    }
    if (type.title=="branchCode"){
      item.circleName = null;
      item.zoneName = null;


    }
    if (type.inpType == "file") {
  
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      item.document = formData;
    } if (type.title == "branchCode") {
      item.branchCode = item.branchCode.toUpperCase();
      this.uri = PATH.EQUIFAX_GETBRANCHNAME + item.branchCode;
      var branch = this.httpService.getData(this.uri);
      console.log(branch)
      branch
        .subscribe((branchResponse) => {

           console.log(branchResponse);
           if (branchResponse==null) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "BranchCode is required or Enter valid Branch Code",
            });
          }else{
          item.branchName = branchResponse.branchName;
          item.circleName = branchResponse.circleName;
          item.zoneName = branchResponse.zoneName;
         
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
        item.arngmntName = null;
        item.ipCode = null;
      }
      this.uri = PATH.EQUIFAX_GETCUSTOMERNAME + item.customerAcctNo;
      var branch = this.httpService.getData(this.uri);
      console.log(branch)
      branch
        .subscribe((branchResponse) => {

           console.log(branchResponse);
           if (branchResponse==null) {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Account number is required or Enter valid Account Number",
            });
          }else{
            item.customerAcctNo = branchResponse.accountNbr;
            item.customerId = branchResponse.ipCode;
            item.customerName = branchResponse.arngmntName;
            item.status = branchResponse.status;
            item.remarks = branchResponse.remarks;
            item.dataUpdated = branchResponse.dataUpdated;
            if(item.status=='Closed'){
              item.edit = true;
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "This Account number is already Closed",
              });
            }
          }
          this.isValid();
        }, err => {
          this.messageService.add({
            severity:"error",
            summary:"Error",
            detail:err.message
          })
      });
 
     }
    }
  isValid() {
    let invalidRecords = this.display.filter((o) => {
      return (
        o.branchName == "Invalid Branch Code" ||
        o.arngmntName == "Invalid Account Number"
      );
    });
    invalidRecords.length > 0
      ? (this.formInvalid = true)
      : (this.formInvalid = false);
  
   
  
    }
 
  getSubmitted(){
   
    console.log(this.accountNo.toUpperCase())
  
  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
    });
  }


  getDataByAccountNo(){
    this.httpService.getData(PATH.GET_EQUIFAX_DATA+'?accountNumber='+this.accountNumber).subscribe(res=>{
      // this.display = [];
      this.display = res;
      console.log(this.display)
    })
  }


   getBranchCode(){
       var date = new Date();
       this.display.push({
        newRecord:true,
        edit:false, 
        createdOn: moment(date).format("YYYY-MM-DD"),
        createdBy:this.user
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
