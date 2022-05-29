import { Component, ElementRef, OnInit, Input,ViewChild, Output,EventEmitter } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  @Input() type;
  @Input() data;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  order: any = 'desc';
  col: any = 'createdDate';
  checked: boolean=true;
  headers: Array<any>;
  status: any;
  users: any = [];
  user:any;

  constructor(private modalService: NgbModal,
    private router: Router,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private appCookieService: AppCookieService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    ) {  
  }     

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.prepareHeader();
    this.getUser();
  }

  prepareHeader(){
    this.headers = [
      { name: 'name', header: 'Name', sort: false,isAsc:false},
      { name: 'email', header: 'Email', sort: false,isAsc:false},
      { name: 'phoneNumber', header: 'Phone Number', sort: false,isAsc:false},
      { name: 'roles', header: 'Roles', sort: false,isAsc:false},
      { name: 'active', header: 'Active', sort: false,isAsc:false},
      { name: 'location', header: 'Location', sort: false,isAsc:false},
      { name: 'action', header: 'Action', sort: false,isAsc:false}
    ]; 
  }


  delete(item){
    
    this.confirmationService.confirm({
      message:"Are you sure that you want to delete?",
      accept:()=>{
        this.spinnerService.show();
        this.httpService.deleteData(PATH.USER_MANAGEMENT+ '/'+ item)
          .subscribe((res) => {
              this.spinnerService.hide();
              this.toastrService.success('Deleted Successfully!')
              this.getUser();
            },
            (error) => {
              this.spinnerService.hide();
              this.toastrService.error(error.message?.error);
            }
          );
      }
    })
  }
  

 getUser(){
  this.spinnerService.show();
  let subscription = this.httpService
    .getData(PATH.USER_MANAGEMENT)
    .subscribe((res) => {
      this.users = res;
      this.spinnerService.hide();
    },
      (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.payload.message);
      })
 }
  
 changeStatus(users) {   
   
  this.confirmationService.confirm({
    message:"Are you sure that you want to change status?",
    accept:()=>{
  let usersId = users.id;
  this.status = users.active;
  let url =  PATH.USER_MANAGEMENT+'?id='+usersId+"&status="+ this.status;
  this.spinnerService.show();
  this.httpService.statusData(url).subscribe((res) => {
      this.spinnerService.hide();
      this.toastrService.success('Status Changed Successfully!');
      this.getUser();
    }, (err) => {
      this.spinnerService.hide();
      this.toastrService.error('Status Changed Failed');
      this.getUser();
    })
  },reject:()=>{      
    this.getUser();
  }
})

}


  sortBy(type, details) {
    let order = '';
    order = details.isAsc ? 'asc' : 'desc';
    this.httpService
      .getData(`${PATH.GET_USER}?page=${this.page}&size=${this.pageSize}&sort=${type},${order}`)
      .subscribe(
      (res : any) => {
        details.isAsc = !details.isAsc;
        this.users=res['content'];
        this.collectionSize=res.totalElements;
       
      },
      (err) => {
      }
    );
  }


  updatePageSize() {
    // this.getUsers();
  }

  refreshPages() {
    // this.getUsers();
  }
}
