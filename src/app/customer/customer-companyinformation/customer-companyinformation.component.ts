import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PATH } from 'src/app/app.constant';
import { HttpService } from './../../services/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {DialogService} from 'primeng/dynamicdialog';
import { CustomerRfiComponent } from '../customer-rfi/customer-rfi.component';
@Component({
  selector: 'app-customer-companyinformation',
  templateUrl: './customer-companyinformation.component.html',
  styleUrls: ['./customer-companyinformation.component.scss']
})
export class CustomerCompanyinformationComponent implements OnInit {
  
  formSubmitAttempt: boolean = false;
  uploaded: boolean;
  companyInfo:any;
  errorMsg;
  isbranch;
  imgUrl;
  infoForm;
  companyId:any;
  board:any=[];
  share:any=[];
  isFormChanged:boolean=false;
  
  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  

  constructor(
    private httpService:HttpService, 
    private spinnerService: NgxSpinnerService,
    private router : Router,
    public dialogService: DialogService) {}


  ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    this.getVendorCompanyInfo();
    // this.getCompanyInfo();
  }



  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
      console.log(res);
      this.spinnerService.hide();
          if (!res) {
            return;
          }
          if(res){
          this.isFormChanged = false;
          this.companyInfo = res;
          }
          // this.toastrService.success('Company Information Updated Successfully');
        },
        (err)=>{
          this.spinnerService.hide();
          let errorMsg=err.error.message;
          // this.toastrService.error(errorMsg);
        })
  }



  getFile(data){
    console.log("filename",data);
    
    this.httpService.getImage(PATH.GET_UPLOADED_FILE+data).subscribe((res)=>{
      this.imgUrl = res;
    })
  }








  getVendorCompanyInfo(){
    this.httpService.getData(PATH.GET_CUSTOMER_COMPANY_INFORMATION + '/' + this.companyId).subscribe((res:any)=>{
      this.companyInfo=res;
      let data = res.companyLogo;
      this.getFile(data)
      res.boardOfDirectors.forEach(element => {
        this.board=element
      });
      res.shareHolders.forEach(element => {
        this.share=element
        
      });
    })
  }
  
  rfiModal(){
    const ref = this.dialogService.open(CustomerRfiComponent, {
      header: 'Request For Company Information',
      width: '50%',
      data:{type:'companyInfo',companyInformationId:this.companyInfo.id,organizationId:this.companyInfo.organizationId}
  });
  }


  postData() {
    this.formSubmitAttempt = true
    if (this.infoForm.invalid) {
      return;
    } else {
      this.formSubmitAttempt = false;
      this.infoForm.reset();
    }
  }

  
  next(){
    this.router.navigate(['customer/view-vendor/2']);
    this.callParent.emit({
        step: 2,
        url: '/customer/view-vendor/2',
      });
  }

  back(){
    this.router.navigate(['/customer/invite-customer']);
  }
}
