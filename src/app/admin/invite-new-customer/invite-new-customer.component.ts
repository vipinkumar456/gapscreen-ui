import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Country } from 'country-state-city';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { SuccessDialogComponent } from 'src/app/components';
import { ActivatedRoute } from '@angular/router';
import { AppCookieService } from 'src/app/services/cookieService';
import { businessEmail, email } from 'src/app/services/custom.validations';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-invite-new-customer',
  templateUrl: './invite-new-customer.component.html',
  styleUrls: ['./invite-new-customer.component.scss']
})
export class InviteNewCustomerComponent implements OnInit {
  errorMsg;
  formSubmitAttempt:boolean=false;
  companyDetails;
  customerId;
  user;
  requestType;
  error;
  countryCode='IN';
  hasError: boolean = false ;
  inputOptions = {initialCountry:this.countryCode,separateDialCode:true};
  // isEdit:boolean=true
  // public countries = Country.getAllCountries();
  countries:any;

  constructor(private formbuilder: FormBuilder, 
    private httpService:HttpService,
    private spinnerService:NgxSpinnerService, 
    private modalService:NgbModal,
    private toastrService:ToastrService,
    private activateRoute : ActivatedRoute,
    private appCookieService:AppCookieService
    ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.grtCountriesList();
    this.activateRoute.params.subscribe((res) => {
      this.requestType = res.type;
      this.customerId = res.id;
    });
  }

  public inviteCustomerForm = this.formbuilder.group({
    country:[[],[Validators.required]],
    emailId:["",[Validators.required,email,businessEmail]],
    firstName:["",[Validators.required]],
    lastName:["",[Validators.required]],
    name:["",[Validators.required]],
    phoneNumber:['',[Validators.required]],
    type:[],
    identificationNumber:['',[Validators.required]],
  })
 
  get f(){
    return this.inviteCustomerForm.controls
  }


  joinDigicomp(){
    this.formSubmitAttempt=true;
    if(this.inviteCustomerForm.invalid){
      return;
    }else{
      let payload = this.inviteCustomerForm.getRawValue();
      payload.type = payload.country.documentTypeCode;
      payload.country = payload.country.countryName;
      this.spinnerService.show();
      if(!this.customerId){
        this.httpService.postData(PATH.REGISTER_COMPANY_ADMIN,payload).subscribe((res)=>{
          this.spinnerService.hide();
          this.openSuccessModel();
          this.formSubmitAttempt=false;
        },(err)=>{
          this.spinnerService.hide();
          this.errorMsg=err.message.payload.message;
          this.toastrService.error(this.errorMsg);
        })
      }else{
        this.httpService.postData(PATH.APPROVE_PENDING_USER+this.companyDetails.companyId,{}).subscribe((res)=>{
          this.openSuccessModel();
          this.spinnerService.hide();
        },(err)=>{
          this.spinnerService.hide();
          this.error=true;
          this.errorMsg=err.message.message;
          this.toastrService.error(this.errorMsg);
        })
      }
    }
  }
  
  onClear(){
    this.inviteCustomerForm.reset()
    this.formSubmitAttempt=false;
  }

  getCustomerByID(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_USER_BY_ID+this.customerId).subscribe((res)=>{
      let resData:any = res;
      this.companyDetails = res;
      this.spinnerService.hide();
      // this.inviteCustomerForm.patchValue(resData)
      this.inviteCustomerForm.disable();
      this.inviteCustomerForm.patchValue({
        country:this.filterCountry(resData.country),
        emailId:resData.emailId,
        firstName:resData.firstName,
        identificationNumber:resData.identificationNumber,
        lastName:resData.lastName,
        name:resData.name,
        phoneNumber:resData.phoneNumber,
        type:resData.type
      })
    }),(err)=>{
      this.spinnerService.hide();
      this.error=true;
      this.errorMsg=err.message.message;
      this.toastrService.error(this.errorMsg);
    }
  }

  grtCountriesList(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_ALL_COUNTRIES+'?page=1&size=1000').subscribe((res)=>{
      let countryList = res['content'];
      this.countries = countryList.map((elm)=> {return {name:elm.countryName,code:elm}})
      if(this.customerId){
        this.getCustomerByID();
        
      }
      this.spinnerService.hide();
    }),(err)=>{
      this.spinnerService.hide();
      this.error=true;
      this.errorMsg=err.message.message;
      this.toastrService.error(this.errorMsg);
    }
  }
  
  changeCountry(ev){
    let data:any = ev.value;
    this.inviteCustomerForm.patchValue({
      type:data.documentType
    })
    this.inviteCustomerForm.controls['type'].disable();
  }

  filterCountry(country){
    let countryCode = this.countries.filter((elm)=> elm.name==='India');
    return countryCode[0].code
  }

  openSuccessModel(){
    let modelRef=this.modalService.open(SuccessDialogComponent,{
      ariaLabelledBy: "modal-basic-title",
      windowClass: "center",
    })
    modelRef.componentInstance.type = 'activate';
  }
  onCountryChange(obj){

    this.countryCode = obj.iso2

  }

  onError(obj) {

    this.hasError = obj;

  }
  numberOnly(event:any){  
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }


}
