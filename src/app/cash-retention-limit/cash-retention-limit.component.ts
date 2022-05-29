import { RoleAuthGuardService } from './../role-auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { PATH } from "../app.constants";
import { HttpService } from "../services/http.service";
import { Validators } from "@angular/forms";
@Component({
  selector: 'app-cash-retention-limit',
  templateUrl: './cash-retention-limit.component.html',
  styleUrls: ['./cash-retention-limit.component.scss']
})
export class CashRetentionLimitComponent implements OnInit {

  user: any;
  heading: string;
  roles: Array<any> = [];
  role: any = {};
  isChecker: boolean = false;
  isMaker: boolean = false;
  bCode:any=[];
  Currency:any=[];
  bName:any=[];
  bracnchCodeForm: FormGroup;
  CurrencyForm:FormGroup;
  data:any;
  branchName:any;
  submitted:boolean=true;
  submittedRecords: Array<any> = [];

  constructor( 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private roleAuthGuard:RoleAuthGuardService,
    private fb: FormBuilder,) { }



    public cashForm=this.fb.group({
      branchCode:["",[Validators.required]],
      branchName:["",[Validators.required]],
      cashRetentionLimit:["",[Validators.required]],
      currencyChestSolid:["",[Validators.required]],
      currencyChestName:[""],
      distanceWithCurrencyChest:["",Validators.required],
    })



  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading = "Cash Retention";
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.user = res.userName;
      });
  if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }

    this.getBranchCode();
  }


  getBranchCode(){
    this.httpService.getData(PATH.BRANCH_DROPDOWN_CASH_RETENTION_LIMIT).subscribe((res) => {
        this.bCode=res;
        this.bCode=res.map(elm=> {return {label:elm,value:elm}})
    });   
    this.httpService.getData(PATH.CURRENCY_DROPDOWN_RETENTION_LIMIT).subscribe((res) => {
      this.Currency=res;
      this.Currency=res.map(elm=> {return {label:elm,value:elm}})
  });
  // this.submitted = false
  }



  getBranchName(code){
    this.cashForm.patchValue({ branchCode: code.value });

    this.httpService.getData(PATH.BRANCH_NAME_CASH_RETENTION_LIMIT +"?branchCode=" + code.value).subscribe((res) => {
    res.forEach(element => {
      this.branchName = element;      
    });
      this.cashForm.patchValue({ branchName: this.branchName });
});
    this.getData(code);
}

  getCurrencyName(code){
    this.cashForm.patchValue({ chestSolid : code.value });

    this.httpService.getData(PATH.CURRENCY_NAME_RETENTION_LIMIT +"?branchCode=" + code.value).subscribe((res) => {
      res.forEach(element => {
            this.data = element; 
      });
      this.cashForm.patchValue({ currencyChestName: this.data });

});
  }


  submit(submit){

    let data:any  = [{
      "branchCode": this.cashForm.get(['branchCode']).value,
      "branchName": this.cashForm.get(['branchName']).value,
      "cashRetentionLimit": this.cashForm.get(['cashRetentionLimit']).value,
      "currencyChestName": this.cashForm.get(['currencyChestName']).value,
      "currencyChestSolid": this.cashForm.get(['currencyChestSolid']).value,
      "distanceWithCurrencyChest": this.cashForm.get(['distanceWithCurrencyChest']).value,
      }]
      console.log('data',data);   
      
    this.confirmationService.confirm({
      message: "Are you sure that you want to Submit?",
      accept: () => {
        var uri = PATH.POST_CASH_RETENTION_LIMIT;
          this.httpService.postData(data, uri).subscribe(
              (res) => {
                console.log('res',res);
                
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
              }
            );
       
      }
    });
 
  }


getData(val){
 this.httpService.getData(PATH.GET_CASH_RETENTION_LIMIT +"?branchCode=" +  val.value).subscribe((res) => {
res.forEach(element => {
  this.cashForm.patchValue({
    cashRetentionLimit:element.cashRetentionLimit,
    currencyChestName: element.currencyChestName,
    currencyChestSolid: element.currencyChestSolid,
    distanceWithCurrencyChest:element.distanceWithCurrencyChest 
  })
  
});
  
});

}
 

  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }
}
