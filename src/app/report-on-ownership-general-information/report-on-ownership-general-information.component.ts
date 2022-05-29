import { Component, OnDestroy, OnInit,HostListener} from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from "primeng/api";
import { HttpService } from '../services/http.service';
import { ActivatedRoute,Router } from '@angular/router'
import { $ } from 'protractor';
import { RoleAuthGuardService } from '../role-auth-guard.service';
import { PATH } from "../app.constants";

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
  uri: string = "";
  isMaker: boolean = false;
  isChecker: boolean = false;
  rejectedFlag: boolean = false;
  isView: boolean = false;
  dateofAudit;
  dateofReport;
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router,
    private roleAuthGuard:RoleAuthGuardService
  ) { }
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    let result = confirm("Changes you made may not be saved.");
    if (result) {
      // Do more processing...
    }
    event.returnValue = false; // stay on same page
  }

  ngOnInit(): void {
    this.heading="DSB VII Report On Ownership and control";
    this.route.params.subscribe((res) => {
      if (res.type == 'view') {
        this.isView = true;
        this.isMaker = true;
        this.getOwnershipRecordsbyId(res.id);
      }
      if (res.type == 'Approve/Reject') {
        this.isChecker = true;
        this.getOwnershipRecordsbyId(res.id);
      }
      if (res.id) {

      }
    })
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
      this.router.navigate(["report-on-ownership-view"]);

      this.section1Flag=false;
    }
  }

  
  getOwnershipRecordsbyId(id){
    this.uri = PATH.OWNERSHIPREPORTS_ID+id;
    let branch = this.httpService.getData(this.uri);
    branch.subscribe((res) => {
      this.generalinformationForm.patchValue(res);
      this.generalinformationForm.disable();
      console.log(res.dateOfAudit);
      this.dateofReport=res.dateofReport;
      // this.generalinformationForm.patchValue({
      //   dateOfReport:res.dateOfAudit
      // })
    
     
          console.log(res);
        }, err => {
          this.messageService.add({
            severity:"error",
            summary:"Error",
            detail:err.message
          })
      });
  }
  
}
