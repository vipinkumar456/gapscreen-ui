import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PATH } from 'src/app/app.constant';
import { HttpService } from './../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {DialogService} from 'primeng/dynamicdialog';
import { CustomerRfiComponent } from '../customer-rfi/customer-rfi.component';

@Component({
  selector: 'app-customer-uploaddocument',
  templateUrl: './customer-uploaddocument.component.html',
  styleUrls: ['./customer-uploaddocument.component.scss']
})
export class CustomerUploaddocumentComponent implements OnInit {
  getCompanyInfo() {
    // throw new Error('Method not implemented.');
  }

  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  boardOfDirectorsInfo:any;
  certificateOfIncorporation:any;
  companyId:any;
  step:any;
  passport:"1652176234085-INVESTMENT_DECLARATION_SHEET_-2023.pdf";
  id:any; 
  pdfData:any=[];
  shareHolders: any = [];
  boardOfDirectors: any = [];
  contractInformation:any;
  ocrData:any;
  constructor(
    private toastService: ToastrService,
    private formBuilder: FormBuilder,
    private httpService:HttpService, 
    private spinnerService: NgxSpinnerService,
    private ar:ActivatedRoute,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    this.getVendorBoardOfDirectorsInfo();
    this.ar.params.subscribe((params)=>{
    this.id=params.id;     
    })
    this.getOcrData();
  }


  getVendorBoardOfDirectorsInfo(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_CUSTOMER_COMPANY_INFORMATION + '/' + this.companyId).subscribe((res:any)=>{  
      this.pdfData = res;
      res.shareHolders.forEach(element => {
        this.shareHolders = element
      });
      res.boardOfDirectors.forEach(element => {
        this.boardOfDirectors = element;
      });
      this.contractInformation = res.contractInformation;

      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      this.toastService.error(error.message?.error);
  })
  }


  getOcrData(){
    this.httpService.getData(PATH.GET_OCR).subscribe((res:any)=>{  
      this.ocrData = res;
    })
  }
 
  rfiModal(){
    const ref = this.dialogService.open(CustomerRfiComponent, {
      header: 'Request For Company Information',
      width: '50%',
      data:{type:'uploadDocument',companyInformationId:this.pdfData.id,organizationId:this.pdfData.organizationId}
  });
  }

  download(evt) {
    this.spinnerService.show();
    let type = this.checkDocumentType( evt);
    this.httpService.download(PATH.GET_UPLOADED_FILE+evt).subscribe((res)=>{
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

    next(){
      this.router.navigate(['customer/view-vendor/3']);
      this.callParent.emit({
          step: 3,
          url: '/customer/view-vendor/2',
        });
    }

    back(){
      this.router.navigate(['/customer/view-vendor/1']);
      this.callParent.emit({
          step: 1,
          url: '/customer/view-vendor/1',
        });
    }
}
