import { Router } from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-add-company-user',
  templateUrl: './add-company-user.component.html',
  styleUrls: ['./add-company-user.component.scss']
})
export class AddCompanyUserComponent implements OnInit {
  checked: boolean = false;
  // userForm:any;

  constructor(private router: Router,
    private formBuilder:FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService) { }

  userForm=this.formBuilder.group({
    firstName:["",[Validators.required]],
    email:["",[Validators.required]],
    mobileNumber:['',[Validators.required]],
    lastName:['',[Validators.required]],
    // locations: this.formBuilder.group({
    //   selectAll: [''],
    //   location1: [''],
    //   location2: [''],
    //   location3: [''],
    //   location4: [''],
    //   location5: [''],
    //   location6: [''],
    //   location7: ['']
    // }),
    // accessRoles: this.formBuilder.group({
    //   selectAll: [''],
    //   upload: [''],
    //   approve: [''],
    //   read: [''],
    //   addUsers: [''],
    //   reports: [''],
    // }),
    // departments: this.formBuilder.group({
    //   selectAll: [''],
    //   administration: [''],
    //   finance: [''],
    //   management: [''],
    //   humanResource: [''],
    //   marketing: [''],
    //   sales: [''],
    // }),
    })



  ngOnInit(): void {
    this.prepareUserForm();
  }

  prepareUserForm(){
    }

  get f() {
    return this.userForm.controls;
  }

  locationChange(){
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

  submit(){
    if (this.userForm.invalid) {
      this.toastrService.error('Please fill all the required fields');
      return
    }
    let formData = this.userForm.value;
    this.spinnerService.show();
    let subscription = this.httpService
      .postData(PATH.USER_MANAGEMENT, this.userForm.value)
      .subscribe(
        (res) => {
          this.spinnerService.hide();
          this.toastrService.success('Company User Created Successful');
          this.router.navigate(['/vendorcompanyuser/companyuser']);
        },
        (err) => {
          this.spinnerService.hide();
          this.toastrService.error(err.message.message);
        })
  }
}
