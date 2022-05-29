import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { PATH } from 'src/app/app.constant';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-bank-dashboard',
  templateUrl: './bank-dashboard.component.html',
  styleUrls: ['./bank-dashboard.component.scss']
})
export class BankDashboardComponent implements OnInit {

  cisId: any;
  entityId: any;
  title:any;
  dashboardData:any;
  constructor(
    private ar: ActivatedRoute,
    public dialogService: DialogService,
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      this.cisId = params.id;
      if (this.cisId) { this.getData(); }
    })
   if(localStorage.getItem('entityId')){
    this.entityId = localStorage.getItem('entityId');
   }
  }

  getData() {
    this.spinnerService.show();
    this.httpService.getDataSearch(PATH.GET_SEARCH_CIS_BY_ID + '/' + this.cisId).subscribe((res: any) => {
      res.cisDataBestMatchList.forEach(element => {
        if(element.entityId == this.entityId)
        {
          this.title = element.name;      
        }
      });
      res.cisDataPotentialMatchList.forEach(element => {
        if(element.entityId == this.entityId)
        {
          this.title = element.name;        
        }
      });
      this.spinnerService.hide();
    },
      (err) => {
        this.spinnerService.hide();
        this.toastrService.error(err.message.message);
      })
  }

}
