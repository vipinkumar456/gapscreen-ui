import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-invite-customer',
  templateUrl: './invite-customer.component.html',
  styleUrls: ['./invite-customer.component.scss']
})
export class InviteCustomerComponent implements OnInit {

  showMe: boolean = false
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  customerHeaders: Array<any>
  customerPortList: Array<any>
  order: any = 'desc';
  col: any = 'createdDate';
  numberOfElements: any;
  invitedCustomerList: any
  regStatusData: any;
  status: any;
  invited: number = 0;
  pending: number = 0;
  register: number = 0;
  constructor(public dialogService: DialogService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private confirmationService: ConfirmationService,
    private spinnerService: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.prepareCustomerHeaders();
    this.getPendingUsers();
    this.getRegistrationStatus();
  }


  getPendingUsers() {
    this.spinnerService.show();
    this.httpService.getData(PATH.GET_ALL_COMPANIES+'?page=1&size=100').subscribe((res) => {
      this.invitedCustomerList = res['content']
      this.invitedCustomerList.forEach(elm => {
        elm.fullName = elm.firstName + ' ' + elm.lastName
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
      { name: 'country', header: 'Country', sort: true, isAsc: false },
      { name: 'phoneNumber', header: 'Phone Number', sort: true, isAsc: false },
      { name: 'status', header: 'Status', sort: true, isAsc: false },
      { name: '', header: '' },
      { name: '', header: '' },
    ];
    // this.invitedCustomerList=[
    //   {companyId:'08/10/2021',name:'Lorum',fullName:'DG109768',emailId:'Long Established',country:'India',
    //   phoneNumber:'Eastern Ship',status:'Eastern Ship'},

    // ]
  }

  getRegistrationStatus() {
    this.httpService.getData(PATH.REGISTRATION_STATUS).subscribe((res: any) => {
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


  // show and hide toggle button

  toogleTag() {
    this.showMe = !this.showMe
  }


  changeStatus(user) {
    this.confirmationService.confirm({
      message: "Are you sure that you want to change status?",
      accept: () => {
        let usersId = user.companyId;
        this.status = user.isActive;
        let url = PATH.VENDOR_ACTIVE_INACTIVE + usersId + "?status=" + this.status;
        this.spinnerService.show();
        this.httpService.statusData(url).subscribe((res) => {
          this.spinnerService.hide();
          this.toastrService.success('Status Changed Successfully');

        }, (err) => {
          this.spinnerService.hide();
          this.toastrService.error('Status Changed Failed');

        })
      }, reject: () => {

      }
    })

  }

}
