import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-invitesheet',
  templateUrl: './invitesheet.component.html',
  styleUrls: ['./invitesheet.component.scss']
})
export class InvitesheetComponent implements OnInit {
  documents = [
    {
      title: 'Bulk Invite Sheet',
      name: 'bulkInviteSheet',
    },
  ];
  tableheadingNames = [
    {
      title: "country",
      name: "Country"
    },
    {
      title: "name",
      name: "Company Name"
    },
  
    {
      title: "registrationReferenceType",
      name: "Registration Reference Type"
    },
    {
      title: "registrationNumber",
      name: "Registration Number"
    },
    {
      title: "firstName",
      name: "First Name"
    },
    {
      title: "lastName",
      name: "Last Name"
    },
    {
      title: "emailId",
      name: "Email Id"
    },
    {
      title: "phoneNumber",
      name: "Phone Number"
    },
   
  ];

  userForm: Array<any>=[];
  submitted:boolean=false;
  tableNames: Array<any> = [];

  @ViewChild('file') fileInput: ElementRef;
  fileDetails: any = {};
  constructor( private router: Router,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) { }

  ngOnInit(): void {

    this.prepareTable()
  }

  prepareTable(){
    this.tableNames=[ 
      { title: "country",name: "Country",inpType: "text",required: true},
      { title: "companyName",name: "Company Name",inpType: "text",required: true},  
      { title: "registrationReferenceType",name: "Registration Reference Type",inpType: "text",required: true},
      { title: "registrationNumber",name: "Registration Number",inpType: "text",required: true},
      { title: "firstName",name: "First Name",inpType: "text"},
      { title: "lastName",name: "Last Name",inpType: "text"},
      { title: "emailId",name: "Email Id",inpType: "text"},   
      { title: "phoneNumber",name: "Phone Number",inpType: "text"},
    ]
  }
  upload() {
   
    this.fileInput.nativeElement.click();
  }
  download(filename) {
    this.httpService
      .getData(PATH.GET_FILE + filename)
      .subscribe((res: string) => {
        window.open(res, '_blank');
      });
  }

  delete(val){
    const index: number = this.userForm.indexOf(val);
    this.userForm.splice(index, 1);
  }

  deleteFile() {
    this.userForm=[];
  }
  uploadFile() {
    const fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      if (fileBrowser.files[0].size > 10485760) {
        this.toastrService.error('File size shold be max 10MB', 'Error');
        return;
      }
      let data = new FormData();
      data.append('file', fileBrowser.files[0]);
      this.spinnerService.show();

      this.httpService.postData(PATH.POST_CUSTOMER_BULK_INVITES,data).subscribe(
        (res) => {
          this.userForm=res;
          console.log(this.userForm);
          this.spinnerService.hide();
          this.fileInput.nativeElement.value = '';
          this.toastrService.success("File uploaded successfully")
          this.submitted=false;
        },
        (err) => {
          this.spinnerService.hide();

          this.toastrService.error(err.message);
          this.fileInput.nativeElement.value = '';
        }
      );

    }
  }

  bulkInvite(){
    this.httpService.download(PATH.GET_VENDOR_BULK_INVITES+'?fileName='+'customer_bulk_invites.xlsx').subscribe((res)=>{
      var file = new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      var fileName = 'customer_invite';
      link.download = fileName;
      link.click();
    })
  }
  
  submit(){
    console.log(this.userForm);
    let payload;
    for(var i=0;i<this.userForm.length;i++){
      let data=this.userForm[i];
      data.name=data.companyName;
      data.type=data.registrationReferenceType;
      data.identificationNumber=data.registrationNumber;

      if(!data.country)
      {
        this.toastrService.error('Please fill Country');
        return;
      }

      if(!data.name){
        this.toastrService.error('Please fill company Name');
        return;
      }
      if(!data.type){
        this.toastrService.error('Please fill Registration Reference Type');
        return;
      }
      if(!data.identificationNumber){
        this.toastrService.error('Please fill Registration Number');
        return;
      }
      if(!data.firstName){
        this.toastrService.error('Please fill First Name');
        return;
      }
      if(!data.lastName){
        this.toastrService.error('Please fill Last Name');
        return;
      }
      if(!data.emailId){
        this.toastrService.error('Please fill Email Id');
        return;
      } 
      if(!data.phoneNumber){
        this.toastrService.error('Please fill phone Number');
        return;
      } 
    }
    payload=this.userForm;
      this.spinnerService.show();
      this.httpService.postData(PATH.BULK_REGISTER_COMPANY_ADMIN,payload).subscribe((res)=>{
      this.spinnerService.hide();
      this.toastrService.success('Invite Sent Successfully');
      this.submitted=true;
      this.userForm=[];
      },(err)=>{
        this.spinnerService.hide();
       
        this.toastrService.error(err.message.message);
      })
    }
}
