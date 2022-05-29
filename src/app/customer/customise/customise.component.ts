import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PATH } from 'src/app/app.constant';
import { HttpService } from './../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-customise',
  templateUrl: './customise.component.html',
  styleUrls: ['./customise.component.scss']
})
export class CustomiseComponent implements OnInit {
  checked:boolean=true;
  formSubmitAttempt: boolean = false;
  uploaded: boolean;
  companyInfo:any;
  errorMsg;

  constructor(private formBuilder: FormBuilder,private httpService:HttpService, private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,) {}

  infoForm = this.formBuilder.group({
    annualRevenueInUsd:[false],
    companyName: [true],
    organizationId: [],
    addressApproval: [true],
    certificateOfIncorporation: [true],
    financialStatementsLast3Years: [true],
    insuranceCertificate: [true],
    memorandumArticlesOfAssociation: [true],
    tradingLicense: [true],
    checkboxes: [false],
    vatRegistrationNumber: [true],
    companyLogo: [true],
    websiteUrl: [true],
    phoneNumber: [true],
    productOrService: [true],
    category: [true],
    companyRegistrationNumber: [true],
    contactPerson: [true],
    dateOfIncorporation: [true],
    dunsNumber: [false],
    emailAddress: [true],
    formerName: [false],
    legalStatus: [true],
    parentCompany: [false],
    countryOfDomicile: [false],
    uploadDocument:[false],
    privacyPolicy:[true],
    termsConditions:[true],
    registeredAddress: this.formBuilder.group({
      addresses: [true],
      city: [true],
      country: [true],
      postalCode: [true],
    }),
    operationalAddress: this.formBuilder.group({
      addresses: [true],
      city: [true],
      country: [true],
      postalCode: [true],
    }),
    previousAddress: this.formBuilder.group({
      addresses: [false],
      city: [false],
      country: [false],
      postalCode: [false],
    }),
    boardOfDirectors:this.formBuilder.group({
      fullName: [true],
      nationality: [true],
      address: [true],
      postalCode: [true],
      countryOfResidence: [true],
      addressProof: [true],
      passport: [true],
      identificationNumber: [true],
    }),
    shareHolders:this.formBuilder.group({
      type: [true],
      ownedPercentage: [true],
      postalCode: [true],
      identificationNumber: [true],
      addressProof: [ ],
      personalIdentification: [true],
      companyName: [true],
      countryOfIncorporation: [true],
    }),
    branch:this.formBuilder.group({
      branchInOtherCountry:[false],
    }),
    bankDetails: this.formBuilder.group({
      bankName: [false],
      accountNumber: [false],
      beneficiaryName: [false],
      swiftCode: [false],
      iban: [false],
      // consent: [true],
    }),
    contractInformation: this.formBuilder.group({
      annualValue: [true],
      contractDocument: [true],
      contractName: [true],
      contractOwner: [true],
      currency: [true],
      email: [true],
      endDate: [true],
      renewalDate: [true],
      startDate: [true],
    }),
  })

  ngOnInit(): void {
    this.getVendorCompanyInfo()
  }

  handleChange(e){
  }

  getVendorCompanyInfo(){
    this.httpService.getData(PATH.GET_VENDOR_COMPANY_INFO).subscribe((res)=>{
      this.companyInfo=res;
      if(this.companyInfo){
        this.infoForm.patchValue(this.companyInfo);
      }
    })
  }

  postData(){
    this.formSubmitAttempt=true;
    if(this.infoForm.invalid){
      return;
    }else{
      this.spinnerService.show();
      this.httpService.updateData(PATH.POST_VENDOR_SETTINGS,this.infoForm.value).subscribe((res)=>{
        this.companyInfo=res;
        this.toastrService.success('Company Information Settings Updated Successfully!');
        this.getVendorCompanyInfo();
        this.spinnerService.hide();
      },(err) => {
        this.spinnerService.hide();
        this.errorMsg = err.message.message;
        this.toastrService.error(this.errorMsg);
      })
      this.formSubmitAttempt=false;
      this.infoForm.reset()
    }
  }
  
  onClear(){
    this.infoForm.reset();
    this.formSubmitAttempt=false
  }

}
