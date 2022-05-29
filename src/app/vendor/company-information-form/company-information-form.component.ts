import { AppCookieService } from 'src/app/services/cookieService';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Country, State, City } from 'country-state-city';
import { ICity } from 'country-state-city/dist/lib/interface';
import * as _ from 'lodash';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
declare let $: any;
import * as moment from 'moment';
import { SharedService } from 'src/app/services/shared.service';
import { HttpClient } from '@angular/common/http';
import {  email, website } from 'src/app/services/custom.validations';

@Component({
  selector: 'app-company-information-form',
  templateUrl: './company-information-form.component.html',
})
export class CompanyInformationFormComponent implements OnInit {

  @ViewChildren('phone', { read: ElementRef }) phone: ElementRef;
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();

  formSubmitAttempt: boolean = false;
  uploaded: boolean;
  user: any;
  companyLogo;
  public countries = Country.getAllCountries();
  public oprationalCities: Array<ICity> = [];
  public registeredCities: Array<ICity> = [];
  categories: Array<any> = [];
  productandservices: Array<any> = [];
  legalStatuses: Array<any> = [];
  subCategories: Array<any> = [];
  entityTypes: Array<any> = [];
  activities: Array<any> = [];
  companyInfo: any = null;
  hasError: boolean;
  vendorSetting:any;
  logoView:boolean = false;
  logoname:any = 'Company Logo';
  countryCode='in';
  disableBtn:boolean = false;
  @ViewChild('file') fileInput: ElementRef;

  onError(obj) {
    this.hasError = obj;
  }

  onCountryChange(obj){
    this.countryCode = obj.iso2
  }

  isFormChanged: boolean = false;
  @HostListener('window:beforeunload', ['$event'])
  public doSomething($event) {
    if (this.infoForm.dirty) {
      return false;
    }
    return true;
  }
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private el: ElementRef,
    private spinnerService: NgxSpinnerService,
    private sharedService: SharedService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private httpClient: HttpClient
  ) {}

  infoForm = this.formBuilder.group({
    answers: [null],
    organizationId: [],
    addressApproval: [null],
    certificateOfIncorporation: [null],
    financialStatementsLast3Years: [null],
    insuranceCertificate: [null],
    memorandumArticlesOfAssociation: [null],
    tradingLicense: [null],
    checkboxes: [null],
    companyName: [''],
    companyLogo:[''],
    countryCode:[''],
    vatRegistrationNumber: [''],
    websiteUrl: ['',[website]],
    // parentCompany: [''],
    phoneNumber: [''],
    productOrService: [''],
    category: [''],
    companyRegistrationNumber: [''],
    contactPerson: [''],
    dateOfIncorporation: [''],
    dunsNumber: [''],
    emailAddress: ['', [email]],
    formerName: [''],
    legalStatus: [''],
    annualRevenueInUsd: [''],
    parentCompany:this.formBuilder.group({
      name: [''],
      countryOfDomicile: [''],
    }),
    operationalAddress: this.formBuilder.group({
      addresses: [''],
      city: [''],
      country: [''],
      postalCode: [''],
    }),
    previousAddress: this.formBuilder.group({
      addresses: [''],
      city: [''],
      country: [''],
      postalCode: [''],
    }),
    isSameAddress: [false],
    registeredAddress: this.formBuilder.group({
      addresses: [''],
      city: [''],
      country: [''],
      postalCode: [''],
    }),
    step: [2],
    boardOfDirectors: this.formBuilder.array([this.addDirectorsGroup(null)]),
    shareHolders: this.formBuilder.array([this.addShareholdersGroup(null)]),
    branchInOtherCountry: this.formBuilder.array([this.addBranchGroup(null)]),
    bankDetails: this.formBuilder.group({
      bankName: [''],
      accountNumber: [''],
      beneficiaryName: [''],
      swiftCode: [''],
      iban: [],
      consent: [true],
    }),
    // entityType: [''],
    // subCategory: [],
  });
  maxDate = new Date();
  
  ngOnInit(): void {
    let dropdownType = ['category','legalStatus','productAndServices','entityTypes','']
    dropdownType.forEach((type)=>{
      this.getDropdowns(type);
    })
    this.getVendorSetting();
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.getLoggedInVendor();
    // this.getActivities(this.user.username);

    this.getCompanyInfo();
    this.infoForm.valueChanges.subscribe((result) => {
      this.isFormChanged = true;
    });
  }

  formChanged(result) {
    if (
      this.infoForm.get('companyName').valid &&
      this.infoForm.get('vatRegistrationNumber').valid &&
      this.infoForm.get('websiteUrl').valid &&
      this.infoForm.get('phoneNumber').valid &&
      this.infoForm.get('product').valid &&
      this.infoForm.get('category').valid &&
      this.infoForm.get('companyRegistrationNumber').valid &&
      this.infoForm.get('contactPerson').valid &&
      this.infoForm.get('dateOfIncorporation').valid &&
      this.infoForm.get('emailAddress').valid &&
      this.infoForm.get('legalStatus').valid
    ) {
      $('#collapseOne').collapse('hide');
      if (
        !this.infoForm.get('operationalAddress').invalid &&
        !this.infoForm.get('registeredAddress').invalid
      ) {
        $('#collapseTwo').collapse('hide');

        if (!this.infoForm.get('boardOfDirectors').invalid) {
          $('#collapseThree').collapse('hide');

          if (!this.infoForm.get('shareHolders').invalid) {
            $('#collapseFour').collapse('hide');
            $('#collapseFive').collapse('show');
          } else {
            $('#collapseFour').collapse('show');
          }
        } else {
          $('#collapseThree').collapse('show');
        }
      } else {
        $('#collapseTwo').collapse('show');
      }
    } else {
      $('#collapseOne').collapse('show');
    }
  }

  getDropdowns(type) {
    this.httpService.getData(PATH.GET_DROPDOWNS+'/'+type).subscribe(
      (res:any) => {
        if(type=='category'){
          this.categories = res.map((elm)=>{return elm.name})
        }
        if(type=='legalStatus'){
          this.legalStatuses = res.map((elm)=>{return elm.name})
        }
        if(type=='productAndServices'){
          this.productandservices = res.map((elm)=>{return elm.name})
        }
        if(type=='entityTypes'){
          this.entityTypes = res.map((elm)=>{return elm.name})
        }
        if(type=='subCategories'){
          this.subCategories = res.map((elm)=>{return elm.name})
        }
        // this.categories = _.find(res, function (o) {
        //   return o.dropdownName == 'category';
        // }).dropdownValues;
        // this.productandservices = _.find(res, function (o) {
        //   return o.dropdownName == 'productAndServices';
        // }).dropdownValues;
        // this.legalStatuses = _.find(res, function (o) {
        //   return o.dropdownName == 'legalStatus';
        // }).dropdownValues;
        // this.entityTypes = _.find(res, function (o) {
        //   return o.dropdownName == 'entityTypes';
        // }).dropdownValues;
        // this.subCategories = _.find(res, function (o) {
        //   return o.dropdownName == 'subCategories';
        // }).dropdownValues;
      },
      (error) => {
        // this.spinnerService.hide();
      }
    );
  }

  private scrollToFirstInvalidControl() {}
  // next(type) {
  //   this.formSubmitAttempt = true;
  //   this.infoForm.markAllAsTouched();
  //   if (this.infoForm.valid) {
  //     this.spinnerService.show();
  //     let data = this.infoForm.getRawValue();
  //     let branches = [];
  //     data.branchInOtherCountry.map((o) => {
  //       branches.push(o.branch);
  //     });
  //     data.branchInOtherCountry = branches;
  //     data.companyLogo = this.companyLogo;
  //     data.countryCode = this.countryCode;
  //     data.dateOfIncorporation = data.dateOfIncorporation.toLocaleDateString();
  //     this.httpService.updateData(PATH.COMPANY_INFORMATION,data).subscribe(
  //       (res) => {
  //         this.spinnerService.hide();

  //         if (type == 'next') {
  //           this.callParent.emit({
  //             step: data.step ? data.step : 2,
  //             url: 'vendor/vendor-info/2',
  //           });
  //           this.router.navigate(['vendor/vendor-info/2']);
  //         } else {
  //           this.getCompanyInfo();
  //         }
  //         this.toastrService.success(
  //           'Company Information Updated Successfully'
  //         );
  //       },
  //       (error) => {
  //         this.spinnerService.hide();
  //         this.toastrService.error(error.message?.message);
  //       }
  //     );
  //   } else {
  //     const invalidControls = $('form .ng-invalid:not(div)');
  //     if (invalidControls.length) {
  //       let accordian: any = invalidControls.closest('.collapse');
  //       accordian.collapse('show');
  //       window.scroll({
  //         top: this.getTopOffset(invalidControls[0]),
  //         left: 0,
  //         behavior: 'smooth',
  //       });
  //       invalidControls[0].focus();
  //     }
  //   }
  // }

  updateCompanyInfo(type) {
    this.formSubmitAttempt = true;
    this.infoForm.markAllAsTouched();
    // if (!this.hasError) {
    //   // this.phone.nativeElement.focus();
    //   this.toastrService.error('Invalid Phone number', 'error');
    // }
    if (this.infoForm.valid) {
      this.spinnerService.show();
      let data = this.infoForm.getRawValue();
      let branches = [];
      data.branchInOtherCountry.map((o) => {
        branches.push(o.branch);
      });
      data.branchInOtherCountry = branches;
      data.companyLogo = this.companyLogo;
      data.countryCode = this.countryCode;
      data.dateOfIncorporation = data.dateOfIncorporation.toLocaleDateString();
      this.httpService
        .updateData(PATH.COMPANY_INFORMATION, data)
        .subscribe(
          (res) => {
            if (type == 'next') {
              this.router.navigate(['vendor/vendor-info/2']);
              this.callParent.emit({
                step: data.step,
                url: '/vendor/vendor-info/2',
              });
            }
            this.spinnerService.hide();
            this.toastrService.success(
              'Company Information Updated Successfully'
            );
            this.getCompanyInfo();
          },
          (error) => {
            this.spinnerService.hide();
            this.toastrService.error(error.message?.message);
          }
        );
    } else {
      const invalidControls = $('form .ng-invalid:not(div)');
      if (invalidControls.length) {
        let accordian: any = invalidControls.closest('.collapse');
        accordian.collapse('show');
        window.scroll({
          top: this.getTopOffset(invalidControls[0]),
          left: 0,
          behavior: 'smooth',
        });
        invalidControls[0].focus();
      }
    }
  }

  private getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 50;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }

  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          this.spinnerService.hide();
          if (!res) {
            return;
          }
          let branches = [];
          if (res.branchInOtherCountry) {
            res.branchInOtherCountry.map((o) => {
              branches.push({ branch: o });
            });
            res.branchInOtherCountry = branches;
          }
          if (_.isEqual(res.registeredAddress, res.operationalAddress)) {
            res['isSameAddress'] = true;
            this.infoForm.get('operationalAddress').disable();
          }
          res.dateOfIncorporation = new Date(res.dateOfIncorporation)
          this.infoForm.patchValue(res);
          this.countryCode = res.countryCode;
          const directorsformArray = new FormArray([]);
          res.boardOfDirectors.forEach((data) => {
            directorsformArray.push(this.addDirectorsGroup(data));
          });
          this.infoForm.setControl('boardOfDirectors', directorsformArray);
          const shareHoldersformArray = new FormArray([]);
          res.shareHolders.forEach((data) => {
            shareHoldersformArray.push(this.addShareholdersGroup(data));
          });
          this.infoForm.setControl('shareHolders', shareHoldersformArray);
          const branchformArray = new FormArray([]);
          res.branchInOtherCountry?.forEach((data) => {
            branchformArray.push(this.addBranchGroup(data));
          });
          this.infoForm.setControl('branchInOtherCountry', branchformArray);
          this.isFormChanged = false;

          this.changeCountry('registered');
          this.changeCountry('operational');
          this.companyInfo = res;
          if(this.companyInfo?.companyLogo)
          { this.logoView = true;
            this.logoname = this.companyInfo?.companyLogo;
            this.companyLogo = this.companyInfo?.companyLogo;
          }

          if(this.companyInfo.status == 'Submitted'){
            this.infoForm.disable();
            this.disableBtn = true;
          }
          // this.toastrService.success('Company Information Updated Successfully');
        },
        (err)=>{
          this.spinnerService.hide();
          let errorMsg=err.error.message;
          // this.toastrService.error(errorMsg);
        })
  }
  setFormArray(arraData) {
    const formArray = new FormArray([]);
    arraData.forEach((data) => {
      formArray.push(this.formBuilder.group(data));
    });

    return formArray;
  }
  getActivities(username) {
    this.httpService.getData(PATH.AUDIT_HISTORY + username).subscribe(
      (res: Array<any>) => {
        this.activities = res;
      },
      (error) => {
        this.activities = [];
      }
    );
  }

  get f() {
    return this.infoForm.controls;
  }

  getValue(event) {
    this.uploaded = event;
  }

  addDirectorsGroup(data): FormGroup {
    return this.formBuilder.group({
      fullName: [data ? data.fullName : ''],
      nationality: [data ? data.nationality : ''],
      address: [data ? data.address : ''],
      postalCode: [data ? data.postalCode : ''],
      countryOfResidence: [data ? data.countryOfResidence : ''],
      identificationNumber: [data ? data.identificationNumber : ''],
      addressProof: [data ? data.addressProof : null],
      passport: [data ? data.passport : null],
      personalIdentification: [data ? data.personalIdentification : null,
      ],
    });
  }

  addDirectors() {
    (<FormArray>this.infoForm.get('boardOfDirectors')).push(
      this.addDirectorsGroup(null)
    );
  }

  removeDirector(index) {
    (<FormArray>this.infoForm.get('boardOfDirectors')).removeAt(index);
  }

  addShareholdersGroup(data): FormGroup {
    return this.formBuilder.group({
      type: [data ? data.type : 'company'],
      companyName: [data ? data.companyName : ''],
      ownedPercentage: [data ? data.ownedPercentage : ''],
      address: [data ? data.address : ''],
      postalCode: [data ? data.postalCode : ''],
      identificationNumber: [data ? data.identificationNumber : ''],
      countryOfIncorporation: [data ? data.countryOfIncorporation : ''],
      // nationality: [data ? data.nationality : ''],
      addressProof: [data ? data.addressProof : null],
      passport: [data ? data.passport : null],
      personalIdentification: [data ? data.personalIdentification : null],
    });
  }

  addShareholders() {
    (<FormArray>this.infoForm.get('shareHolders')).push(
      this.addShareholdersGroup(null)
    );
  }

  removeShareholder(index) {
    (<FormArray>this.infoForm.get('shareHolders')).removeAt(index);
  }

  addBranchGroup(data): FormGroup {
    return this.formBuilder.group({
      branch: [data ? data.branch : ''],
    });
  }

  addBranches() {
    (<FormArray>this.infoForm.get('branchInOtherCountry')).push(
      this.addBranchGroup(null)
    );
  }

  removeBranch(index) {
    (<FormArray>this.infoForm.get('branchInOtherCountry')).removeAt(index);
  }

  sameAddressChecked() {
    if (this.infoForm.get('isSameAddress').value) {
      this.infoForm
        .get('operationalAddress')
        .patchValue(this.infoForm.get('registeredAddress').value);
      this.changeCountry('operationalAddress');

      this.infoForm.get('operationalAddress').disable();
    } else {
      this.infoForm.get('operationalAddress').reset();
      this.infoForm.get('operationalAddress').enable();
    }
  }
  changeCountry(addressType) {
    let that = this;
    if (addressType == 'registered') {
      let country = _.find(this.countries, function (o) {
        return (
          o.name == that.infoForm.get('registeredAddress').value['country']
        );
      });

      this.registeredCities = City.getCitiesOfCountry(country.isoCode);
    } else {
      let country = _.find(this.countries, function (o) {
        return (
          o.name == that.infoForm.get('operationalAddress').value['country']
        );
      });

      this.oprationalCities = City.getCitiesOfCountry(country.isoCode);
    }
  }
  skip() {
    if (this.alertFormChanges()) {
      this.router.navigate(['vendor/vendor-info/2']);
      this.callParent.emit({
        step: this.companyInfo.step,
        url: '/vendor/vendor-info/2',
      });
    }
  }

  goNext(){
    this.router.navigate(['vendor/vendor-info/2']);
    this.callParent.emit({
      step: this.companyInfo.step,
      url: '/vendor/vendor-info/2',
    });
  }

  alertFormChanges() {
    if (this.isFormChanged) {
      return confirm('Are you sure you want to exit without saving ?');
    } else {
      return true;
    }
  }

  upload() {
    this.fileInput.nativeElement.click();
  }
  uploadFile() {
    const fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      if (fileBrowser.files[0].size > 10485760) {
        this.toastrService.error('File size shold be max 10MB', 'Error');
        return;
      }
      let data = new FormData();
      data.append('file', fileBrowser.files[0]);
      this.spinnerService.show();
      this.toastrService.success("File Uploaded")

      this.httpService.postData(PATH.FILE_UPLOAD,data).subscribe(
        (res) => {
          this.spinnerService.hide()
          this.user['companyLogo']=res
          this.companyLogo = res.fileName;
          if(res.fileName){
          this.logoView = true;
          this.logoname = res.fileName;
          }
          if(this.companyLogo){
            this.infoForm.patchValue({
              companyLogo:this.companyLogo
            })
          }
          this.fileInput.nativeElement.value = '';
        },
        (err) => {
          this.spinnerService.hide();

          this.toastrService.error(err.message);
          this.fileInput.nativeElement.value = '';
        }
      );
      
    }
  }

  getVendorSetting(){
    this.httpService.getData(PATH.GET_VENDOR_SETTINGS).subscribe((res)=>{
      this.vendorSetting = res;
      this.addValidators(this.infoForm,this.vendorSetting)
    }, (error) => {
      this.httpClient.get('assets/vendor-setting.json').subscribe((res)=>{
        this.vendorSetting = res;
        this.addValidators(this.infoForm,this.vendorSetting)
      })
    })
  }

  addValidators(formGroup: FormGroup, settings) {
    Object.keys(settings).forEach(e=> 
      {
        const g = formGroup.get(e);
        if(g && g instanceof FormGroup){
          const o = settings[e];
          Object.keys(o).forEach(r=>{
            const m = o[r];
            if(m){
            const ctrl = g.get(r);
            ctrl.setValidators([Validators.required]);
            ctrl.updateValueAndValidity();
            }
          });
        } else if (g && g instanceof FormControl){
          const o = settings[e];
          if(o) {
          const ctrl = formGroup.get(e);
          ctrl.setValidators([Validators.required]);
          ctrl.updateValueAndValidity();
          }
        }
      });

    Object.keys(formGroup.controls).forEach(control => {
      if (formGroup.controls[control] instanceof FormArray) {
        let formarray = formGroup.controls[control] as FormArray;
        const ar = settings[control];
        formarray.controls.forEach((ele: FormGroup, index) => {
          if(ar){
          Object.keys(ar).forEach(c=>{
          if(ar[c]){
            const ctrl = ele.get(c);
            if(ctrl) {
              ctrl.setValidators([Validators.required]);
              ctrl.updateValueAndValidity();
            }
          }
          })
          }
        })
      }
    });
  }

  getLoggedInVendor(){
    this.httpService.getData(PATH.GET_VENDOR_DETAILS).subscribe((res:any)=>{
      this.infoForm.patchValue({
        companyName: res.name,
        emailAddress: res.emailId,
        organizationId: res.companyId,
      });
    })
  }
  // download(){
  //   this.httpService.getData(PATH.GET_FILE + this.companyLogo)
  //   .subscribe((res: any) => {
  //     window.open(res.payload, '_blank');
  //   },(err)=>{
  //     this.toastrService.error(err.message.payload.message);
  //   });


    
  // }

  download(){
    this.spinnerService.show();
    let type = this.checkDocumentType(this.companyLogo);
    this.httpService.download(PATH.GET_UPLOADED_FILE+this.companyLogo).subscribe((res)=>{
      var file = new Blob([res], {type: type});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.spinnerService.hide();
    })
  }

  checkDocumentType(filename){
    let fileType = filename.split('.').pop();
    if(fileType == 'jpeg' || fileType == 'jpg'){
      return 'image/jpeg';
    }
    if(fileType == 'pdf'){
      return 'application/pdf';
    }
    if(fileType == 'png'){
      return 'image/png';
    }
    if(fileType == 'gif'){
      return 'image/gif';
    }
  }


  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
