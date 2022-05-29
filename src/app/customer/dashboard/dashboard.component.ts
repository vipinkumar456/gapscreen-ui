import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaptureShareComponent } from '../capture-share/capture-share.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customer: Array<any> = []; 
  suppliers: Array<any> = [];
  documentation: Array<any> = []; 
  conformance: Array<any> = [];
  percent=2.4;
  animation=true;
  customerGraph: any;
  supplierGraph:any
  data: any;
  chartOptions: any;
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
    this.prepareCustomerGraph();
    this.prepareTopCustomers();
    this.customer=[
      {numbers:'450',heading:'Compliance',img:'../../assets/images/dashboard-icons/icon1.png'},
      {numbers:'109',heading:'Risk',img:'../../assets/images/dashboard-icons/icon2.png'}
      ]
    this.suppliers=[
      {numbers:'250',heading:'Customer',img:'../../assets/images/dashboard-icons/icon4.png'},
      {numbers:'190',heading:'Vendor',img:'../../assets/images/dashboard-icons/icon5.png'}
    ]
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

  prepareCustomerGraph(){
    this.customerGraph = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
    };
  }

  prepareTopCustomers(){
    this.data = {
            labels: ['2','5','3'],
            datasets: [
                {


                  
// $font-size : 14px;
// $light-gray-color: #000;
// $red-color: #ea4335;
// $yellow-color: #fbbc05;
// $green-color:#34a853;

                    data: [130, 250, 100],
                    backgroundColor: [
                        "#ea4335",
                        "#fbbc05",
                        "#34a853"
                    ],
                    hoverBackgroundColor: [
                        "#ea4335",
                        "#fbbc05",
                        "#34a853"
                        // $red-color: #ea4335;
                        // $yellow-color: #fbbc05;
                        // $green-color:#34a853;
                    ]
                }
            ]
        };
  }    
  
  shareModal(){
    const modalRef = this.modalService.open(CaptureShareComponent,{centered:true});
    modalRef.componentInstance.type = 'Service';
  }
}
