import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-add-case-managment',
  templateUrl: './add-case-managment.component.html',
  styleUrls: ['./add-case-managment.component.scss']
})
export class AddCaseManagmentComponent implements OnInit {

  
  maxDate=new Date();
  supplier:any
  formSubmitAttempt:boolean=false;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.supplier = [
      {name: 'Sealinks'},
      {name: 'Searoad'},
      {name: 'Seaways Shipping'},
      {name: 'Sea Bear Shipping'},
      {name: 'Seaborne Freight Inc.'},
  ];
  }

  
  public caseForm = this.formbuilder.group({

    startDate: ['',Validators.required],
    referenceNumber: ['',Validators.required],
    supplierCustomer: ['',Validators.required],
    note: ['',Validators.required],
  })


  get f(){
    return this.caseForm.controls
  }
  postData(){
    this.formSubmitAttempt=true;
    if(this.caseForm.invalid){
      return;
    }else{
      this.formSubmitAttempt=false;
      this.caseForm.reset();
    }
  }
  onClear(){
    this.caseForm.reset();
    this.formSubmitAttempt=false
  }



}
