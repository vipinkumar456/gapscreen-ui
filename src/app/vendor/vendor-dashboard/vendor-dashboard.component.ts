import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import Stepper from 'bs-stepper';
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
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  isDashboard:true;
  isDirectors:true;
  adverseMedia:any;
  constructor(private router: Router,
    private formBuilder:FormBuilder,
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private messageService: MessageService,
    private confirmationService:ConfirmationService,
    private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    this.adverseMedia=[
      {
        title:'It is a long established fact that a reader will be distracted by readable.',img:'../../assets/images/login-bg.jpg'
      },
      {
        title:'It is a long established fact that a reader will be distracted by readable.',img:'../../assets/images/login-bg.jpg'
      },
      {
        title:'It is a long established fact that a reader will be distracted by readable.',img:'../../assets/images/login-bg.jpg'
      },
      {
        title:'It is a long established fact that a reader will be distracted by readable.',img:'../../assets/images/login-bg.jpg'
      }
    ]
  }
}
