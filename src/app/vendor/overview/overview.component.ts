import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  basicData: any;
  customer: Array<any> = []; 
  basicOptions: any;
  companyInfo:any;

  constructor( private router: Router,
    private sharedService: SharedService,
    private httpService: HttpService,
    private appCookieService: AppCookieService,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  


    this.basicData = {
      labels: ['2020', '2021', '2022'],
      datasets: [
          {
              label: 'Revenue',
              backgroundColor: '#2b2c41',
              data: [65, 59, 80]
          },
          {
              label: 'Net Profit',
              backgroundColor: '#f19937',
              data: [28, 48, 40]
          }
      ]
  };

  this.customer=[
    {numbers:'390',heading:'Total Assests',img:'../../assets/images/arrow-up.png',cost:'400', assests:'2.5%', year:'Previous Year'},
    {numbers:'250',heading:'Net Assets',img:'../../assets/images/arrow-down.png',cost:'280', assests:'4.1%', year:'Previous Year'},
    {numbers:'170',heading:'Current Liablities',img:'../../assets/images/arrow-up.png',cost:'190', assests:'2.5%', year:'Previous Year'},
    {numbers:'130',heading:'Cash in Hand',img:'../../assets/images/arrow-down.png',cost:'190', assests:'4.1%', year:'Previous Year'},
    {numbers:'2350',heading:'Turnover',img:'../../assets/images/arrow-up.png',cost:'2500', assests:'2.5%', year:'Previous Year'},
    {numbers:'3',heading:'Employees',img:'../../assets/images/arrow-up.png',cost:'4', assests:'25%', year:'Previous Year'},
    ]

  
this.getCompanyInfo();
  }


  getCompanyInfo() {
    this.spinnerService.show();
    this.httpService.getData(PATH.COMPANY_INFORMATION).subscribe((res: any) => {
          this.companyInfo = res;
          this.spinnerService.hide();
          },
        (error) => {
          this.spinnerService.hide();
        }
      );
  }

  gotovendordashboard(){
    this.router.navigate(['/vendor/vendor-info/1'])
  }

}
