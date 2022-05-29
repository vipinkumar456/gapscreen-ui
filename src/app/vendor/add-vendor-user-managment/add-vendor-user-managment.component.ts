import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
import { email } from 'src/app/services/custom.validations';
@Component({
  selector: 'app-add-vendor-user-managment',
  templateUrl: './add-vendor-user-managment.component.html',
  styleUrls: ['./add-vendor-user-managment.component.scss']
})
export class AddVendorUserManagmentComponent implements OnInit {

  checked: boolean = false;
  // userForm:any;
  countryCode='in';
  hasError: boolean;

  locations:any=[
    {
      label:'APAC',
      value:'APSC'
    },
    {
     label:'USA',
     value:'USA'
   },
   {
     label:'North America',
     value:'North America'
   },
   {
     label:'South America',
     value:'South America'
   },
   {
     label:'Africa',
     value:'Africa'
   }
  ]
 
  roles:any=[
    {
      label:'Company Information',
      value:'ROLE_VENDOR_COMPANY_INFO'
    }, {
     label:'File Upload',
     value:'ROLE_VENDOR_UPLOAD'
   }
  ]
  departments:any=[
    {
      label:'Administration',
      value:'Administration'
    },
   {
     label:'Finance',
     value:'Finance'
   },
   {
     label:'Management',
     value:'Management'
   },
   {
     label:'Human Resource',
     value:'Human Resource'
   },
   {
     label:'Marketing',
     value:'Marketing'
   },
   {
     label:'Sales',
     value:'Sales'
   }
  ]
 
  constructor(private router: Router,
    private formBuilder:FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private modalService:NgbModal,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) { }

  userForm=this.formBuilder.group({
    firstName:["",[Validators.required]],
    email:["",[Validators.required,email]],
    mobileNumber:['',[Validators.required]],
    lastName:['',[Validators.required]],
    access_Roles:this.formBuilder.array([]),
    departments:this.formBuilder.array([]),
    locations:this.formBuilder.array([]),
   
    })



  ngOnInit(): void {
    this.prepareUserForm();
  }

  prepareUserForm(){
    }

  get f() {
    return this.userForm.controls;
  }

  
  onLocationChange(e) {
    const checkArray: FormArray = this.userForm.get('locations') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onAccessChange(e){
    const checkArray: FormArray = this.userForm.get('access_Roles') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  
  }
  onDepartmentsChange(e){
    const checkArray: FormArray = this.userForm.get('departments') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } 
    else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  
  }
  submit(){
    if (this.userForm.invalid) {
      this.toastrService.error('Please fill all the required fields');
      return
    }
    if(!this.hasError){
      this.toastrService.error('Phone number is not valid');
      return
    }
    
    let formData = this.userForm.value;
    this.spinnerService.show();
    let subscription = this.httpService
      .postData(PATH.VENDOR_USER_MANAGEMENT, this.userForm.value)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.openSuccessModel(); 
          },
        (err) => {
          this.spinnerService.hide();
          this.toastrService.error(err.message.message);
        })
  }

  openSuccessModel(){
    let modelRef=this.modalService.open(SuccessDialogComponent,{
      ariaLabelledBy: "modal-basic-title",
      windowClass: "center",
    })
    modelRef.componentInstance.type = 'addVendorUser';
   }

  onError(obj) {
    this.hasError = obj;
  }

  onCountryChange(obj){
    this.countryCode = obj.iso2
  }

  numberOnly(event:any){   
    const regexpNumber = /[0-9]/;
    let inputCharacter = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !regexpNumber.test(inputCharacter)) {
      event.preventDefault();
    }
  }

}

