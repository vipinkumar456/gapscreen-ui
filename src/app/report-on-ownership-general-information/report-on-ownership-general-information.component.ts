import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router'
import { $ } from 'protractor';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-report-on-ownership-general-information',
  templateUrl: './report-on-ownership-general-information.component.html',
  styleUrls: ['./report-on-ownership-general-information.component.scss']
})
export class ReportOnOwnershipGeneralInformationComponent implements OnInit {
  generalinformationForm:FormGroup;
  heading;
  generalinformationFlag:boolean=true;
  section1Flag:boolean=false;
  generalinfoData:any;
  date:string;
  checkValidation:boolean=false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService
  ) { }

  ngOnInit(): void {
    this.roleAuthGuard.canActivate();
    this.heading="Report On Ownership General Information";
    this.preparegeneralinformationForm();

    
  }
  preparegeneralinformationForm()
  {
    this.generalinformationForm=this.fb.group({
      returnName:['',Validators.required],
      returnCode:['',Validators.required],
      reportingInstitution:['',Validators.required],
      bankCode:['',Validators.required],
      address:['',Validators.required],
      quarterEnded:['',Validators.required],
      reportingFrequency:['',Validators.required],
      dateOfReport:['',Validators.required],
      status:['',Validators.required],
      dateOfAudit:['',Validators.required],
      validationStatus:['',Validators.required],
      returnVersion:['',Validators.required],
      generalRemarks:['',Validators.required],
    })
  }
  get f(){
    return this.generalinformationForm.controls
  }
 
  gotoSection()
  {
    this.generalinformationForm.markAllAsTouched();
    
    this.generalinfoData=this.generalinformationForm.value;
     if (this.generalinformationForm.invalid) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Please Validate Ownership Form",
      });
         return true;
    }
    window.localStorage.setItem('generalinfodata',JSON.stringify(this.generalinfoData));
    console.log(this.generalinfoData);
    this.generalinformationFlag=false;
    this.section1Flag=true;
  }

  getSection1(event)
  {
    console.log(event);
    if(event=='section1')
    {
      this.generalinformationFlag=true;
      this.section1Flag=false;
    }
    if(event=='SUBMITTED')
    {
      this.generalinformationForm.markAsUntouched();
      this.preparegeneralinformationForm();
      this.generalinformationFlag=true;
      this.section1Flag=false;
    }
  }
  
}
