import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PATH } from "../../app.constants";
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-compliance-users',
  templateUrl: './compliance-users.component.html',
  styleUrls: ['./compliance-users.component.scss']
})
export class ComplianceUsersComponent implements OnInit {
  users: Array<any> = []
  cols = [];
  username: string = "";
  activePage: number = 0;
  searchApi:boolean=false;
  pager: any = {};
  page: number = 1;
  size: number = 5;
  pages: number[] = [];
  headers:Array<any>=[ {
    name: 'User Name',
    APIname: 'userName',
    isAsc: true,
  },]
  type:string ="userName";
  order:string ="asc";
  division: string="";
  displayModal: boolean;
  reportId: any;
  isEditCompliance:boolean=false;
  updateType;
  constructor(private httpService: HttpService, private router: Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.httpService.getData(`${PATH.COMPLIANCE_GET_ALL}`).subscribe(res => {
      this.users=[];
      this.users=res;
    })
  }
  
  edit(reportId) {
    this.displayModal = true;
    this.reportId = reportId;
    // this.router.navigate(['compliance-adminPanel', 'edit', reportId]);
  }

  updateReport(val){
    this.updateType = val;
    this.displayModal = false;
    this.isEditCompliance = true;
  }

  getUser() {
    if (this.division!="") {
      this.httpService.getData(PATH.COMPLIANCE_SEARCH + "?value="+this.division  ).subscribe(res => {
         console.log(res)
        this.users=[];
        this.users=res;
        console.log(this.users)
        this.searchApi=true;
      })
    } else{
      this.httpService.getData(`${PATH.COMPLIANCE_GET_ALL}`).subscribe(res => {
      this.users=[];
      this.users=res;
    })
    }
  }

  delete(username){
    this.httpService.deleteData(PATH.GET_USER + username).subscribe(res=>{
      this.getAll()
    })
  }

  goBack(ev){
    console.log(ev)
    this.isEditCompliance = false;
    this.getAll()
  }
 
}
