import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Country } from 'country-state-city';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { SuccessDialogComponent } from 'src/app/components';
import { AppCookieService } from 'src/app/services/cookieService';
import { businessEmail, email,  onlyCharacters } from 'src/app/services/custom.validations';
import { HttpService } from 'src/app/services/http.service';
import { ValidatorsServiceService } from 'src/app/services/validators-service.service';
import { noWhitespace,noExtraWhiteSpace } from 'src/app/services/custom.validations';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  codes: any=[
    "Customer",
    "Vendor",
  ];

  // selectedCity: City;
  state:any;
  @ViewChild('phone') input: ElementRef;
  // public countries = Country.getAllCountries();
  countries:any;
  error:boolean=false;
  errorMsg:string="";
  formSubmitAttempt:boolean=false;
  verificationCode:string;
  userDetails:any;
  companyNameVerificationCode:string;
  companyNameDetails:any;
  customerNameVerificationCode:string;
  customerNameDetails:any;
  countryCode='IN';
  hasError: boolean = false;
  inputOptions = {initialCountry:this.countryCode,separateDialCode:true};

  constructor(private route: ActivatedRoute,
              private formBuilder:FormBuilder,
              private httpService:HttpService,
              private toastrService:ToastrService,
              private spinnerService:NgxSpinnerService,
              private modalService:NgbModal,
              private element: ElementRef, 
              private renderer: Renderer2,
              private router:Router,
              private validators:ValidatorsServiceService) { }

  public registerForm=this.formBuilder.group({
    country:[[],[Validators.required]],
    emailId:["",[Validators.required,email,businessEmail]],
    firstName:["",[Validators.required,onlyCharacters]],
    lastName:["",[Validators.required,onlyCharacters]],
    name:["",[Validators.required,noExtraWhiteSpace]],
    phoneNumber:['',[Validators.required]],
    type:[],
    identificationNumber:['',[Validators.required]],    
  })

  ngOnInit(): void {
    this.grtCountriesList();
  }

  signup(){
    debugger
    this.formSubmitAttempt=true
    this.error=false;
    if(this.registerForm.invalid){
      return
    }
    if(!this.hasError){
      this.toastrService.error('Phone number is not valid');
      return
    }
    
    let payload = this.registerForm.getRawValue();
    payload.emailId=payload.emailId.toLowerCase();
    payload.type = payload.country.documentTypeCode;
    payload.country = payload.country.countryName;
    this.spinnerService.show();
    this.httpService.postData(PATH.REGISTER_COMPANY_SELF,payload).subscribe((res)=>{
          this.spinnerService.hide();
          this.registerForm.reset();
          this.formSubmitAttempt = false;
          this.openSuccessModel();
        },
        (err)=>{
          this.spinnerService.hide();
          this.error=true;
          this.errorMsg=err.message.message;
          this.toastrService.error(this.errorMsg);
        })
  }

  get f(){
    return this.registerForm.controls;
  }

  
  onCountryChange(obj){
    this.countryCode = obj.iso2
  }
  onError(obj) {
    this.hasError = obj;
  }


  openSuccessModel(){
    let modelRef=this.modalService.open(SuccessDialogComponent,{
      ariaLabelledBy: "modal-basic-title",
      windowClass: "center",
    })
    modelRef.componentInstance.type = 'register';
    modelRef.componentInstance.newCategory.subscribe((res)=>{
      // this.modalService.close()
    })
  }
 
  grtCountriesList(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_ALL_COUNTRIES+'?page=1&size=1000').subscribe((res)=>{
      let countryList = res['content'];
      this.countries = countryList.map((elm)=> {return {name:elm.countryName,code:elm}})
      this.spinnerService.hide();
    })
  }
  
  changeCountry(ev){
    this.inputOptions = null;
    let data:any = ev.value;
    this.registerForm.patchValue({
      type:data.documentType
    })
    this.registerForm.controls['type'].disable();
    this.countryCode = data.countryCode;
    this.inputOptions = {initialCountry:this.countryCode,separateDialCode:true};
  }

  // code for remove whitespace
  space(event:any){
    this.validators.space(event);
  }

  numberOnly(event:any){  
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
