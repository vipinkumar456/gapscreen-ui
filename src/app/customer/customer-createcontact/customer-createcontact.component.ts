import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-customer-createcontact',
  templateUrl: './customer-createcontact.component.html',
  styleUrls: ['./customer-createcontact.component.scss']
})
export class CustomerCreatecontactComponent implements OnInit {

  supplier:any;
  maxDate=new Date();
  companyInfo: any = {};
  fileDetails: any = {};
  contractForm:any;
  checked: boolean=true;
  documents = [
    {
      title: 'Upload Contact',
      name: 'uploadContact',
    },
  ];
  countryCode='in';
  hasError: boolean;
  
  @ViewChild('file') fileInput: ElementRef;
  constructor(private router: Router,
    private formBuilder:FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) { }

  ngOnInit(): void {
    this.supplier = [
      {name: 'Supplier'},
  ];
  this.prepareContractForm();
  }

  prepareContractForm(){
    this.contractForm=this.formBuilder.group({
      supplier:[""],
      contactOwner:[""],
      contactNumber:[''],
      contactEmail:['',[Validators.email]],
      currency:[''],
      annualValue:[""],
      startDate:[''],
      expirationDate:[''],
      note:[''],
      extendableContract:['']
      })
  }


  upload(type, name, index) {
    this.fileDetails = { type: type, name: name, index: index };
    let i = this.documents.findIndex((d) => {
      return d.name == name;
    });
    this.fileInput.nativeElement.click();
  }
  download(filename) {
    this.httpService
      .getData(PATH.GET_FILE + filename)
      .subscribe((res: string) => {
        window.open(res, '_blank');
      });
  }
  deleteFile(type, name, index, filename) {
    this.httpService
      .deleteData(PATH.DELETE_FILE + filename)
      .subscribe((res) => {
        this.toastrService.success('File deleted successfully');
        if (type == 'doc') {
          this.companyInfo[name] = null;
        } 
       
      });
  }

  submit(){
    if(!this.hasError){
      this.toastrService.error('Phone number is not valid');
      return
    }
    this.router.navigate(['/vendorcontract/companycontract']);
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

      this.httpService.postData(PATH.FILE_UPLOAD,data).subscribe(
        (res) => {
          if (this.fileDetails.type == 'doc') {
            this.companyInfo[this.fileDetails.name] = res;
          } 
          this.spinnerService.hide();
          this.fileInput.nativeElement.value = '';
          this.toastrService.success("File uploaded successfully")
        },
        (err) => {
          this.spinnerService.hide();

          this.toastrService.error(err.message);
          this.fileInput.nativeElement.value = '';
        }
      );

    }
  }

  
  onError(obj) {
    this.hasError = obj;
  }

  onCountryChange(obj){
    this.countryCode = obj.iso2
  }

  get f(){
    return this.contractForm.controls;
  }

  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}
