import { Component, ElementRef, OnInit, Input,ViewChild, Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { SuccessDialogComponent } from 'src/app/components';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class AddUserComponent implements OnInit {
  @Input() type;
  @Input() data;
  @Output() newCategory:EventEmitter<any>=new EventEmitter<any>();
  isNew:boolean=false;
  isEdit:boolean=false;
  formSubmitAttempt:boolean=false;
  userForm:any;
  hasError:boolean;
  eroles:any;
  allRoles:any;
  selectedRole:any;
  onError(obj) {
    this.hasError = obj;
  }
  constructor(private modal: NgbActiveModal,
              private formBuilder:FormBuilder,
              private httpService:HttpService,
              private toastrService:ToastrService,
              private spinnerService:NgxSpinnerService,
              private modalService:NgbModal,
              private appCookieService:AppCookieService,
              private router:Router,
              private messageService: MessageService,
              private confirmationService:ConfirmationService,) {}

  ngOnInit(): void {
    if(this.type=='Add'){
      this.isNew=true;
    }
    else
    {
      this.isEdit=true;
    }
    this.prepareUserForm();
   

    if(this.isEdit){
      this.userForm.controls['username'].disable();
    }
    this.prepareRoles();
  }
  
  prepareUserForm(){
    this.userForm=this.formBuilder.group({
    username:["",Validators.required],
    id:[""],
    mobileNumber:['',Validators.required],
    email:['',[Validators.email]],
    eroles:['']
    })
  //  for(var i=0;i<this.data.eroles.length;i++){
  //    if(this.data.eroles[i]=='ROLE_View_Information'){
  //      this.data.eroles[i]={}
  //      this.data.eroles[i].name="ROLE_View_Information"
  //      this.data.eroles[i].code="ROLE_View_Information"
  //    }
  //  }
    this.userForm.patchValue(this.data);
    this.userForm.patchValue({
      id:this.data.organizationId
    })
  }
  get f() {
    return this.userForm.controls;
  }

  prepareRoles(){
  this.allRoles = [
    'ROLE_ADMIN',
    'ROLE_EDIT_Information',
    'ROLE_Upload_Documents',
    'ROLE_View_Information'
  ];
  }

  close(){
    this.modal.dismiss();
  }
  submit(type) {
    
    let payload:any={};
    payload.companyLogo=this.data.companyLogo
    payload.theme=this.data.theme
    let val=this.userForm.value;
    if(!val.mobileNumber){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Phone Number is required",
      });
      return;
   
    }
    if(val.eroles.length==0){
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "Role is required",
      });
      return;
   
    }
    payload.username=this.data.username;
    payload.mobileNumber=val.mobileNumber
    payload.organizationId=this.data.organizationId;
    payload.eroles=val.eroles;
    let eroles:any=val.eroles;
    // for(var i=0;i<eroles.length;i++){
    //   payload.eroles.push(eroles[i]['value']);
    // }
    if(this.userForm.valid){
      if(type=='edit'){
        this.httpService.patchData(PATH.UPDATE_USER,payload).subscribe(res=>{
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Edit Successfully",
            });
            this.modal.dismiss();
            this.newCategory.next(res);
            
          },
          (error) => {
              this.toastrService.error(error.message?.error);
          }
        );
      }
    }
    
  }
}
