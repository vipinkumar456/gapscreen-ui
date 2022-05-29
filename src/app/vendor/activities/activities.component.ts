import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import { PATH } from 'src/app/app.constant';
import { AppCookieService } from 'src/app/services/cookieService';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  activities: Array<any> = [];
  user: any;
  constructor(
    private appCookieService: AppCookieService,
    private httpService: HttpService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.appCookieService.get('digiUser'));
    this.getActivities();
  }

  getActivities() {
    this.spinnerService.show();
    this.httpService.getData(PATH.AUDIT_HISTORY + this.user.username).subscribe(
      (res: any) => {
        if (res.length) {
          this.activities = res;
        } else {
          this.activities = [res];
        }
       this.spinnerService.hide(); 
      },
      (error) => {
        this.spinnerService.hide();
        this.activities = [];
      }
    );
  }
}
