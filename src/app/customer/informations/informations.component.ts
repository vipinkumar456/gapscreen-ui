import { HttpService } from './../../services/http.service';
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { PATH } from 'src/app/app.constant';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.scss']
})
export class InformationsComponent implements OnInit {

  formSubmitAttempt:boolean=false;
  companyInfo:any;
  errorMsg;
  fileName;
  imgUrl;
  // toggle = true;
  countryCode='in';
  hasError: boolean=false;

  @ViewChild('file') fileInput: ElementRef;
  constructor(private formbuilder: FormBuilder,private httpService:HttpService,private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,) {}

  ngOnInit(): void {
    this.getLoggedInCompany();
    this.getCompanyInfo();
  }
  public informationForm = this.formbuilder.group({
    companyId:[''],
    companyName: [''],
    legalName: ['',Validators.required],
    legalAddress: ['',Validators.required],
    registrationNumber: ['',Validators.required],
    phoneNumber: ['',Validators.required],
  })
  
  get f(){
    return this.informationForm.controls;
  }

  saveCompanyBasicDetails(){
    // this.toggle = false;
    this.formSubmitAttempt=true;
    if(this.informationForm.invalid){
      return;
    }else{  
      this.spinnerService.show();
      let payload=this.informationForm.value
      payload.companyLogo=this.fileName
      this.httpService.updateData(PATH.SAVE_COMPANY_BASIC_DETAILS,payload).subscribe((res)=>{
        this.spinnerService.hide();
        this.toastrService.success('Company Information Saved Successfully!');
      },(err) => {
        this.spinnerService.hide();
        this.errorMsg = err.message.message;
        this.toastrService.error(this.errorMsg);
      });
      this.formSubmitAttempt=false;
      // this.informationForm.reset()
    }
  }
  onClear(){
    this.informationForm.reset();
    this.formSubmitAttempt=false
  }

  // GET_LOGGEDIN_COMPANY

  getLoggedInCompany(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_LOGGEDIN_COMPANY).subscribe((res)=>{
      this.companyInfo=res;
      this.informationForm.patchValue({
        companyName: this.companyInfo.name,
        registrationNumber:this.companyInfo.identificationNumber
      });
      this.informationForm.controls['companyName'].disable();
      this.informationForm.controls['registrationNumber'].disable();
      this.spinnerService.hide();
    },(err) => {
      this.spinnerService.hide();
      this.toastrService.error(err.message);
    }) 
  }

  getCompanyInfo(){
    this.httpService.getData(PATH.GET_COMPANY_DETAILS).subscribe((res)=>{
      this.companyInfo=res;
      this.fileName = this.companyInfo.companyLogo;
      this.getFile(this.companyInfo.companyLogo);
      this.informationForm.patchValue({
        companyId:this.companyInfo.companyId,
        legalAddress:this.companyInfo.legalAddress,
        legalName:this.companyInfo.legalName,
        // registrationNumber: this.companyInfo.registrationNumber,
        phoneNumber: this.companyInfo.phoneNumber,
      });
    })
  }

  upload() {
    this.fileInput.nativeElement.click();
    // this.courseImgFlag = false;
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
      this.httpService.postData(PATH.FILE_UPLOAD,data).subscribe((res) => {
          this.spinnerService.hide();
          this.fileName = res.fileName;
          this.getFile(this.fileName);
          // this.getProfile(this.imgUrl);
          // debugger
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

  getFile(file){
    this.httpService.getImage(PATH.GET_UPLOADED_FILE+file).subscribe((res)=>{
      this.imgUrl = res;
      
    })
  }
  
  onError(obj) {
    this.hasError = obj;
  }

  onCountryChange(obj){
    this.countryCode = obj.iso2
  }


  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
