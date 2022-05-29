import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-bank-compliance',
  templateUrl: './bank-compliance.component.html',
  styleUrls: ['./bank-compliance.component.scss']
})
export class BankComplianceComponent implements OnInit {

  headers: Array<any>
  bestMatch: Array<any>;
  cisId: any;
  entityId: any;
  title:any;
  dashboardData:any;

  constructor(  private ar: ActivatedRoute,
    public dialogService: DialogService,
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  
    this.prepareHeaders();
    this.ar.params.subscribe((params) => {
      this.cisId = params.id;
    })
    this.entityId = localStorage.getItem('entityId');
    this.getResult();
  }
  prepareHeaders(){
    this.headers = [
      { name: 'keyinfo', header: 'Key Information', sort: true,isAsc:true},
      { name: '', header: ''},
    ]; 
    this.bestMatch=[
        {name:'Company AM', data:'New Zealand Ministry of Foreign Affairs and Trade Russia Sanctions Act',para:'(Added to list On: Wednesday 20th April 2022)',
        data1:'DFAT Australia Consolidated Sactions List',data2:'OFAC Consolidated List',data3:'Norway Sanctions and Restrictive Measures',
        data4:'South Korea Financial Sanctions against Russia'
      },
    ]
  }


 
  getResult() {
    this.spinnerService.show();
    this.httpService.getDataSearch(PATH.GET_CIS_RECORDS + '?cisId=' + this.cisId + "&entityId=" + this.entityId).subscribe((res: any) => {
      this.dashboardData = res;
      this.spinnerService.hide();
    },
      (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.message);
      })
  }

}
