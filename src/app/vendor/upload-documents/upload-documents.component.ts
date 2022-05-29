import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Stepper from 'bs-stepper';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
})
export class UploadDocumentsComponent implements OnInit {
  user: any;
  disableBtn:boolean = false;
  uploaded: boolean;
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  submitted: boolean = false;
  documents = [
    {
      title: 'Certificate of Incorporation',
      name: 'certificateOfIncorporation',
    },
    {
      title: 'Memorandum & Articles of Association',
      name: 'memorandumArticlesOfAssociation',
    },
    {
      title: 'Financial Statements for last three years',
      name: 'financialStatementsLast3Years',
    },
    {
      title: 'Trading License',
      name: 'tradingLicense',
    },
    {
      title: 'Address Approval',
      name: 'addressApproval',
    },
    {
      title: 'Insurance Certificate',
      name: 'insuranceCertificate',
    },
  ];

  shareholders = [
    {
      title: 'Passport',
      name: 'passport',
    },
    {
      title: 'Personal Identification',
      name: 'personalIdentification',
    },
    {
      title: 'Address Proof',
      name: 'addressProof',
    },
  ];

  directors = [
    {
      title: 'Passport',
      name: 'passport',
    },
    {
      title: 'Personal identification',
      name: 'personalIdentification',
    },
    {
      title: 'Address Proof',
      name: 'addressProof',
    },
  ];
  contracts = [
    {
      title: 'Upload Contract Docs',
      name: 'contractDocument',
      contractName: '',
      endDate: '',
      renewalDate: '',
      startDate: '',
    },
  ];
  companyInfo: any = {};
  @ViewChild('file') fileInput: ElementRef;
  fileDetails: any = {};
  constructor(
    private router: Router,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService
      .getData(PATH.COMPANY_INFORMATION)
      .subscribe(
        (res: any) => {
          if (!res) {
            this.spinnerService.hide();
            return;
          }
          if (!res.contractInformation) {
            res.contractInformation = [
              // {
              //   title: 'Upload Contract Docs',
              //   name: 'contractDocument',
              //   contractName: '',
              //   endDate: new Date(),
              //   renewalDate:  new Date(),
              //   startDate:  new Date(),
              // },
            ];
          } else {
            res.contractInformation.map((o) => {
              o.endDate = new Date(o.endDate);
              o.renewalDate = new Date(o.renewalDate);
              o.startDate = new Date(o.startDate);
            });
          }
          let branches = [];
          if (res.branchInOtherCountry) {
            res.branchInOtherCountry?.map((o) => {
              branches.push({ branch: o });
            });
            res.branchInOtherCountry = branches;
          }
          this.spinnerService.hide();

          this.companyInfo = res;
          if(this.companyInfo.status == 'Submitted'){
            this.disableBtn = true;
          }

          // this.toastrService.success('Company Information Updated Successfully');
        },
        (error) => {
          this.spinnerService.hide();
          
          // this.toastrService.error(error.message?.error);
        }
      );
  }
  upload(type, name, index) {
    this.fileDetails = { type: type, name: name, index: index };
    let i = this.documents.findIndex((d) => {
      return d.name == name;
    });
    this.fileInput.nativeElement.click();
  }
  addContract() {
    this.companyInfo.contractInformation.push({
      title: 'Upload Contract Docs',
      name: 'contractDocument',
      contractName: '',
      endDate: new Date(),
      renewalDate: new Date(),
      startDate: new Date(),
    });
  }
  deleteContract(index) {
    this.companyInfo.contractInformation.splice(index, 1);
    this.updateCompanyInfo();
  }

  uploadFile() {
    const fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      if (fileBrowser.files[0].size > 10485760) {
        this.toastrService.error('File size should be max 10MB', 'Error');
        return;
      }
      let data = new FormData();
      data.append('file', fileBrowser.files[0]);
      this.spinnerService.show();

      this.httpService.postData(PATH.FILE_UPLOAD,data).subscribe(
        (res) => {
          if (this.fileDetails.type == 'doc') {
            this.companyInfo[this.fileDetails.name] = res.fileName;
          } else if (this.fileDetails.type == 'shareholder') {
            this.companyInfo.shareHolders[this.fileDetails.index][
              this.fileDetails.name
            ] = res.fileName;
          } else if (this.fileDetails.type == 'director') {
            this.companyInfo.boardOfDirectors[this.fileDetails.index][
              this.fileDetails.name
            ] = res.fileName;
          } else if (this.fileDetails.type == 'contract') {
            this.companyInfo.contractInformation[this.fileDetails.index][
              this.fileDetails.name
            ] = res.fileName;
          }
          this.updateCompanyInfo();
          this.fileInput.nativeElement.value = '';
          this.toastrService.success("File uploaded successfully")
        },
        (err) => {
          this.spinnerService.hide();

          this.toastrService.error(err.message);
          this.fileInput.nativeElement.value = '';
        }
      );
      //  fileBrowser.files.forEach(function(file){
      //   this.files.push(file);
      //  })
    }
  }
  convertDate(dateString) {
    var dateParts: Array<any> = this.ngbDateParserFormatter
      .format(dateString)
      .split('/');

    // month is 0-based, that's why we need dataParts[1] - 1
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  }
  updateCompanyInfo() {
    this.spinnerService.show();
    delete this.companyInfo.branchInOtherCountry;
    // this.companyInfo.contractInformation.map((o) => {
    //   o.endDate = new Date(o.endDate);
    //   o.renewalDate = new Date(o.renewalDate);
    //   o.startDate = new Date(o.startDate);
    // });
    this.httpService.updateData(PATH.COMPANY_INFORMATION,this.companyInfo).subscribe(
        (res) => {
          this.validateDocs();
          this.companyInfo = res;
          this.spinnerService.hide();
          this.getCompanyInfo();
          // this.callParent.emit({
          //   step: this.companyInfo.step,
          //   url: '/vendor/vendor-info/3',
          // });
        },
        (error) => {
          this.spinnerService.hide();
          
        }
      );
  }
  deleteFile(type, name, index, filename) {
    this.httpService
      .deleteData(PATH.DELETE_FILE + filename)
      .subscribe((res) => {
        this.toastrService.success('File Deleted Successfully!');
        if (type == 'doc') {
          this.companyInfo[name] = null;
        } else if (type == 'shareholder') {
          this.companyInfo.shareHolders[index][name] = null;
        } else if (type == 'director') {
          this.companyInfo.boardOfDirectors[index][name] = null;
        }
        this.updateCompanyInfo();
      });
  }

  next() {
    this.submitted = true;
    if (this.validateDocs()) {
      if (this.companyInfo.step <= 3) {
        this.companyInfo.step = 3;
      }
      this.updateCompanyInfo();
      this.router.navigate(['/vendor/vendor-info/3']);
      this.callParent.emit({
        step: 3,
        url: '/vendor/vendor-info/3',
      });
    } else {
      this.toastrService.error('Please Upload All Documents', 'Error');
    }
  }

  skip() {
    this.router.navigate(['/vendor/vendor-info/3']);
  }

  validateDocs() {
    if (this.submitted) {
      let invalidElements = [];
      let validElements = [];
      this.documents.map((o) => {
        if (!this.companyInfo[o.name]) {
          invalidElements.push(document.getElementById(o.name));
        } else {
          validElements.push(document.getElementById(o.name));
        }
      });
      this.shareholders.map((o) => {
        this.companyInfo.shareHolders.map((shareHolder, index) => {
          if (!shareHolder[o.name]) {
            invalidElements.push(document.getElementById(o.name + index));
          } else {
            validElements.push(document.getElementById(o.name + index));
          }
        });
      });
      this.directors.map((o) => {
        this.companyInfo.boardOfDirectors.map((director, index) => {
          if (!director[o.name]) {
            invalidElements.push(document.getElementById('bod'+o.name + index));
          } else {
            validElements.push(document.getElementById('bod'+o.name + index));
          }
        });
      });
      validElements.map((o) => {
        o.classList.remove('b-red');
      });
      if (invalidElements.length) {
        debugger
        invalidElements.map((o) => {
          o.classList.add('b-red');
        });
        invalidElements[0].scrollIntoView();
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
  download(filename) {
    if(filename){
      this.spinnerService.show();
      let type = this.checkDocumentType(filename);
      this.httpService.download(PATH.GET_UPLOADED_FILE+filename).subscribe((res)=>{
        this.spinnerService.hide();
        var file = new Blob([res], {type: type});
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
    }else{
      this.toastrService.error('Please Upload Document', 'Error');
    }
  }
  



  goNext(){
    this.router.navigate(['vendor/vendor-info/3']);
    this.callParent.emit({
      step: this.companyInfo.step,
      url: '/vendor/vendor-info/3',
    });
  }


  checkDocumentType(filename){
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

  back() {
    this.router.navigate(['/vendor/vendor-info/1']);
    this.callParent.emit({
      step: 1,
      url: '/vendor/vendor-info/1',
    });
  }
}
