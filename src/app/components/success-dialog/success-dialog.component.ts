import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html'
})
export class SuccessDialogComponent implements OnInit {

  @Input() type;
  dialogFor:string;
  companyId:any
  companyInfoData:any;
  constructor(private router:Router, private activeModal:NgbActiveModal,
    private httpService:HttpService,
    private spinnerService:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.dialogFor = this.type;
    this.companyId=localStorage.getItem('customerCompanyId');
  if(this.companyId){
    this.getDefaultCompanyInfo();
  }
  }

  
  getDefaultCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION+ '/' + this.companyId).subscribe((res: any) => {
          this.spinnerService.hide();
          this.companyInfoData = res;
          this.spinnerService.hide();

        },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  gotoLogin(){
    this.activeModal.close();
    this.router.navigate(['/login']);
  }

  closeDialog(){
    this.activeModal.close();
  }

  goToInvite(){
    this.activeModal.close();
    this.router.navigate(['/admin/invitecustomer']);
  }

  goToUser(){
    this.activeModal.close();
    this.router.navigate(['/customer/user-management']);  
  }

  goToVendor(){
    this.activeModal.close();
    this.router.navigate(['/vendor/user-management']);    
  }

  goToCustomer(){
    this.activeModal.close();
    // this.router.navigate(['/customer/invite-customer']);    
  }
}
