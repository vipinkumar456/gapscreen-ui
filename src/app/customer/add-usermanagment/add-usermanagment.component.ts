import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
import { email } from 'src/app/services/custom.validations';

@Component({
  selector: 'app-add-usermanagment',
  templateUrl: './add-usermanagment.component.html',
  styleUrls: ['./add-usermanagment.component.scss']
})
export class AddUsermanagmentComponent implements OnInit {

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
     value:'ROLE_CUSTOMER_COMPANY_INFO'
   }, {
    label:'File Upload',
    value:'ROLE_CUSTOMER_UPLOAD'
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
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private modalService:NgbModal,
    private confirmationService:ConfirmationService) { }

  userForm=this.formBuilder.group({
    firstName:["",[Validators.required]],
    email:["",[Validators.required,email]],
    mobileNumber:['',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    lastName:['',[Validators.required]],
    access_Roles:this.formBuilder.array([]),
    departments:this.formBuilder.array([]),
    locations:this.formBuilder.array([]),
    })



  ngOnInit(): void {
  }

  get f() {
    return this.userForm.controls;
  }


  locationChange(){
    console.log('check',this.userForm.value.locations.selectAll);
    
    if(this.userForm.value.locations.selectAll==true){
      this.userForm.get('locations').patchValue({
        location1:true,location2:true,location3:true,location4:true,location5:true,location6:true,location7:true  
        })
    }
    if(this.userForm.value.locations.selectAll==false){
      this.userForm.get('locations').patchValue({
        location1:false,location2:false,location3:false,location4:false,location5:false,location6:false,location7:false  
        })
    }
    if(this.userForm.value.accessRoles.selectAll==true){
      this.userForm.get('accessRoles').patchValue({
        upload:true,approve:true,read:true,addUsers:true,reports:true
        })
    }
    if(this.userForm.value.accessRoles.selectAll==false){
      this.userForm.get('accessRoles').patchValue({
        upload:false,approve:false,read:false,addUsers:false,reports:false  
        })
    }
    if(this.userForm.value.departments.selectAll==true){
      this.userForm.get('departments').patchValue({
        administration:true,finance:true,management:true,humanResource:true,marketing:true,sales:true  
        })
    }
    if(this.userForm.value.departments.selectAll==false){
      this.userForm.get('departments').patchValue({
        administration:false,finance:false,management:false,humanResource:false,marketing:false,sales:false
        })
    }
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
    this.spinnerService.show();
    let formData = this.userForm.value;
      let subscription = this.httpService
      .postData(PATH.USER_MANAGEMENT, this.userForm.value)
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
    modelRef.componentInstance.type = 'addUser';
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
