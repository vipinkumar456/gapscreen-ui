import { Component, OnInit,Input  } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TableSettingComponent } from '../table-setting/table-setting.component';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  headers: Array<any>
  vendors: Array<any>;
  _selectedColumns: any[];
  order: any = 'desc';
  col: any = 'createdDate';
  numberOfElements:any;
 
  constructor(private modalService: NgbModal,
    private router: Router,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private appCookieService: AppCookieService,
    private spinnerService: NgxSpinnerService,
    private messageService: MessageService,
    ) {   
   
}

  ngOnInit(): void {
    this.getCompanyInfo();
    this.prepareHeader();
    
  }
  prepareHeader(){
    this.headers = [
      { name: 'companyName', header: 'Company Name', sort: true,isAsc:true},
      { name: 'category', header: 'Category', sort: true,isAsc:true},
      { name: 'location', header: 'Location', sort: false,isAsc:false},
      { name: 'reviewState', header: 'Review State', sort: true,isAsc:true},
      { name: 'screeningStatus', header: 'Screening Status', sort: false,isAsc:false},
      { name: 'riskRating', header: 'Risk Rating', sort: true,isAsc:true},
      { name: 'action', header: 'Action', sort: false,isAsc:false},
    ]; 
    this._selectedColumns = this.headers;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
}
   set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.headers.filter(col => val.includes(col));
    }
  getCompanyInfo(){
    this.spinnerService.show();
    this.httpService
      .getData(`${PATH.COMPANY_INFORMATION}?page=${this.page}&size=${this.pageSize}&sort=${this.col},${this.order}`)
      .subscribe(
        (res: any) => {
          this.spinnerService.hide();
          this.vendors=res['content'];
          this.collectionSize=res.totalElements;
          this.numberOfElements=res.numberOfElements;
        },
        (error) => {
          this.spinnerService.hide();
          // this.toastrService.error(error.message?.error);
        }
      );
  }

  sortBy(type, details) {
    let order = '';
    order = details.isAsc ? 'asc' : 'desc';
    this.httpService
      .getData(`${PATH.COMPANY_INFORMATION}?page=${this.page}&size=${this.pageSize}&sort=${type},${order}`)
      .subscribe(
      (res : any) => {
        details.isAsc = !details.isAsc;
        this.vendors=res['content'];
        this.collectionSize=res.totalElements;
        this.numberOfElements=res.numberOfElements;
       
      },
      (err) => {
        ;
      }
    );
  }
  updatePageSize() {
    this.getCompanyInfo();
  }

  refreshPages() {
    this.getCompanyInfo();
  }

  open(itm){
    if(itm=='rating'){
    const modalRef = this.modalService.open(TableSettingComponent);
    modalRef.componentInstance.type = 'rating';
    modalRef.componentInstance.data='';
    
    }
     if(itm=='tableModal'){
    const modalRef = this.modalService.open(TableSettingComponent);
    modalRef.componentInstance.type = 'tableSetting';
    modalRef.componentInstance.data='';
    }
  
  }
 


}
