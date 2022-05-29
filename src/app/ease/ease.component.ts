import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { RoleAuthGuardService } from '../role-auth-guard.service';
@Component({
  selector: 'app-ease',
  templateUrl: './ease.component.html',
  styleUrls: ['./ease.component.scss']
})
export class EaseComponent implements OnInit {
  quarters = [ { label: "Q1", title: "Apr - June" }, { label: "Q2", title: "July - Sep" }, { label: "Q3", title: "Oct - Dec" }, {label: "Q4", title: "Jan - March" }]
  years = [{ name: "2024-2025", title: "2024-2025" },{ name: "2023-2024", title: "2023-2024" },{ name: "2022-2023", title: "2022-2023" },{ name: "2021-2022", title: "2021-2022" },{ name: "2020-2021", title: "2020-2021" }, { name: "2019-2020", title: "2019-2020" }, { name: "2018-2019", title: "2018-2019" }]
  quarter: string = "Q1";
  finYear: string = "2019-2020";
  headers = ["Performance Indicator", "Area Wise Breakup", "AP Wise Breakup", "Performance"]
  constructor(private router: Router, private httpService: HttpService, private roleAuthGuard:RoleAuthGuardService) { }
  ngOnInit(): void {
     this.roleAuthGuard.canActivate();
  }

  submit() {
    let selection = {}
    selection["finYear"] = this.finYear ? this.finYear : this.finYear['name'];
    selection["quarter"] = this.quarter ? this.quarter : this.quarter['name'];
    this.httpService.setSelectionObs(selection);
  }

}
