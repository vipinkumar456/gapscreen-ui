import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { MessageService,ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
  providers: [MessageService,ConfirmationService]
})

export class RegulationsComponent implements OnInit {
  documents = [
    {
      title: 'Terms & Conditions',
      name: 'termsAndConditions',
    },
  ];
  privacy=[
    {
      titles: 'Privacy Policy',
      name: 'privacyPolicy',
    },
  ];
// document.title=""

  
  
  @ViewChild('file') fileInput: ElementRef;
  fileDetails: any = {};
  companyInfo: any = {};
  termsAndConditions:any='Terms & Conditions';
  privacyPolicy:any='Privacy Policy';
  viewDocument: boolean = false;
  viewPrivacyDocument:boolean = false;
 
  constructor(
    private formBuilder:FormBuilder,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    ) { }

  regulationsForm = this.formBuilder.group({
    termsConditions:[],
    privacyPolicy:[]
  })

  ngOnInit(): void {
    this.getData();
  }

 
  upload(type, name, index) {
    this.fileDetails = { type: type, name: name, index: index };
    let i = this.documents.findIndex((d) => {
      return d.name == name;
    });
    this.fileInput.nativeElement.click();
  }

  uploadFile(){
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
          if (this.fileDetails.type == 'termsAndConditions') {
            this.companyInfo[this.fileDetails.name] = res.fileName;
           this.termsAndConditions = res.fileName;
           if(res.filename){
           this.viewDocument = true
           }
          } else if (this.fileDetails.type == 'privacyPolicy') {
            this.companyInfo[this.fileDetails.name] = res.fileName;
            this.privacyPolicy = res.fileName;
            if(res.filename){
              this.viewPrivacyDocument = true
              }
          } 
          this.spinnerService.hide();
          // this.updateCompanyInfo();
          this.fileInput.nativeElement.value = '';
          this.toastrService.success("File Uploaded Successfully!")
        },
        (err) => {
          this.spinnerService.hide();

          this.toastrService.error(err.message);
          this.fileInput.nativeElement.value = '';
        }
      );
    }
  }

  submitted() {
    debugger
    if(!this.companyInfo.termsAndConditions){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Terms and Condition is Required",
      });
      return;
    }
    if(!this.companyInfo.privacyPolicy){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Privacy Policy is Required",
      });
      return;
    }
    this.spinnerService.show();
    this.httpService.updateData(PATH.REGULATIONS_Documents,this.companyInfo).subscribe(
        (res) => {
          this.getData();
          this.companyInfo = res;
          this.spinnerService.hide();
          },
        (error) => {
          this.spinnerService.hide();
          this.toastrService.error(error.message.message);
        }
      );
  }

  downloadTermsAndConditions() {
    this.spinnerService.show();
    let type = this.checkDocumentType( this.termsAndConditions);
    this.httpService.download(PATH.GET_UPLOADED_FILE+this.privacyPolicy).subscribe((res)=>{
      var file = new Blob([res], {type: type});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      this.spinnerService.hide();
    })
  }

  downloadPrivacyPolicy() {
    this.spinnerService.show();
    let type = this.checkDocumentType( this.privacyPolicy);
      this.httpService.download(PATH.GET_UPLOADED_FILE+this.privacyPolicy).subscribe((res)=>{
        var file = new Blob([res], {type: type});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.spinnerService.hide();
      })
    }

    checkDocumentType(filename){
    this.spinnerService.show();
      let fileType = filename.split('.').pop();
      if(fileType == 'jpeg'){
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
  
    cancel(){

  }


getData(){
  this.spinnerService.show();
  let subscription = this.httpService
    .getData(PATH.REGULATIONS_Documents)
    .subscribe((res:any) => {
      if(res.termsAndConditions){
        this.termsAndConditions = res.termsAndConditions;
        this.companyInfo.termsAndConditions = res.termsAndConditions;
        this.viewDocument = true;
      }
      if(res.privacyPolicy){
        this.privacyPolicy = res.privacyPolicy;
        this.companyInfo.privacyPolicy = res.privacyPolicy;
        this.viewPrivacyDocument = true;

      }
  
      // this.termsAndConditions
      // privacyPolicy
      this.spinnerService.hide();
    },
      (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.payload.message);
      })
    }


}
