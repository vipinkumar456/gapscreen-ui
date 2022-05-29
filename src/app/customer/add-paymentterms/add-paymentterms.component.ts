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
  selector: 'app-add-paymentterms',
  templateUrl: './add-paymentterms.component.html',
  styleUrls: ['./add-paymentterms.component.scss']
})
export class AddPaymenttermsComponent implements OnInit {
  @Input() type;
  @Input() data;
  @Output() paymentTerms:EventEmitter<any>=new EventEmitter<any>();
  paymentForm:any;
  supplierNames: Array<any> = [];
  creditPeriods: Array<any> = [];
  isView:boolean=false;
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
    this.supplierNames=['Sealinks','Searroad'];
    this.creditPeriods=['45 Days','30 Days'];
    this.preparePaymentForm();
  }

  preparePaymentForm(){
    this.paymentForm=this.formBuilder.group({
      supplierName:["",Validators.required],
      prePayments:["",Validators.required],
      postPayments:['',Validators.required],
      creditPeriods:['',[Validators.required]],
      active:['',Validators.required]
      })
      if(this.data){
        this.paymentForm.patchValue(this.data)
      }
      if(this.type=='View'){
        this.isView=true;
        this.paymentForm.disable();
      }
  }

  get f() {
    return this.paymentForm.controls;
  }

  close(){
    this.modalService.dismissAll();
  }

  submit(){
    this.paymentForm.markAllAsTouched();
    if(this.paymentForm.valid){
      this.modalService.dismissAll();
      this.paymentTerms.next(this.paymentForm.value);
    }
  }

}
