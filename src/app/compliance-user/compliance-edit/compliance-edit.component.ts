import { HttpErrorResponse } from "@angular/common/http";
import { Route } from "@angular/compiler/src/core";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { UserForm } from "src/app/forms/user.form";
import { multiEmail } from "src/app/services/custom.validation";
import { HttpService } from "src/app/services/http.service";
import { PATH } from "../../app.constants";
@Component({
  selector: "app-compliance-edit",
  templateUrl: "./compliance-edit.component.html",
  styleUrls: ["./compliance-edit.component.scss"],
})
export class ComplianceEditComponent implements OnInit {
  users: Array<any> = [];
  reportForm: FormGroup;
  availableUsers: Array<any> = [];
  username: string = "";
  disabled: boolean = false;
  currentRoute: string = "";
  
  @Input() compUpdateType:any;
  @Input() reportId:any;
  @Output() updateComplience=new EventEmitter<any>();

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router
  ) {  }

  ngOnInit(): void {
    this.getAllUsers();
    this.prepareForm();
    this.primengConfig.ripple = true;
    this.getSingleRecord();
  }

  prepareForm(){
    this.reportForm = this.fb.group({
      "division" : [""],
      "assigneeUsername" : ["",[Validators.required]],
      "escalationMailers" : ["",[Validators.required, multiEmail]],
      "escalationDays" : ["",[Validators.required]],
      "reminderDays" : ["",[Validators.required]],
      "reviewMailers" : ["",[Validators.required, multiEmail]],
      "reportType" : [""],
      "reportName" : [""]
    })
  }

  get f(){
    return this.reportForm.controls
  }
 
  getSingleRecord() {   
    // console.log()
    this.httpService   
      .getData(PATH.COMPLIANCE_GET_SINGLE_RECORD + "?reportId="+this.reportId)
      .subscribe((res) => {
        // console.log(res)
        this.reportForm.patchValue({
          reportId : res.report_Id,
          division : res.division,
          assigneeUsername : res.assigneeUsername,
          escalationMailers : res.escalationMailers,
          escalationDays : res.escalationDays ,
          reminderDays : res.reminderDays,
          reviewMailers : res.reviewMailers,
          reportType : res.reportType,
          reportName : res.reportName
        })
        // this.userForm.controls["reportId"].setValue(reportId);
      });
  }
  saveUser() {
    let dt = this.reportForm.getRawValue();
    if(this.compUpdateType=='division'){
      dt.reportName = "";
      dt.reportType = "";
    }
   
    this.reportForm.markAllAsTouched();
    if (this.reportForm.invalid) {
      return true;
    }
    // if (this.currentRoute == "add") {
      // console.log('1');
      this.httpService.updateData(dt, PATH.COMPLIANCE_POST_SUBMIT).subscribe(
        (res) => {
          this.reportForm.patchValue(res);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Edited Successfully",
          });
          this.goBack(res);
          this.router.navigate(["compliance-adminPanel", "all"]);
          this.getSingleRecord();
        },(err:HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: err.message,
          });
        }
      );
    // }  
  }
  getAllUsers() {
    this.httpService.getData(PATH.COMPLIENCE_USERS+'/?role='+'ROLE_COMPLIANCE').subscribe((res:any) => {
      // console.log(res)
      this.users = res;
    });
  }
  getLoginUser() {
    this.httpService.getData(PATH.GET_USER).subscribe((res) => {
      this.reportForm.patchValue(res);
      // sessionStorage.setItem('ssoRoles', JSON.stringify(res['roles']))
    });
  }


  goBack(data){
    this.updateComplience.emit(data)
  }

}
