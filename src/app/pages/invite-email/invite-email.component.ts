import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH } from 'src/app/app.constant';
import { SuccessDialogComponent } from 'src/app/components';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { businessEmail, ConfirmedValidator, email } from 'src/app/services/custom.validations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-email',
  templateUrl: './invite-email.component.html',
  styleUrls: ['./invite-email.component.scss']
})
export class InviteEmailComponent implements OnInit {

  state:any;
  @ViewChild('file') fileInput: ElementRef;
  public countries = Country.getAllCountries();
  error:boolean=false;
  errorMsg:string="";
  formSubmitAttempt:boolean=false;
  verificationCode:string;
  userDetails:any;
  companyNameVerificationCode:string;
  companyNameDetails:any;
  customerNameVerificationCode:string;
  customerNameDetails:any;
  password='password';
  show:boolean = false;
  reTypepassword='password';
  showReType:boolean = false;
  type;

  constructor(private route: ActivatedRoute,
              private formBuilder:FormBuilder,
              private httpService:HttpService,
              private toastrService:ToastrService,
              private spinnerService:NgxSpinnerService,
              private modalService:NgbModal,
              private appCookieService:AppCookieService,
              private router:Router) { }

  public registerForm=this.formBuilder.group({
      referredBy:[""],
      emailId:[""],
      phoneNumber:[""],
      firstName:[""],
      lastName:[""],
      name:[""],
      password:["",Validators.required],
      retypePassword:["",Validators.required]
    },{
      validator:ConfirmedValidator('password','retypePassword')
    }
  )

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.verificationCode = params.code;
        this.appCookieService.set('digiToken', this.verificationCode);
      }
    );

    this.route.params.subscribe((res) => {
      this.type = res.type;
    });

    this.getUserDetails();

  }

  getUserDetails(){
    this.httpService.getData(PATH.GET_LOGGEDIN_USER).subscribe((res:any)=>{
      this.registerForm.patchValue({
        emailId:res.emailId,
        phoneNumber:res.phoneNumber
      })
    });

    let API;
    if(this.type=='Customer'){
      API = PATH.GET_LOGGEDIN_COMPANY
    }
    if(this.type=='Vendor'){
      API = PATH.GET_VENDOR_DETAILS
    }
    this.spinnerService.show()
    this.httpService.getData(API).subscribe((res:any)=>{
      this.userDetails = res;
      this.registerForm.patchValue({
        name:res.name
      })
      if(this.type=='Vendor'){
        this.getReferCompany(this.userDetails.invitedByCompanyId)
      }
      this.registerForm.controls['name'].disable();
      this.registerForm.controls['emailId'].disable();
      this.registerForm.controls['phoneNumber'].disable();
      this.registerForm.controls['referredBy'].disable();
      // this.registerForm.patchValue(this.userDetails)
      this.spinnerService.hide()
    },(err)=>{
      this.spinnerService.hide();
      this.error=true;
      this.errorMsg=err.error.message;
      this.toastrService.error(this.errorMsg);
    })
  }

  signup(){
    this.formSubmitAttempt=true
    if(this.registerForm.invalid){
      return
    }
    let formVal = this.registerForm.getRawValue();
    let payload = {
      password:formVal.password,
      retypePassword:formVal.retypePassword,
    }
    
    this.spinnerService.show();
    this.httpService.patchData(PATH.ACTIVATE_USER,payload)
        .subscribe((res)=>{
          this.spinnerService.hide();
          this.openSuccessModel();
          sessionStorage.removeItem('digiToken');
        },
        (err)=>{
          this.spinnerService.hide();
          this.error=true;
          this.errorMsg=err.message.payload.message;
          
        })
  }

  get f(){
    return this.registerForm.controls;
  }

  openSuccessModel(){
    let modelRef=this.modalService.open(SuccessDialogComponent,{
      ariaLabelledBy: "modal-basic-title",
      windowClass: "center",
    })
    modelRef.componentInstance.type = 'email';
    // modelRef.componentInstance.newCategory.subscribe((res)=>{
    //   // this.modalService.close()
    // })
  }

  viewPassword() {

    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  viewRePassword() {
    if (this.reTypepassword === 'password') {
      this.reTypepassword = 'text';
      this.showReType = true;
    } else {
      this.reTypepassword = 'password';
      this.showReType = false;
    }
  }

  getReferCompany(id){
    this.httpService.getData(PATH.GET_COMPANY_BY_ID + id).subscribe((res:any)=>{
      this.registerForm.patchValue({
        referredBy: 'Referred by - ' + (res.name).toUpperCase()
      })
    })
  }

}
