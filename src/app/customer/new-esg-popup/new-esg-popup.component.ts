import { HttpService } from 'src/app/services/http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
@Component({
  selector: 'app-new-esg-popup',
  templateUrl: './new-esg-popup.component.html',
  styleUrls: ['./new-esg-popup.component.scss']
})
export class NewEsgPopupComponent implements OnInit {

  formSubmitAttempt: boolean = false;
  esg:any;

  constructor( private formBuilder: FormBuilder, 
    private httpService: HttpService,
    private toastrService: ToastrService, 
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private ref: DynamicDialogRef,
    private dialogService : DynamicDialogConfig,
    public DialogService:DialogService,
  ) { }
  public addNewEsgForm = this.formBuilder.group({
    question: ['', [Validators.required]],
    score: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if(this.dialogService.data.id){
      this.esg = this.dialogService.data.id;
      this.getESG(this.dialogService.data.id);
    }
   
  }
  get f() {
    return this.addNewEsgForm.controls;
  }

  save(){
    this.formSubmitAttempt=true;
    if(this.addNewEsgForm.invalid){
      return;
    }else{
      this.spinnerService.show();
      let payload = this.addNewEsgForm.value;
      
      if(!this.esg){
        delete payload.id
      }
      const request=this.esg? this.httpService.updateData(PATH.SETTING_ESG+'/{id}?id='+this.esg,payload):  this.httpService.postData(PATH.SETTING_ESG,payload)
      request.subscribe((res)=>{
        this.spinnerService.hide();
        this.toastrService.success('ESG Saved Successfully!');
        this.ref.close(); 
        this.formSubmitAttempt=false;
        this.addNewEsgForm.reset()
      },(err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.message);
      })
    }  
  }

  getESG(id){
    this.spinnerService.show();
    this.httpService.getData(PATH.SETTING_ESG+ '/' + id).subscribe((res)=>{
      this.addNewEsgForm.patchValue(res);
      this.spinnerService.hide();
    },(err) => {
      this.spinnerService.hide();
      this.toastrService.error(err.message.message);
    })
  }

  onClear(){
  this.ref.destroy();
  }


}
