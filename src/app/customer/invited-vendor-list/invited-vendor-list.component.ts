import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {Router } from '@angular/router';

@Component({
  selector: 'app-invited-vendor-list',
  templateUrl: './invited-vendor-list.component.html',
  styleUrls: ['./invited-vendor-list.component.scss']
})
export class InvitedVendorListComponent implements OnInit {

  checked: boolean=true;
  showMe: boolean = false
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  customerHeaders: Array<any>
  customerPortList: Array<any>
  order: any = 'desc';
  col: any = 'createdDate';
  numberOfElements: any;
  invitedVendorList:any
  regStatusData:any;
  status: any;
  users: any = [];
  user:any;
  invited: number = 0;
  pending: number = 0;
  register: number = 0;

  constructor(public dialogService: DialogService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private confirmationService:ConfirmationService,
    private router: Router
    ) { }


  ngOnInit(): void {
    this.prepareCustomerHeaders();
    this.getAllVendors();
    this.getRegistrationStatus();
    // this.getUser();
  }


  getAllVendors(){
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_ALL_VENDOR+'?page=1&size=50').subscribe((res)=>{
      this.invitedVendorList=res['content']
      this.invitedVendorList.forEach(elm => {
        elm.fullName = elm.firstName+' '+elm.lastName
        // elm.status = 'Pending Approval'
      });
      this.spinnerService.hide();
    },
    (error) => {
      this.spinnerService.hide();
      
    })
  }

  prepareCustomerHeaders() {
    this.customerHeaders = [
      // { name: 'companyId', header: 'Company ID', sort: true, isAsc: true },
      { name: 'name', header: 'Company Name', sort: true, isAsc: true },
      { name: 'fullName', header: 'Customer Name.', sort: true, isAsc: false },
      { name: 'emailId', header: 'Email ID', sort: true, isAsc: false },
      // { name: 'country', header: 'Country', sort: true, isAsc: false },
      { name: 'phoneNumber', header: 'Phone Number', sort: true, isAsc: false },
      { name: 'status', header: 'Status', sort: true, isAsc: false },
      { name: '', header: '' },
      { name: '', header: '' },
    ];
  }

  getRegistrationStatus(){
    this.httpService.getData(PATH.REGISTRATION_STATUS_VENDOR).subscribe((res:any)=>{

      this.regStatusData = res;
      res.forEach(element => {   
        if (element.category == 'Registered') {
          this.register = element.count
        }

        if (element.category == 'Approval Pending') {
          this.pending = element.count
        }
        if (element.category == 'Invited') {
          this.invited = element.count
        }
      });

    })
  }

  toogleTag() {
    this.showMe = !this.showMe
  }


  changeStatus(user) {
    this.confirmationService.confirm({
      message:"Are you sure that you want to change status?",
      accept:()=>{
    let usersId = user.companyId;
    this.status = user.isActive;
    let url =  PATH.VENDOR_ACTIVE_INACTIVE+usersId+"?status="+ this.status;
    this.spinnerService.show();
    this.httpService.statusData(url).subscribe((res) => {
        this.spinnerService.hide();
        this.toastrService.success('Status Changed Successfully');
        
      }, (err) => {
        this.spinnerService.hide();
        this.toastrService.error('Status Changed Failed');
        
      })
    },reject:()=>{      
      
    }
  })
  
  }
  // view(id){
  //   // localStorage.setItem('customerCompanyId',id);
  //   // this.router.navigate(['/customer/view-vendor']);
    
  // }

  vendorOpen(id){
    this.router.navigate(['/customer/view-vendor/1']);
    localStorage.setItem('customerCompanyId',id);
  }

}
