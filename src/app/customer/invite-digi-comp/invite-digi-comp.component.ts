import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SuccessDialogComponent } from 'src/app/components/success-dialog/success-dialog.component';
import { Country, State, City } from 'country-state-city';
import { ICity } from 'country-state-city/dist/lib/interface';
import * as _ from 'lodash';
import { businessEmail, ConfirmedValidator, email } from 'src/app/services/custom.validations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invite-digi-comp',
  templateUrl: './invite-digi-comp.component.html',
  styleUrls: ['./invite-digi-comp.component.scss']
})
export class InviteDigiCompComponent implements OnInit {
  user: any;
  error: boolean = false;
  errorMsg: string = '';
  countryCode='in';
  hasError: boolean=false;
  permissionTasks:FormArray;
  get practiceControls(){
    return (<FormArray>this.usersForm.get('permissionTasks')).controls;
  }
  

  formSubmitAttempt: boolean = false;
  public countries = Country.getAllCountries();
  public oprationalCities: Array<ICity> = [];
  public registeredCities: Array<ICity> = [];

  constructor(private httpService: HttpService, 
    private appCookieService: AppCookieService, 
    private modalService:NgbModal,
    private toastService:ToastrService,
    private spinnerService:NgxSpinnerService,
    private formBuilder: FormBuilder,) { }

  public usersForm = this.formBuilder.group({    
    permissionTasks: this.formBuilder.array([this.createItem()])
  });

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    if (localStorage.getItem('userData')) {
      this.usersForm.patchValue(JSON.parse(localStorage.getItem('userData')));
    }
  }
  createItem(){
    return this.formBuilder.group({
      "country": [''],
      "emailId": ['',[Validators.required,email]],
      "firstName": ['',[Validators.required]],
      "identificationNumber": [''],
      "lastName": ['',[Validators.required]],
      "name": ['',[Validators.required]],
      "phoneNumber": ['',[Validators.required]],
      "type": ['',],
      "vendorType": ['',[Validators.required]],
      "financialInformationFlag":['',[Validators.required]]
    });
  }
  addItem(){
    this.permissionTasks = this.usersForm.get('permissionTasks') as FormArray;
    this.permissionTasks.push(this.createItem());
  }
  removeBtn(index: number){
    this.permissionTasks?.removeAt(index)
  }

  getUserFormData(data:any){
    let payload = data.permissionTasks;
    this.usersForm.markAllAsTouched();
    if (this.usersForm.invalid) {
      return;
    }
    else{
      
        this.spinnerService.show();
        delete payload.eroles;
        this.httpService.postData(PATH.INVITE_VENDOR,payload).subscribe((res)=>{
        this.spinnerService.hide();
        this.openSuccessModel();
        this.usersForm.reset();
        this.formSubmitAttempt=false;
      },(err)=>{
        this.spinnerService.hide();
        this.error=true;
        this.errorMsg=err.message.message;
        this.toastService.error(this.errorMsg);
      })
    }
  }

  submit(){
    
    if(!this.hasError){
      this.toastService.error('Phone number is not valid');
      return
    }
  }
  get f() {
    return this.usersForm.controls;
  }
  
  openSuccessModel(){
    let modelRef=this.modalService.open(SuccessDialogComponent,{
      ariaLabelledBy: "modal-basic-title",
      windowClass: "center",
    })
    modelRef.componentInstance.type = 'invite';
  }

  onError(obj) {
    debugger
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






















// start from here
