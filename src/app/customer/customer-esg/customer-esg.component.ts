import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-customer-esg',
  templateUrl: './customer-esg.component.html',
  styleUrls: ['./customer-esg.component.scss']
})
export class CustomerEsgComponent implements OnInit {

  getCompanyInfo() {
    // throw new Error('Method not implemented.');
  }

  @Output('getCompanyInfo') callParent: EventEmitter<any> = new EventEmitter();
  companyId:any;
  companyInfo:any;

  constructor(
    private router: Router,
    private httpService:HttpService, 
    private toastrService: ToastrService,
    private ar:ActivatedRoute,
    private spinnerService: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.companyId=localStorage.getItem('customerCompanyId');
    this.getVendorCompanyInfo()
  }

  getVendorCompanyInfo(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_CUSTOMER_COMPANY_INFORMATION + '/' + this.companyId).subscribe((res:any)=>{
    this.companyInfo=res.esg;
    
    this.spinnerService.hide();
  },
    (error) => {
      this.spinnerService.hide();
      this.toastrService.error(error.message?.error);
    })

  }


  next(){
    // [routerLink]="['/customer/customer-regulations']"
    this.router.navigate(['customer/view-vendor/5']);
    this.callParent.emit({
        step: 5,
        url: '/customer/view-vendor/5',
      });
  }

  back(){
    this.router.navigate(['/customer/view-vendor/3']);
    this.callParent.emit({
        step: 3,
        url: '/customer/view-vendor/3',
      });  
  }
}
