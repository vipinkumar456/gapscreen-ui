import { HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuardService {

  role: any = {};
  roles: Array<any> = [];
  isChecker: boolean = false;
  isMaker: boolean = false;
  constructor(private router: Router) { }

  canActivate()
    {
      if (sessionStorage.getItem('gapToken')) {
      this.handle();
      return true;
    } else {
      this.router.navigate(["/logout"]);
    }
    }

  handle()
  {
    let isFound=false;
    let token=sessionStorage.getItem("gapToken");
    if (sessionStorage.getItem("gapRoles")) {
      this.roles = JSON.parse(sessionStorage.getItem("gapRoles"));
      this.getRoles()
    }
 
   let url=window.location.href;
  
   if(token){
     let check='';
     let makerCheck='';
     let checkObject;
     
      if(url.endsWith('/report-on-operation')){
        checkObject=[{role:"ROLE_INFORMATION_REPORT_CHECKER"},{role:"ROLE_INFORMATION_REPORT_MAKER"}]
      }
      if(url.endsWith('/equifax')){
        checkObject=[{role:"ROLE_EQUIFAX"}]
      }
      if(url.endsWith('/banking')){
        checkObject=[{role:"ROLE_OMBUDSMAN"}]

     }
     if(url.endsWith('/counterfeit')){
      checkObject=[{role:"ROLE_COUNTERFEIT"}]
     }
     if(url.endsWith('/ncrb')){
      checkObject=[{role:"ROLE_NCRB"}]
     }
     if(url.endsWith('/fortnightly')){
      checkObject=[{role:"ROLE_FORTNIGHTLY_CHECKER"},{role:"ROLE_FORTNIGHTLY_MAKER"}]
     }
     if(url.endsWith('/reporting')){
      checkObject=[{role:"ROLE_EXPOSURE_QCCP_CHECKER"},{role:"ROLE_EXPOSURE_QCCP_MAKER"}]
     }
     if(url.endsWith('/unreconciled')){
      checkObject=[{role:"ROLE_UNRECONCILED_MAKER"},{role:"ROLE_UNRECONCILED_CHECKER"}]
     }
     if(url.endsWith('/nostro')){
      checkObject=[{role:"ROLE_NOSTRO_ACCOUNTS_CHECKER"},{role:"ROLE_NOSTRO_ACCOUNTS_MAKER"}]
     }
     if(url.endsWith('/report-on-ownership-general-information')){
      checkObject=[{role:"ROLE_OWNERSHIP_REPORT"}]
     }
     if(url.endsWith('/gap')){
      checkObject=[{role:"ROLE_COMPLIANCE"}]
     }
     if(url.endsWith('/ease')){
      checkObject=[{role:"ROLE_EASE"}]
     }
     if(url.endsWith('/top20')){
      checkObject = [
        {  role: "ROLE_TOP_20_STRESSED_ACCOUNTS_MAKER"}, {   role: "ROLE_TOP_20_STRESSED_ACCOUNTS_CHECKER" }, {   role: "ROLE_TOP_20_WATCHLIST_ACCOUNTS_MAKER" },
        {  role: "ROLE_TOP_20_WATCHLIST_ACCOUNTS_CHECKER"}, {   role: "ROLE_TOP_20_PROVISIONING_ACCOUNTS_STANDARD_MAKER" }, {   role: "ROLE_TOP_20_PROVISIONING_ACCOUNTS_STANDARD_CHECKER" },
        {  role: "ROLE_TOP_20_BORROWAL_ACCOUNTS_STANDARD_MAKER"}, {   role: "ROLE_TOP_20_BORROWAL_ACCOUNTS_STANDARD_CHECKER" }, {   role: "ROLE_TOP_20_BORROWAL_ACCOUNTS_NPA_MAKER" },
        {  role: "ROLE_TOP_20_BORROWAL_ACCOUNTS_NPA_CHECKER"}, {   role: "ROLE_TOP_20_ACCOUNTS_DCCO_MAKER" }, {   role: "ROLE_TOP_20_ACCOUNTS_DCCO_CHECKER" },
        {  role: "ROLE_ACCOUNTS_RP_INPLEMENTED_STANDARD_MAKER"}, {   role: "ROLE_ACCOUNTS_RP_INPLEMENTED_STANDARD_CHECKER" }, {   role: "ROLE_ACCOUNTS_RP_INPLEMENTED_NPA_MAKER" },
        {  role: "ROLE_ACCOUNTS_RP_INPLEMENTED_NPA_CHECKER"}, {   role: "ROLE_ACCOUNTS_RP_NOT_IMPLEMENTED_STANDARD_MAKER" }, {   role: "ROLE_ACCOUNTS_RP_NOT_IMPLEMENTED_STANDARD_CHECKER" },
        {  role: "ROLE_ACCOUNTS_RP_NOT_IMPLEMENTED_NPA_MAKER"}, {   role: "ROLE_ACCOUNTS_RP_NOT_IMPLEMENTED_NPA_CHECKER" }, {   role: "ROLE_ACCOUNTS_IBC_STANDARD_MAKER" },
        {  role: "ROLE_ACCOUNTS_IBC_STANDARD_CHECKER"}, {   role: "ROLE_ACCOUNTS_IBC_NPA_MAKER" }, {   role: "ROLE_ACCOUNTS_IBC_NPA_CHECKER" }
       ];
     }
     if(url.endsWith('/positions')){
      checkObject = [
        {  role: "ROLE_GROSS_ADVANCES_MAKER"}, {   role: "ROLE_GROSS_ADVANCES_CHECKER" }, {   role: "ROLE_POSITION_RECOVERY_MAKER" },
        {  role: "ROLE_POSITION_RECOVERY_CHECKER"}, {   role: "ROLE_POSITION_RECOVERY_CHECKER" }, {   role: "ROLE_PIPELINE_STRESS_MAKER" },
        {  role: "ROLE_PIPELINE_STRESS_CHECKER"}, {   role: "ROLE_EXTERNAL_RATING_FRESH_SANCTIONS_MAKER" }, {   role: "ROLE_EXTERNAL_RATING_FRESH_SANCTIONS_CHECKER" },
       ];
     }
     
        for(var i=0;i<this.roles.length;i++){
            for(var j=0;j<checkObject.length;j++){
                if(checkObject[j]['role']==this.roles[i]['role']){
                    console.log('url matched');
                    isFound=true;  
                    return true;
                }
            }
        }
    
        if(!isFound){
          this.router.navigate(["home"]);
        }
    }
  }

  getRoles() {
    this.roles.map((o) => {
      this.role[o.role] = true;
    });
  }
}
