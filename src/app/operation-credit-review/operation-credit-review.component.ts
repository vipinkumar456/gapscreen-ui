import { Component, ElementRef, OnInit,ViewChild,EventEmitter } from '@angular/core';
import { ActivatedRoute, Route } from "@angular/router";
import { Table } from "primeng/table";
import { disableDebugTools, Title, ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from "@angular/platform-browser";
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RoleAuthGuardService } from '../role-auth-guard.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountListComponent } from './account-list/account-list.component';
import { Dialog } from 'primeng/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EMLINK } from 'constants';
import { ThousandPipe } from '../services/number.pipe';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-operation-credit-review',
  templateUrl: './operation-credit-review.component.html',
  styleUrls: ['./operation-credit-review.component.scss']
})
export class OperationCreditReviewComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  accountData : EventEmitter<any> = new EventEmitter<any>();
  accountForm: FormGroup;
  creditDetailForm: FormGroup;
  isMaker:boolean=false;
  isCO:boolean=false;
  isZO:boolean=false;
  isHO:boolean=false;
  isChecker:boolean=false;
  roles: Array<any> = [];
  role: any = {};
  comment: any;
  submitted:boolean=false;
  actionDropdown;
  actions:any;
  isUndertaking:boolean=false;
  isNoticeIssued:boolean=false;
  isExempted:boolean=false;
  remarks:any;
  dialog: any;
  actionHeading:any;
  isAccountList:boolean=false;
  date= new Date();
  undertakingObtained:any={
    underTakingDocument:'',
    underTakingDocumentName:'',
    underTakingDocumentType:''
  };
  noticeIssued:any={
    noticeDocument:'',
    noticeDocumentName:'',
    noticeDocumentType:''
  };
  exempted:any={};rop
  isRes:boolean=false;
  user: any;
  exemptedRemarks;
  exemptedReason;
  exemptedReasonDropdown:any;
  dateOfNotice;
  isUnderTakingDownload:boolean=false;
  isNoticeDownload:boolean=false;
  isCoRes:boolean=false;
  isZoRes:boolean=false;
  isHoRes:boolean=false;
  radioButtonValue:any;
  isRadio:boolean=false;
  isLcbFlag:boolean=false;
  isUploaded:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private roleAuthGuard:RoleAuthGuardService,
    public dialogService: DialogService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
    this.spinner.show();
    
    if (this.role.ROLE_OPERATIONS_CREDIT_REVIEW) {
      this.isMaker = true;
    }
    if (this.role.ROLE_OPERATIONS_CREDIT_REVIEW_CO) {
      this.isCO = true;
    }
    if (this.role.ROLE_OPERATIONS_CREDIT_REVIEW_ZO) {
      this.isZO = true;
    }
    if (this.role.ROLE_OPERATIONS_CREDIT_REVIEW_HO) {
      this.isHO = true;
    }

    this.getUser();
    this.getExemptedDropdown();
    this.prepareForm();
    this.prepareCreditDetailForm();
    this.submitted=true;
  }

  prepareForm() {
    this.accountForm = this.fb.group({
      ipCode: [''],
      panNo: [''],
      accountNbr:['']
    })
  }

  prepareCreditDetailForm(){
    this.creditDetailForm=this.fb.group({
      accountName: [''],
      accountNbr: [''],
      accountScheme: [''],
      customerId: [''],
      othBankCcodFacility: [''],
      othBankCcodNoLoan: [''],
      othBankSancAmt: [''],
      othBankTotNoLoan: [''],
      ourBankCcodFacility: [''],
      ourBankCcodNoLoan: [''],
      ourBankSancAmt: [''],
      ourBankTotNoLoan: [''],
      panNo: [''],
      totCcodNoLoan: [''],
      totNoLoan: [''],
      totSancAbv10Per: [''],
      totSancAmt: [''],
      totalExpFlg: [''],
    })
  }

  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }

  getExemptedDropdown(){
    this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW_DROPDOWN).subscribe((res) => {
     //  this.exemptedReasonDropdown=res.map(elm =>{return {label:res,value:res}});
     this.exemptedReasonDropdown=res.map(elm=> {return {label:elm,value:elm}})
    })
  }

  upload(){
    this.fileInput.nativeElement.click();
  }

  uploadFile() {
    const fileBrowser = this.fileInput.nativeElement;
    const formData = new FormData();
    formData.append("file", fileBrowser.files[0]); 
    if (fileBrowser.files[0].size > 4194304) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: 'File size should be max 4MB and only pdf/png formate supported.',
      });
      return;
    } 
    this.spinner.show();    
    this.httpService.postData(formData, PATH.POST_OPERATION_CREDIT_REVIEW_DETAILS_UPLOAD).subscribe((res) => {
      // console.log(res);
      // this.undertakingObtained.underTakingDocument=res.fileData;
      
      if(this.actionHeading=='Undertaking Obtained To'){
        this.undertakingObtained.underTakingDocument=res.fileData;
        // console.log('data', this.undertakingObtained.underTakingDocument);
        this.undertakingObtained.underTakingDocumentName=res.fileName;
        this.undertakingObtained.underTakingDocumentType=res.fileType;
        this.noticeIssued={};
      }
      if(this.actionHeading=='Notice Issued'){
        this.noticeIssued.noticeDocument=res.fileData;
        this.noticeIssued.noticeDocumentName=res.fileName;
        this.noticeIssued.noticeDocumentType=res.fileType;
        this.undertakingObtained={};
      }
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: 'Upload Successfully',
      });
      this.isUploaded=true;
      this.spinner.hide();
    }, err => {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: err.message,
      });
    });
  }
  
  download(){
    const a = document.createElement("a");
    if(this.isUndertaking){

        // To open file in browser
        // var blob = new Blob([this.undertakingObtained.underTakingDocument], { type: "application/pdf"});
        // var link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // var fileName = this.undertakingObtained.underTakingDocumentName;
        // link.download = fileName;
        // link.click();

        // to download file to system
      var response =this.base64ToArrayBuffer(this.undertakingObtained.underTakingDocument);
      let file = new Blob([response], { type: 'application/pdf' });            
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      var fileName = this.undertakingObtained.underTakingDocumentName;
      link.download = fileName;
      link.click();
    }
    if(this.isNoticeIssued){
      var response =this.base64ToArrayBuffer(this.noticeIssued.noticeDocument);
      let file = new Blob([response], { type: 'application/pdf' });            
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      var fileName = this.noticeIssued.noticeDocumentName;
      link.download = fileName;
      link.click();
    }
      
  }

  base64ToArrayBuffer(base64:any):ArrayBuffer {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  
  show(){
    this.comment='';
    let val=this.accountForm.value;
    if(!val.accountNbr){
      if(!val.panNo){
        val.panNo='PAN'
      }
      if(val.ipCode || val.panNo){
        this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW_ACCOUNTS+"?accountNbr="+''+"&ipCode="+val.ipCode+"&panNo="+val.panNo).subscribe((res) => {
          if(res){
          const ref = this.dialogService.open(AccountListComponent, { width: '70%',closable:true,data:res});
          ref.onClose.subscribe(elm=>{
            if(elm){
            this.isAccountList=true;
            this.getCreditDetails(elm.accountNbr);
            }
            else
            {
              this.isAccountList=false;
              this.submitted=true;
              this.creditDetailForm.reset();
              this.actionHeading='';
              this.isUndertaking=false;
              this.isNoticeIssued=false;
              this.isExempted=false;
            }
          })
          }
          });
        }  
    }
    else{
        this.getCreditDetails(val.accountNbr);
    }
  }

  getCreditDetails(itm){
    this.isLcbFlag=false;
    this.isUploaded=false;
    this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW_DETAILS+"?accountNbr="+itm).subscribe((res) => {
      this.isUnderTakingDownload=false;
      this.isNoticeDownload=false;
      debugger
      if(res){
       
        this.submitted=false;
        this.creditDetailForm.patchValue(res);
        this.creditDetailForm.disable();
        this.isAccountList=true;
        if(res.lcbFlag){
          this.isLcbFlag=true;
        }
        
        if(res.totalExpFlg=='<5Cr'){
          this.actionHeading='Undertaking Obtained To';
          this.isUndertaking=true;
          this.isNoticeIssued=false;
          this.isExempted=false;
          this.isRadio=false;
        }
        if(res.totalExpFlg=='5Cr-50Cr'){
          // this.actionHeading='Notice Issued';
          // this.isNoticeIssued=true;
          // this.isUndertaking=false;
          // this.isExempted=false;
          this.isRadio=true;
        }
        if(res.totalExpFlg=='>=50Cr'){
          // this.actionHeading='Exempted';
          // this.isExempted=true;
          // this.isUndertaking=false;
          // this.isNoticeIssued=false;
          this.isRadio=true;
        }
        this.submitted=true;
        
        if(this.isMaker){
              let action='FORWARDEDTOCO';
              if(this.isLcbFlag){
                action='FORWARDEDTOZO'
              }
              this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+action).subscribe((res) => {
                if(res.length>0){
                  
                for(var i=0;i<res.length;i++){
                  if(res[i]['status']=='OPEN'){
                   
                      this.submitted=true;
                      if(res[i]['underTakingDocument']){
                        this.actionHeading='Undertaking Obtained To';
                        this.isUnderTakingDownload=true;
                        this.isUndertaking=true;
                        this.isNoticeIssued=false;
                        this.isExempted=false;
                        this.undertakingObtained.underTakingDocument=res[i]['underTakingDocument'];
                        this.undertakingObtained.underTakingDocumentName=res[i]['underTakingDocumentName'];
                        this.undertakingObtained.underTakingDocumentType=res[i]['underTakingDocumentType'];

                      }
                      if(res[i]['noticeDocument']){
                        this.actionHeading='Notice Issued';
                        this.radioButtonValue='noticeIssued';
                        this.isNoticeDownload=true;
                        this.isNoticeIssued=true;
                        this.noticeIssued.noticeDocument=res[i]['noticeDocument'];
                        this.noticeIssued.noticeDocumentName=res[i]['noticeDocumentName'];
                        this.noticeIssued.noticeDocumentType=res[i]['noticeDocumentType'];
                        this.dateOfNotice=new Date((res[i].dateOfNotice));
                      }
                      if(res[i]['exemptedReason']){
                        this.actionHeading='Exempted';
                        this.isExempted=true;
                        this.isUndertaking=false;
                        this.isNoticeIssued=false;
                        this.radioButtonValue='exempted';
                        this.exemptedReason=res[i]['exemptedReason'];
                      }
                    }
                   
                    else
                    {
                      this.submitted=false;
                    }
                  }
                  
                }
                  else
                  {
                    this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'SUBMITTED').subscribe((res) => {
                      if(res.length>0){
                        this.submitted=false;
                        for(var i=0;i<res.length;i++){
                          if(res[i]['noticeDocument']){
                            this.actionHeading='Notice Issued';
                            this.radioButtonValue='noticeIssued';
                            this.isNoticeDownload=false;
                            this.isNoticeIssued=true;
                            this.isRadio=true;
                            this.noticeIssued.noticeDocument=res[i]['noticeDocument'];
                            this.noticeIssued.noticeDocumentName=res[i]['noticeDocumentName'];
                            this.noticeIssued.noticeDocumentType=res[i]['noticeDocumentType'];
                            this.dateOfNotice=new Date((res[i].dateOfNotice));
                          }
                        }
                       
                      }
                    
                      else
                      {
                        this.submitted=false;
                      }
                    })
                  
                  }
                
             
            
              });
            
           }
           if(this.isCO){
            this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'FORWARDEDTOCO').subscribe((res) => {
              if(res.length>0){
                this.isCoRes=true;
                this.isMaker=false;
                this.isZO=false;
                this.isHO=false;
                this.submitted=false;
                for(var i=0;i<res.length;i++){
                    if(res[i]['status']=='OPEN'){
                      this.comment=res[i].comment;
                      this.isCoRes=true;
                      if(res[i]['underTakingDocument']){
                        this.actionHeading='Undertaking Obtained To';
                        this.isUnderTakingDownload=true;
                        this.isUndertaking=true;
                        this.isNoticeIssued=false;
                        this.isExempted=false;
                        this.undertakingObtained.underTakingDocument=res[i]['underTakingDocument'];
                        this.undertakingObtained.underTakingDocumentName=res[i]['underTakingDocumentName'];
                        this.undertakingObtained.underTakingDocumentType=res[i]['underTakingDocumentType'];
                      }
                      if(res[i]['noticeDocument']){
                        this.radioButtonValue='noticeIssued';
                        this.actionHeading='Notice Issued';
                        this.isNoticeDownload=true;
                        this.isNoticeIssued=true;
                        this.isUndertaking=false;
                        this.isExempted=false;
                        this.noticeIssued.noticeDocument=res[i]['noticeDocument'];
                        this.noticeIssued.noticeDocumentName=res[i]['noticeDocumentName'];
                        this.noticeIssued.noticeDocumentType=res[i]['noticeDocumentType'];
                        this.dateOfNotice=new Date((res[i].dateOfNotice));
                      }
                      if(res[i]['exemptedReason']){
                        this.radioButtonValue='exempted';
                        this.actionHeading='Exempted';
                        this.isExempted=true;
                        this.isUndertaking=false;
                        this.isNoticeIssued=false;
                        this.exemptedReason=res[i]['exemptedReason'];
                      }
                   
                      this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'FORWARDEDTOZO').subscribe((res) => {
                        if(res.length>0){
                          
                          for(var i=0;i<res.length;i++){
                            if(res[i]['status']=='OPEN'){
                              this.submitted=true;
                          }
                          else
                          {
                            this.submitted=false;
                          }
                        }
                        }
                      })
                    }
                    else
                    {
                      this.isCoRes=false;
                    }
                }
              }
              else
              {
                this.isCoRes=false;
                this.submitted=false;
              }
            })

           
          }

          if(this.isZO){
            this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'FORWARDEDTOZO').subscribe((res) => {
              if(res.length>0){
                this.isZoRes=true;
                this.isMaker=false;
                this.isCoRes=false;
                this.isHoRes=false;
                this.submitted=false;
                for(var i=0;i<res.length;i++){
                  if(res[i]['status']=='OPEN'){
                    this.comment=res[0].comment;
                    this.isZoRes=true;
                      if(res[i]['underTakingDocument']){
                        this.isUnderTakingDownload=true;
                        this.actionHeading='Undertaking Obtained To';
                        this.isUndertaking=true;
                        this.isNoticeIssued=false;
                        this.isExempted=false;
                        this.undertakingObtained.underTakingDocument=res[i]['underTakingDocument'];
                        this.undertakingObtained.underTakingDocumentName=res[i]['underTakingDocumentName'];
                        this.undertakingObtained.underTakingDocumentType=res[i]['underTakingDocumentType'];
                      }
                      if(res[i]['noticeDocument']){
                        this.radioButtonValue='noticeIssued';
                        this.actionHeading='Notice Issued';
                        this.isNoticeDownload=true;
                        this.isNoticeIssued=true;
                        this.isUndertaking=false;
                        this.isExempted=false;
                        this.noticeIssued.noticeDocument=res[i]['noticeDocument'];
                        this.noticeIssued.noticeDocumentName=res[i]['noticeDocumentName'];
                        this.noticeIssued.noticeDocumentType=res[i]['noticeDocumentType'];
                        this.dateOfNotice=new Date((res[i].dateOfNotice));
                      }
                      if(res[i]['exemptedReason']){
                        this.radioButtonValue='exempted';
                        this.actionHeading='Exempted';
                        this.isExempted=true;
                        this.isUndertaking=false;
                        this.isNoticeIssued=false;
                        this.exemptedReason=res[i]['exemptedReason'];
                      }
                    
                      this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'FORWARDEDTOHO').subscribe((res) => {
                        for(var i=0;i<res.length;i++){
                          if(res[i]['status']=='OPEN'){
                            this.submitted=true;
                        }
                        else
                        {
                          this.submitted=false;
                        }
                      }
                      })
                  }
                  else
                  {
                    this.isZoRes=false;
                  }
                }
                
              }
              else
              {
                this.isZoRes=false;
                this.submitted=false;
              }
            })
          
          }
          if(this.isHO){
            this.submitted=true;
            this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'FORWARDEDTOHO').subscribe((res) => {
              if(res.length>0){
                this.isHoRes=true;
                this.isMaker=false;
                this.isCoRes=false;
                this.isZoRes=false;
                this.submitted=false;
                for(var i=0;i<res.length;i++){
                  if(res[i]['status']=='OPEN'){
                    this.comment=res[i].comment;
                    this.isHoRes=true;
                    if(res[i]['underTakingDocument']){
                      this.actionHeading='Undertaking Obtained To';
                      this.isUnderTakingDownload=true;
                      this.isUndertaking=true;
                      this.isNoticeIssued=false;
                      this.isExempted=false;
                      this.undertakingObtained.underTakingDocument=res[i]['underTakingDocument'];
                      this.undertakingObtained.underTakingDocumentName=res[i]['underTakingDocumentName'];
                      this.undertakingObtained.underTakingDocumentType=res[i]['underTakingDocumentType'];
                    }
                    if(res[i]['noticeDocument']){
                      this.radioButtonValue='noticeIssued';
                      this.actionHeading='Notice Issued';
                      this.isNoticeDownload=true;
                      this.isNoticeIssued=true;
                      this.isExempted=false;
                      this.isUndertaking=false;
                      this.isUndertaking=false;
                      this.noticeIssued.noticeDocument=res[i]['noticeDocument'];
                      this.noticeIssued.noticeDocumentName=res[i]['noticeDocumentName'];
                      this.noticeIssued.noticeDocumentType=res[i]['noticeDocumentType'];
                      this.dateOfNotice=new Date((res[i].dateOfNotice));
                    }
                    if(res[i]['exemptedReason']){
                      this.radioButtonValue='exempted';
                      this.isExempted=true;
                      this.isUndertaking=false;
                      this.isNoticeIssued=false;
                      this.actionHeading='Exempted';
                      this.exemptedReason=res[i]['exemptedReason'];
                    }
                    this.httpService.getData(PATH.GET_OPERATION_CREDIT_REVIEW+"?accountNbr="+itm+"&action="+'APPROVED').subscribe((res) => {
                      for(var i=0;i<res.length;i++){
                        if(res[i]['status']=='OPEN'){
                          this.submitted=true;
                      }
                      else
                      {
                        this.submitted=false;
                      }
                    }
                    })
                  }
                  else
                  {
                    this.isHoRes=false;
                  }  
                }   
              }
              else
              {
                this.isHoRes=false;
                this.submitted=false;
              }
            })

          
          }

      }
      else
      {
        this.creditDetailForm.reset();
        this.creditDetailForm.disable();
        this.actionHeading='';
        this.isUndertaking=false;
        this.isNoticeIssued=false;
        this.isExempted=false;
      }
    })
  }

  radioChange(){
    
    if(this.radioButtonValue=='noticeIssued'){
      this.actionHeading='Notice Issued';
      this.isNoticeIssued=true;
      this.isUndertaking=false;
      this.isExempted=false;
    }
    if(this.radioButtonValue=='exempted'){
      this.actionHeading='Exempted';
      this.isExempted=true;
      this.isUndertaking=false;
      this.isNoticeIssued=false;
    }
  }
  actionChange(){
    if(this.actions=='Undertaking Obtained To'){
      this.isUndertaking=true;
      this.isNoticeIssued=false;
      this.isExempted=false;
    }
    if(this.actions=='Notice Issued'){
      this.isNoticeIssued=true;
      this.isUndertaking=false;
      this.isExempted=false;
    }
    if(this.actions=='Exempted'){
      this.isExempted=true;
      this.isUndertaking=false;
      this.isNoticeIssued=false;
    }
  }



  confirm(val) {
    let msg;
    if (val == "SUBMITTED") {
      msg = "Are you sure that you want to perform this submit?"
    }
    if (val == "DISCARDED") {
      msg = "Are you sure that you want to perform this discard?"
    }
    if (val == "APPROVED") {
      msg = "Are you sure that you want to perform this approve?"
    }
    this.confirmationService.confirm({
      message: msg,
      accept: () => {

        if (val == "SUBMITTED") {
          let data = {
            "comment": "",
          }
        } else {
          this.submitOrAPPROVOrREJECT(val)
        }
      }
    });
  }
  submitOrAPPROVOrREJECT(input) {
    let submitFlag = true;
    if (input == "DISCARDED" && !this.comment) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Comment is required",
      });
      submitFlag = false;
    }
    let data: any =[]
    let actionBy;
    if(this.isCO){
      input=input=='APPROVED'?'FORWARDEDTOZO':'DISCARDED';
      actionBy='CO';
    }
    if(this.isZO){
      input=input=='APPROVED'?'FORWARDEDTOHO':'DISCARDED';
      actionBy='ZO';
    }  
    if(this.isHO){
      input=input=='APPROVED'?'APPROVED':'DISCARDED';
      actionBy='HO';
    }  
    let status;
    if(input=='DISCARDED'){
      status='CLOSE'
    }
    else
    {
      status='OPEN'
    }

      if(this.isUndertaking==true){
        data=[
          {accountNbr:this.creditDetailForm.value.accountNbr,action:input,actionBy:actionBy,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
          exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',underTakingDocument:this.undertakingObtained.underTakingDocument,
          underTakingDocumentName:this.undertakingObtained.underTakingDocumentName,underTakingDocumentType:this.undertakingObtained.underTakingDocumentType,comment:this.comment,status:status
          },
        ];
      }
      if(this.isNoticeIssued==true){
        data=[
          {accountNbr:this.creditDetailForm.value.accountNbr,action:input,actionBy:actionBy,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
          exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',noticeDocument:this.noticeIssued.noticeDocument,
          noticeDocumentName:this.noticeIssued.noticeDocumentName,noticeDocumentType:this.noticeIssued.noticeDocumentType,comment:this.comment,status:status
          },
        ];
      }

      if(this.isExempted==true){
        data=[
          {accountNbr:this.creditDetailForm.value.accountNbr,action:input,actionBy:actionBy,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
          exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',comment:this.comment,status:status
          },
        ];
      }
    
    
    if (submitFlag) {
         
      this.httpService.postData(data,PATH.POST_OPERATION_CREDIT_REVIEW_DETAILS).subscribe((res) => {
        this.submitted = true;
        let msg;
        if (input == "SUBMITTED") {
          msg = "Records Submited Successfully"
        }
        if (input == "DISCARDED") {
          msg = "Records DISCARDED Successfully"
          this.closeAll();
        }
        if (input == "APPROVED") {
          msg = "Records Approved Successfully"
        }
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: msg,
        });
      
      }, (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      })
    }
  }

  
  closeAll(){
  let accountNbr=this.creditDetailForm.value.accountNbr
 
  let payload={}
 
  this.httpService.updateData(null,PATH.PUT_OPERATION_CREDIT_REVIEW_STATUS+'?accountNbr='+accountNbr+'&status='+'CLOSE').subscribe((res) => {
    this.submitted=true;
    })
  }

  getUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
 }

 exemptedChange(itm){
 }

  submit(){
  let payload;
  debugger
  if(this.isMaker){

    if(this.isUndertaking==true){
      payload=[
        {accountNbr:this.creditDetailForm.value.accountNbr,action:this.isLcbFlag?'FORWARDEDTOZO':'FORWARDEDTOCO',actionBy:this.user,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
        exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',underTakingDocument:this.undertakingObtained.underTakingDocument,
        underTakingDocumentName:this.undertakingObtained.underTakingDocumentName,underTakingDocumentType:this.undertakingObtained.underTakingDocumentType,status:'OPEN'
        },
      ];
    }
    if(this.isNoticeIssued==true){
      payload=[
        {accountNbr:this.creditDetailForm.value.accountNbr,action:'SUBMITTED',actionBy:this.user,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
        exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',noticeDocument:this.noticeIssued.noticeDocument,
        noticeDocumentName:this.noticeIssued.noticeDocumentName,noticeDocumentType:this.noticeIssued.noticeDocumentType,status:'OPEN'
        },
      ];
    }
    if(this.isExempted==true){
      payload=[
        {accountNbr:this.creditDetailForm.value.accountNbr,action:this.isLcbFlag?'FORWARDEDTOZO':'FORWARDEDTOCO',actionBy:this.user,dateOfNotice:this.dateOfNotice?this.dateOfNotice:'',
        exemptedReason:this.exemptedReason?this.exemptedReason:'',exemptedRemarks:this.exemptedRemarks?this.exemptedRemarks:'',status:'OPEN',
        noticeDocument:'',noticeDocumentName:'',noticeDocumentType:''
        },
      ];
    }
  }

    if(this.isUndertaking){
       if(!this.undertakingObtained.underTakingDocument){
       this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: 'Upload File is Required',
        });
        return;
      }
     
    }
    if(this.isNoticeIssued){
      if(!this.noticeIssued.noticeDocument){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: 'Upload File is Required',
        });
        return;
      }
      if(!this.dateOfNotice){
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: 'Notice Date is Required',
        });
        return;
      }
   
    }
    if(this.isExempted){
    //  if(!this.dateOfNotice){
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Error",
    //     detail: 'Invoice Date is Required',
    //   });
    //   return;
    //  }
 
     if(!this.exemptedReason){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: 'Exempted Reason is Required',
      });
      return;
     }
    }

    if(this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          for(var i=0;i<payload.length;i++){
            var elm = payload[i];
            if(elm.dateOfNotice){
              elm.dateOfNotice=moment(elm.dateOfNotice).format('YYYY-MM-DD')
            }
          }
          
          this.httpService.updateData(payload, PATH.PUT_OPERATION_CREDIT_REVIEW_DETAILS).subscribe((res) => {
            this.submitted=true;
    
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
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
  
    if(!this.isRes){
      this.confirmationService.confirm({
        message: "Are you sure that you want to Submit?",
        accept: () => {
          for(var i=0;i<payload.length;i++){
            var elm = payload[i];
            if(elm.dateOfNotice){
              elm.dateOfNotice=moment(elm.dateOfNotice).format('YYYY-MM-DD')
            }
          }
          this.httpService.postData(payload, PATH.POST_OPERATION_CREDIT_REVIEW_DETAILS).subscribe((res) => {
            this.submitted=true;
            this.isRes=true;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Submitted Successfully",
            });
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
  
  }




}