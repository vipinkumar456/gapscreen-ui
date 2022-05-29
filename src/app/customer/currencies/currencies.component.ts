import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {

  formSubmitAttempt:boolean=false;
  
  public informationForm = this.formbuilder.group({

    baseCurrency: ['',Validators.required],
  })
 
  get f(){
    return this.informationForm.controls
  }
  postData(){
    this.formSubmitAttempt=true;
    if(this.informationForm.invalid){
      return;
    }else{
      this.formSubmitAttempt=false;
      this.informationForm.reset()
    }
  }
  onClear(){
    this.informationForm.reset();
    this.formSubmitAttempt=false
  }
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
  }


}
