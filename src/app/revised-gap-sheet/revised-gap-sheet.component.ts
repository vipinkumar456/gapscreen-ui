import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { timeStamp } from 'console';
import { HttpService } from "../services/http.service";
import { PATH } from "../app.constants";
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { data } from './analytic.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
import { importType, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConfirmationService } from "primeng/api";
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-revised-gap-sheet',
  templateUrl: './revised-gap-sheet.component.html',
  styleUrls: ['./revised-gap-sheet.component.scss']
})
export class RevisedGapSheetComponent implements OnInit {

  
  tableNames: Array<any> = [];
  data = new data()
  dataArray: any = [];
  leadRefNo:any;
  submitted:boolean=false;
  contactedMode;
  response;
  interested;
  customerRemark;
  leadStatus;
  productSoldConversation;
  user: any;
  date = new Date();
  maxDateValue= new Date();
  leadSheetForm: FormGroup;
  minDate = new Date();
  leadNo:any;
  isDate:boolean=false;
  isRes:any;
  status:any;
  roles: Array<any> = [];
  role: any = {};
  isChecker: boolean = false;
  isMaker: boolean = false;
  comment: any;
  isFollowUp:boolean=false;
  productOfferList:any;
  productOffer:any;
  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private httpService: HttpService,
              private datePipe:DatePipe,
              private confirmationService: ConfirmationService,
              private roleAuthGuard:RoleAuthGuardService) { }
  
    ngOnInit(): void {
      this.roleAuthGuard.canActivate();
      if (sessionStorage.getItem("gapRoles")) {
        this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
        this.getRoles()
      }
  
      if (this.role.ROLE_ANALYTICAL_LEADS) {
        this.isMaker = true;
        this.submitted=true;
        this.isFollowUp=true;
      }
  
      // if (this.role.ROLE_ANALYTICAL_LEADS_CHECKER) {
      //   this.isChecker = true;
      //   this.submitted=true;
      // }
      
      this.getUser();
      this.prepareTable();
      this.prepareGapSheetForm();
      
      // this.setDates();
    }


    prepareTable(){
      this.tableNames = [
        { name: "Contacted Mode"},
        { name: "Contacted On Date & Time"},
        { name: "Response"},
        { name: "Interested"},
        { name: "Customer Remark"},
        { name: "Lead Status"},
        { name: "Product Sold (On Conversation)"},
        { name: "Amount (On Conversation)"},
        { name: "Entered By"},
        { name: "Date"},
        // { name: ""},
      ]
    }

    prepareGapSheetForm(){
      this.leadSheetForm = this.fb.group({
        leadSRN: [''],
        productOffered:[''],
        leadSharedDate:[''],
        zoneName:[''],
        circle:[''],
        branchSolId:[''],
        branch:[''],
        customerName:[''],
        custId:[''],
        accNumber:[''],
        mobileNo:[''],
        digitallyActive:[''],
        age:[],
        occupation:[''],
        qabMaintained:[''],
        rltnWithBank:[''],
        numberOfInvestemnt:[''],
        invstPnbPrd:[''],
        invstThirdPrd:[''],
        areacategory:[''],
        email:[''],
      })
    }

    
    setDates(itm,index){
      let today: Date = new Date();
      let currentYear: number = today.getFullYear();
      let currentMonth: number = today.getMonth();
      let currentDay: number = today.getDate();
      // if(itm.contactedMode=='CALL'){
      //   itm.minDate = new Date(currentYear, currentMonth, currentDay-3);
      // }
      // else
      // {
        if(index!=null){
          if(index==0 || index ==1){
            let today: Date = new Date(this.dataArray[0].contactedOnDate);
            let currentYear: number = today.getFullYear();
            let currentMonth: number = today.getMonth();
            let currentDay: number = today.getDate();
          
              if(this.dataArray[1]){
                this.dataArray[1].minDate=new Date(currentYear, currentMonth, currentDay+1); 
              }
         
          }
         if(index ==1 || index==2){
          let today: Date = new Date(this.dataArray[1].contactedOnDate);
          let currentYear: number = today.getFullYear();
          let currentMonth: number = today.getMonth();
          let currentDay: number = today.getDate();
        
            if(this.dataArray[2]){
              this.dataArray[2].minDate = new Date(currentYear, currentMonth, currentDay+1);
            }
       
         }
        }
    }

   
    getLeadsNo(){
      this.dataArray=[];
      this.leadSheetForm.reset();
      this.httpService.getData(PATH.LEADS_SRN_DROPDOWN+"?productOffered="+this.productOffer+"&userId="+this.user).subscribe((res) => {
        this.leadRefNo=res;
        this.leadRefNo=res.map(elm=> {return {label:elm,value:elm}})
       });
    }

    getProductOffered(){
      this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+"/"+'PRODUCT_OFFERED').subscribe((res) => {
        this.productOfferList=res;
        this.productOfferList=res.map(elm=> {return {label:elm.value,value:elm.value}})
       });

       this.getProductSoldConversion();
    }

    getProductSoldConversion(){
      this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+"/"+'PRODUCT_SOLD_ON_CONVERSION').subscribe((res) => {
        this.productSoldConversation=res.map(elm=> {return {label:elm.value,value:elm.value}})
       });
    }

    leadChange(){
      this.dataArray=[];
      this.leadSheetForm.reset();
    }
  

    getTableLeads(){
        if(this.isMaker){
        
        this.httpService.getData(PATH.GET_LEADS+"?leadSRN="+this.leadNo+'&status='+'REJECTED').subscribe((res) => {
            if(res.length>0){
              this.status=res[0].status;
              this.submitted=false;
              this.MakerTableLeadCall('REJECTED');
            }
            else
            {
              this.MakerTableLeadCall('SUBMITTED');
              this.submitted=true;
            }
         })    
        }

        if(this.isChecker){
          this.submitted=true;
          this.status="SUBMITTED"
          this.httpService.getData(PATH.GET_LEADS+"?leadSRN="+this.leadNo+'&status='+this.status).subscribe((res) => {
            if(res.length>0)
            {
              this.submitted=false;
              this.dataArray=res;
              for(var i=0;i<this.dataArray.length;i++){
                this.getDropdowns('CONTACTED_MODE',i);
                this.dataArray[i]['contactedOnDate']=new Date(res[i]['contactedOnDate']);
                this.dataArray[i]['createdDate']=  moment(res[i].createdDate).format('DD-MM-YYYY');
                this.dataArray[i].leadStatusList=[
                  {type:'OPEN',value:'OPEN'},{type:'OPEN',value:'CANCELLED'},{type:'OPEN',value:'IN PROCESS'},{type:'OPEN',value:'SANCTIONED'}
                ]
                if(this.dataArray[i].response){
                  this.change(this.dataArray[i],'response',null);
                }
                if(this.dataArray[i].interested){
                  this.change(this.dataArray[i],'interested',null);
                }
              this.dataArray[i]['createdBy']=res[i]['createdBy'];
              this.dataArray[i]['createdDate']=res[i]['createdDate'];
                
              }
              this.isRes=true;
            }
            else
            {
              this.dataArray=[];
            }
           });
        }
      }

     MakerTableLeadCall(status){
      this.httpService.getData(PATH.GET_LEADS+"?leadSRN="+this.leadNo+'&status='+status).subscribe((res) => {
        if(res.length>0)
        {
          this.dataArray=res;
          for(var i=0;i<this.dataArray.length;i++){
            this.getDropdowns('CONTACTED_MODE',i);
            this.dataArray[i]['contactedOnDate']=new Date(res[i]['contactedOnDate']);
            this.dataArray[i]['createdDate']=  moment(res[i].createdDate).format('DD-MM-YYYY');
            this.dataArray[i]['submitted']=true;
            this.dataArray[i].leadStatusList=[
              {type:'OPEN',value:'OPEN'},{type:'OPEN',value:'CANCELLED'},{type:'OPEN',value:'IN PROCESS'},{type:'OPEN',value:'SANCTIONED'}
            ]
            if(this.dataArray[i].response){
              this.change(this.dataArray[i],'response',null);
            }
            if(this.dataArray[i].interested){
              this.change(this.dataArray[i],'interested',null);
            }
            if(this.dataArray[i].interested){
              this.change(this.dataArray[i],'customerRemark',null);
            }
          this.dataArray[i]['createdBy']=res[i]['createdBy'];
          this.dataArray[i]['createdDate']=res[i]['createdDate'];
            
          }
          this.isRes=true;
           
          if(res.length==3){
            this.isFollowUp=true;
          }
          else if(res[0]['leadStatus']=='CANCELLED' || res[0]['leadStatus']=='SANCTIONED'){
            this.isFollowUp=true;
            this.submitted=true;
          }
          else if(res[1]['leadStatus']=='CANCELLED' || res[1]['leadStatus']=='SANCTIONED'){
            this.isFollowUp=true;
            this.submitted=true;
          }
          else
          {
            this.isFollowUp=false;
          }
        }
        else
        {
          this.pushNewRowData();
        
          this.isRes=false;
        }
       });
     }

    getDropdowns(type,number){
     
      this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+'/'+type).subscribe((res) => {
        if(type=='CONTACTED_MODE'){
          this.dataArray[number]['contactedModeList']=res;
        }
       });
       this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+'/'+'CALL_PERSONAL_VISIT').subscribe((res) => {
        if(type=='CONTACTED_MODE'){
          this.dataArray[number]['responseList']=res;
        }
       });
    }

  change(itm,type,index){
      let val;
      itm.productSoldConversation=this.productSoldConversation
      
      // if(type!='leadStatus'){
      //   if(itm.leadStatusList.length!>0){
      //     itm.leadStatusList=[
      //       {type:'OPEN',value:'OPEN'},{type:'OPEN',value:'CANCELLED'},{type:'OPEN',value:'IN PROCESS'},{type:'OPEN',value:'SANCTIONED'}
      //     ]
      //   }
      // }
      if(type=='customerRemark'){
        itm.leadStatusList=[];
        if(itm.customerRemark!='SANCTIONED'){
          itm.productSoldConversation=[];
        }
      }
      if(itm.contactedMode || itm.contactedOnDate){
       this.setDates(itm,index);
      }
      
      if(itm.leadStatus){
        this.isFollowUp=false;
        if(itm.leadStatus!='SANCTIONED')
        {
          itm.productSold='';
          itm.amount='';
          
        }
        if(itm.leadStatus=='SANCTIONED' || itm.leadStatus=='CANCELLED')
        {
          this.isFollowUp=true;
        }
      }
     
      if(type=='response'){
        itm.leadStatusList=[];
        if(itm.response=='AVAILABLE'){
          val='CALL_PERSONAL_VISIT_AVAILABLE';
        }
        else
        {
          val='CALL_PERSONAL_VISIT_NOT_AVAILABLE';
        } 
      }
      if(type=='interested'){
        itm.leadStatusList=[];
        itm.customerRemarkList=[];
        if(itm.interested=='INTERESTED')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED';
        }
        if(itm.interested=='Not INTERESTED'){
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED';
        }
        if(itm.interested=='MAY BE LATER'){
          val='CALL_PERSONAL_VISIT_AVAILABLE_MAY_BE_LATER';
        }
      }

      if(type=='customerRemark'){

        // call personal visit available interested

        if(itm.customerRemark=='DOCUMENTS AWAITED')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_DOCUMENTS_AWAITED';
        }
        if(itm.customerRemark=='ON HOLD AS PER CUSTOMER REQUEST')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_ON_HOLD_AS_PER_CUSTOMER_REQUEST';
        }
        if(itm.customerRemark=='PENDING FOR BRANCH VISIT')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_PENDING_FOR_BRANCH_VISIT';
        }
        if(itm.customerRemark=='SANCTIONED')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_SANCTIONED';
        }
        if(itm.customerRemark=='TO BE FOLLOWED UP')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_TO_BE_FOLLOWED_UP';
        }

        // call personal visit available may be later

        if(itm.customerRemark=='POSTPONEMENT')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_MAY_BE_LATER_POSTPONEMENT';
        }

        // call personal visit available not interested

        if(itm.customerRemark=='ALREADY AVAILED PRODUCT FROM PNB')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_ALREADY_AVAILED_PRODUCT_FROM_PNB';
        }
        if(itm.customerRemark=='CUSTOMER NOT INTERESTED')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_CUSTOMER_NOT_INTERESTED';
        }
        if(itm.customerRemark=='CUSTOMER PREFER PRODUCT FROM OTHER BANK/FI')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_CUSTOMER_PREFER_PRODUCT_FROM_OTHER_BANK_OR_FI';
        }
        if(itm.customerRemark=='FUNDS NOT AVAILABLE')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_FUNDS_NOT_AVAILABLE';
        }
        if(itm.customerRemark=='LACK OF UNDERSTANDING OF CUSTOMER')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_LACK_OF_UNDERSTANDING_OF_CUSTOMER';
        }
        if(itm.customerRemark=='MOVE TO COMPETITORS')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_MOVE_TO_COMPETITORS';
        }
        if(itm.customerRemark=='NOT ELIGIBLE')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_NOT_ELIGIBLE';
        }
        if(itm.customerRemark=='POSTPONEMENT')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_POSTPONEMENT';
        }
        if(itm.customerRemark=='UNACCEPTABLE TERMS & CONDITION')
        {
          val='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_UNACCEPTABLE_TERMS_&_CONDITION';
        }

      }

      if(type=='contactedMode'){
        if(itm.response){
          if(itm.response=='AVAILABLE'){
            val='CALL_PERSONAL_VISIT_AVAILABLE';
          }
          else
          {
            val='CALL_PERSONAL_VISIT_NOT_AVAILABLE';
          } 
        }
      }
      if(val){
        this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+'/'+val).subscribe((res) => {
       
          if(val=='CALL_PERSONAL_VISIT_AVAILABLE'){
            itm.interestedList=res;
            itm.isAttemptThree=true;
            if(itm.customerRemark=='CUSTOMER WAS UNAVAILABLE' || itm.customerRemark=='NO IS WRONG/NOT REACHABLE'){
              itm.customerRemark='';
              itm.customerRemarkList=[];
            }
            // itm.customerRemarkList=[];
            // itm.customerRemark='';
          }
          if(val=='CALL_PERSONAL_VISIT_NOT_AVAILABLE'){
            itm.interested='';
            itm.productSold='';
            itm.amount='';
            itm.interestedList=[];
            itm.isAttemptThree=false;
            let count;
            if(itm.contactedMode=='PERSONAL VISIT' || itm.contactedMode=='PERSONAL  VISIT'){
              itm.isAttemptThree=true;
              itm.customerRemark='';
              itm.customerRemarkList=[];
              itm.customerRemarkList=[{type:'customerUnavailable',value:'CUSTOMER WAS UNAVAILABLE'}];
              itm.customerRemark='CUSTOMER WAS UNAVAILABLE';
              this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+'/'+'PERSONAL_VISIT_NOT_AVAILABLE_CONTENT_NOT_ENABLED_CUSTOMER_WAS_UNAVAILABLE').subscribe((res) => {
                itm.leadStatusList=res;
              });
            }
            else
            {
              itm.customerRemarkList=[];
              itm.customerRemark='';
              let count=0;
              itm.leadStatusList=[{type: "CALL_NOT_AVAILABLE_CONTENT_NOT_ENABLED_NO_IS_WRONG_OR_NOT_REACHABLE",
              value: "OPEN"}]
              // this.httpService.getData(PATH.GET_LEADS_DROPDOWNS+'/'+'CALL_NOT_AVAILABLE_CONTENT_NOT_ENABLED_CONTENT_NOT_ENABLED').subscribe((res) => {
              //   itm.leadStatusList=res;
              // });
              for(var i=0;i<this.dataArray.length;i++){
                if(this.dataArray[i].response=='NOT AVAILABLE' && this.dataArray[i].contactedMode=='CALL'){
                  count=count+1;
                }
                if(count==3){
                  this.dataArray[i]['customerRemarkList']=[{type:'attemptThree',value:'NO IS WRONG/NOT REACHABLE'}];
                  this.dataArray[i]['customerRemark']='NO IS WRONG/NOT REACHABLE';
                  this.dataArray[i]['isAttemptThree']=true;
                  this.dataArray[i]['leadStatusList']=[{type: "CALL_NOT_AVAILABLE_CONTENT_NOT_ENABLED_NO_IS_WRONG_OR_NOT_REACHABLE",
                  value: "CANCELLED"}]
                  // itm.customerRemarkList=[{type:'attemptThree',value:'NO IS WRONG/NOT REACHABLE'}];
                  // itm.customerRemark='NO IS WRONG/NOT REACHABLE';
                  // itm.isAttemptThree=true;
                }
                else
                {
                  itm.customerRemark='';
                  itm.customerRemarkList=[];
                  
                }
            }    
            } 
          }
          if(val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED'){
            itm.customerRemarkList=res;
          }
          if(val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED'){
            // itm.customerRemark='';
            itm.customerRemarkList=res;
            // itm.productSold='';
            // itm.amount='';
          }
          if(val=='CALL_PERSONAL_VISIT_AVAILABLE_MAY_BE_LATER'){
            itm.customerRemarkList=res;
            // itm.customerRemark='POSTPONEMENT';
          }
          if(val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_DOCUMENTS_AWAITED' || val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_ON_HOLD_AS_PER_CUSTOMER_REQUEST' || val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_PENDING_FOR_BRANCH_VISIT' || val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_SANCTIONED' || val=='CALL_PERSONAL_VISIT_AVAILABLE_INTERESTED_TO_BE_FOLLOWED_UP' ||
             val=='CALL_PERSONAL_VISIT_AVAILABLE_MAY_BE_LATER_POSTPONEMENT' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_ALREADY_AVAILED_PRODUCT_FROM_PNB' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_CUSTOMER_NOT_INTERESTED' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_CUSTOMER_PREFER_PRODUCT_FROM_OTHER_BANK_OR_FI' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_FUNDS_NOT_AVAILABLE' ||
             val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_LACK_OF_UNDERSTANDING_OF_CUSTOMER' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_MOVE_TO_COMPETITORS' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_NOT_ELIGIBLE' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_POSTPONEMENT' || val=='CALL_PERSONAL_VISIT_AVAILABLE_NOT_INTERESTED_UNACCEPTABLE_TERMS_&_CONDITION'){
            
              itm.leadStatusList=res;
          }
       
         });
      }
     

      // itm.isInterested=true;
      // itm.isProductSold=true;
      // itm.isAmount=true;
      // if(itm.contactedMode && itm.response){
      //   if(itm.response=='NOT AVAILABLE'){
      //     itm.isInterested=false;
      //     itm.isProductSold=false;
      //     itm.isAmount=false;
      //   }
      // }
      //   if(itm.contactedMode && itm.response){
      //     if(itm.contactedMode=='Personal Visit' && itm.response=='Not Available'){
      //       itm.isInterested=false;
      //       itm.isProductSold=false;
      //       itm.isAmount=false;
      //       itm.interested='';
      //     }
      //   }
      // }
    }

    getRecords(){
     
      this.dataArray=[];
      this.leadSheetForm.reset();
      if(this.leadNo){
        this.httpService.getData(PATH.LEADS_INFO+'?leadSRN='+this.leadNo).subscribe((res) => {
          this.leadSheetForm.patchValue(res);
          this.leadSheetForm.disable();
         });
         
        // this.getTableLeads();
        this.MakerTableLeadCall('SUBMITTED');
      }
    }

    add() {
      if (this.dataArray.length < 3) {
       this.pushNewRowData();
      }
      else {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Only 3 Follow up are allowed!",
        });
  
      }
    }


  getUser() {
      this.httpService.getData(PATH.GET_USER).subscribe((res) => {
        this.user = res.userName;
        // this.getLeadsNo();
        this.getProductOffered();
        });
   }

    removeForm(val) {
      const index: number = this.dataArray.indexOf(val);
      this.dataArray.splice(index, 1);
    }

    pushNewRowData() {
      this.submitted=false;
      this.isFollowUp=false;
      let number=0;
      for(var i=0;i<this.dataArray.length;i++){
        number=i+1;
      }
      
      this.getDropdowns('CONTACTED_MODE',number);
      console.log(number);
        var date = new Date();  
        this.data=new data();
        this.dataArray.push(this.data);
    }


    dateChange(itm){
     
      if(itm.contactedOnDate){
        itm.contactedOnDate=this.datePipe.transform((itm.contactedOnDate), 'yyyy-MM-dd, h:mm a');
     
      }
      console.log(itm)
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
      if (input == "REJECTED" && !this.comment) {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: "Comment is required",
        });
        submitFlag = false;
      }
      let data: any = this.dataArray
      data.forEach((el) => {
        el.status = input;
        el.comment=this.comment;
      })
      if (submitFlag) {
  
        this.httpService.postData(data,PATH.LEADS_SUBMIT).subscribe((res) => {
          this.submitted = true;
          this.isFollowUp=false;
          let msg;
          if (input == "SUBMITTED") {
            msg = "Records Submited Successfully"
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
          // if(this.isMaker){
          //   this.getData(input);
          // }
          if(this.isChecker){
            this.getRecords();
          }
        }, (err) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
        })
      }
    }

    submit(){
      console.log(this.dataArray);
      
      // this.dataArray.forEach(elm=>{
      for(var i=0;i<this.dataArray.length;i++){
        var elm = this.dataArray[i];
        // if(elm.contactedOnDate){
        //   elm.contactedOnDate=moment(elm.contactedOnDate).format('YYYY-MM-DD')
        // }
        this.dataArray[i]['status']='SUBMITTED';
        
        this.dataArray[i]['leadAttemptNo']=i+1;
        elm.leadSRN=this.leadNo;
        if(!elm.contactedMode){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Contact Mode is required",
          });
          return;
        }
        if(!elm.contactedOnDate){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Contact on Date is required",
          });
          return;
        }
        if(!elm.response){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Response is required",
          });
          return;
        }
     
          if(elm.response=='AVAILABLE'){
            if(!elm.interested){
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "Interested is required",
              });
              return;
            }
          }
      
     
        if(elm.interested){
          if(!elm.customerRemark){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Customer Remark is required",
            }); 
          return;
          }
        }
        if(!elm.leadStatus){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Lead Status is required",
          });
          return;
        }

        if(elm.leadStatus=='SANCTIONED' && elm.customerRemark=='SANCTIONED'){
          if(!elm.productSold){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Product Sold is required",
            });
            return;
          }
          if(!elm.amount){
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Amount on Conversation is required",
            });
            return;
          }
        }
        else
        {
          elm.amount='';
          elm.productSold='';
        }
       
        
        if(!elm.contactedOnDate){
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Contact on Date is required",
          });
          return 
        }
      }

    let payload;
      payload=this.dataArray;
      if(this.isRes){
        this.confirmationService.confirm({
          message: "Are you sure that you want to Submit?",
          accept: () => {
            for(var i=0;i<payload.length;i++){
              var elm = this.dataArray[i];
              elm.submitted=true;
              if(elm.contactedOnDate){
                elm.contactedOnDate=moment(elm.contactedOnDate).format('YYYY-MM-DD')
              }
            }
            this.httpService.updateData(payload, PATH.LEADS_SUBMIT).subscribe((res) => {
              this.submitted=true;
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              // this.MakerTableLeadCall('SUBMITTED');
              this.isFollowUp=true;
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
              var elm = this.dataArray[i];
              elm.submitted=true;
              if(elm.contactedOnDate){
                elm.contactedOnDate=moment(elm.contactedOnDate).format('YYYY-MM-DD')
              }
            }
            this.httpService.postData(payload, PATH.LEADS_SUBMIT).subscribe((res) => {
              this.submitted=true;
              this.isRes=true;
              this.isFollowUp=true;
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "Submitted Successfully",
              });
              // this.MakerTableLeadCall('SUBMITTED');
              
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
    }
  }