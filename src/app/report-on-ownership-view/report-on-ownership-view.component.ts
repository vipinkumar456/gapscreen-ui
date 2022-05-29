import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from '../app.constants';
import { HttpService } from '../services/http.service';
import { RoleAuthGuardService } from '../role-auth-guard.service';

@Component({
  selector: 'app-report-on-ownership-view',
  templateUrl: './report-on-ownership-view.component.html',
  styleUrls: ['./report-on-ownership-view.component.scss']
})
export class ReportOnOwnershipViewComponent implements OnInit {

  heading:any;
  roles: Array<any> = [];
  role: any = {};
  isChecker: boolean = false;
  isMaker: boolean = false;
  reportData:any=[];
  rejectedData:any=[];
  submittedData:any=[];
  cols: any[];

  constructor(private httpService: HttpService, private router: Router,private roleAuthGuard:RoleAuthGuardService) { }

  ngOnInit(): void {
    this.heading="DSB VII Report On Ownership and Control";
  
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
     if (this.role.ROLE_OWNERSHIP_REPORT_MAKER) {
      this.isMaker = true
      // this.getReportData();
      this.getRejectedData('REJECTED');
      this.getSubmittedData('SUBMITTED');

    }
    if (this.role.ROLE_OWNERSHIP_REPORT_CHECKER) {
      this.isChecker = true
      this.getSubmittedData('SUBMITTED');
    }
    
 }

 tableCol(){
  this.cols = [
    // { field: 'returnName', header: 'Return Name', width:'200px' },
    // { field: 'returnCode', header: 'Return Code', width:'200px' },
    // { field: 'reportingInstitution', header: 'Reporting Institution', width:'200px' },
    // { field: 'bankCode', header: 'Bank Code', width:'200px' },
    // { field: 'address', header: 'Address', width:'200px' },
    // { field: 'quarterEnded', header: 'Quarter Ended', width:'200px' },
    // { field: 'reportingFrequency', header: 'Reporting Frequency', width:'200px' },
    { field: 'dateOfReport', header: 'Date of Report', width:'200px' },
    { field: 'currentState', header: 'Current State', width:'200px' },
    { field: 'createdDate', header: 'Created Date', width:'200px' },
    { field: 'createdBy', header: 'Created By', width:'200px' }
  ];
}

 newReport(type){
  this.router.navigate(["ownership-general-info-section1",type,'']);
}

viewReport(type,rdt){
  let id;
  id=rdt.ownershipReportId;
  this.router.navigate(["ownership-general-info-section1",type,id]);
}

 getRejectedData(state){
  this.httpService.getData(PATH.OWNERSHIPREPORTS_STATE+state).subscribe((res) => {
    this.rejectedData = res;
    this.reportData=this.rejectedData.concat(this.submittedData);
    console.log(this.reportData);
  })
}
getSubmittedData(state){
  this.httpService.getData(PATH.OWNERSHIPREPORTS_STATE+state).subscribe((res) => {
    this.submittedData = res;
    this.reportData=this.rejectedData.concat(this.submittedData);
    console.log(this.submittedData);
    this.tableCol();
  })
}

 getRoles() {
  this.roles.map((o) => {
    this.role[o.role] = true;
  });
}

}
