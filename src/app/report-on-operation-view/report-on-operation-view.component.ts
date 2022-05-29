import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from '../app.constants';
import { HttpService } from '../services/http.service';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-report-on-operation-view',
  templateUrl: './report-on-operation-view.component.html',
  styleUrls: ['./report-on-operation-view.component.scss']
})
export class ReportOnOperationViewComponent implements OnInit {

  reportData:any=[];
  rejectedData:any=[];
  submittedData:any=[];
  cols: any[];
  heading;
  roles: Array<any> = [];
  role: any = {};
  isChecker: boolean = false;
  isMaker: boolean = false;

  constructor(private httpService: HttpService, private router: Router,private roleAuthGuard:RoleAuthGuardService) { }

  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
    this.heading="DSB XII Report On Operation";
    this.tableCol();
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
     if (this.role.ROLE_INFORMATION_REPORT_MAKER) {
      this.isMaker = true
      // this.getReportData();
      this.getRejectedData('REJECTED');
      this.getSubmittedData('SUBMITTED');

    }
    if (this.role.ROLE_INFORMATION_REPORT_CHECKER) {
      this.isChecker = true
      this.getReportDatabyStatus('SUBMITTED');
    }
    
    
    
  }

  tableCol(){
    this.cols = [
      { field: 'subsidiaryCategory', header: 'Subsidiary/Associate/Joint Venture Category', width:'200px' },
      { field: 'operationArea', header: 'Area of operation of related party', width:'200px' },
      { field: 'subsidiaryCode', header: 'Subsidiary/Associate/Joint Venture Code', width:'200px' },
      { field: 'subsidiaryName', header: 'Subsidiary/Associate/Joint Venture Name', width:'200px' },
      { field: 'activityName', header: 'Activity Name', width:'200px' },
      { field: 'regulatoryName', header: 'Regulator Name', width:'200px' },
      { field: 'status', header: 'Status', width:'200px' },
      { field: 'createdOn', header: 'Created On', width:'200px' },
      { field: 'createdBy', header: 'Created By', width:'200px' }
    ];
  }
  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }
  getReportDatabyStatus(status){
    this.httpService.getData(PATH.INFORMATIONREPORT_STATUS,{status:status}).subscribe((res) => {
      this.reportData = res;
    })
  }

  getRejectedData(status){
    this.httpService.getData(PATH.INFORMATIONREPORT_STATUS,{status:status}).subscribe((res) => {
      this.rejectedData = res;
      this.reportData=this.rejectedData.concat(this.submittedData);
      console.log(this.reportData);
    })
  }
  getSubmittedData(status){
    this.httpService.getData(PATH.INFORMATIONREPORT_STATUS,{status:status}).subscribe((res) => {
      this.submittedData = res;
      console.log(this.rejectedData);
      console.log(this.submittedData);
      this.reportData=this.rejectedData.concat(this.submittedData);
      console.log(this.reportData);
    })
  }

  getReportData(){
    this.httpService.getData(PATH.INFORMATIONREPORT_GET).subscribe((res) => {
      this.reportData = res;
    })
  }

  newReport(type){
    this.router.navigate(["report-on-operation", type,'']);
  }

  viewReport(type,rdt){
    let id;
    id=rdt.id;
    this.router.navigate(["report-on-operation", type,id]);
  }

}
