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
     if(url.endsWith('/report-on-ownership-view')){
      checkObject=[{role:"ROLE_OWNERSHIP_REPORT_CHECKER"},{role:"ROLE_OWNERSHIP_REPORT_MAKER"}]
     }


    if(url.endsWith('/suspicion-reports')){
      checkObject=[{role:"ROLE_CAML_C11_SUSPICION_REPORTS_MAKER"},{role:"ROLE_CAML_C11_SUSPICION_REPORTS_CHECKER"}]
    }
    
    if(url.endsWith('/sanction-caution-list')){
      checkObject=[{role:"ROLE_CAML_C10_SANCTION_CAUTION_CUSTOMERS_MAKER"},{role:"ROLE_CAML_C10_SANCTION_CAUTION_CUSTOMERS_CHECKER"}]
    }

    if(url.endsWith('/penalties-related-matters')){
      checkObject=[{role:"ROLE_CAML_E3_AMLCFT_RELATED_MATTERS_MAKER"},{role:"ROLE_CAML_E3_AMLCFT_RELATED_MATTERS_CHECKER"}]
    }
    
    if(url.endsWith('/Data-On-Kyc')){
      checkObject=[{role:"ROLE_ITD_F1_KYCAML_DATA_MAKER"},{role:"ROLE_ITD_F1_KYCAML_DATA_CHECKER"}]
    }

    if(url.endsWith('/IT-Base-Transaction-Monitoring')){
      checkObject=[{role:"ROLE_ITD_C12_IT_BASED_TMS_PERFORMANCE_MAKER"},{role:"ROLE_ITD_C12_IT_BASED_TMS_PERFORMANCE_CHECKER"}]
    }

    if(url.endsWith('/pff-kyc-cdd')){
      checkObject=[{role:"ROLE_KYC_A2_KYCCDD_POLICY_MAKER"},{role:"ROLE_KYC_A2_KYCCDD_POLICY_CHECKER"}]
     }


    if(url.endsWith('/AML-KYC-Related-Complaints')){
      checkObject=[{role:"ROLE_CUSTCARE_C13_AMLKYC_COMPLAINTS_MAKER"},{role:"ROLE_CUSTCARE_C13_AMLKYC_COMPLAINTS_CHECKER"}]
    }

    if(url.endsWith('/KYC-AML-DEFICIENCIES')){
      checkObject=[{role:"ROLE_CUSTCARE_C13A_KYCAML_DEFICIENCIES_MAKER"},{role:"ROLE_CUSTCARE_C13A_KYCAML_DEFICIENCIES_CHECKER"}]
    }

    if(url.endsWith('/cash-retention-limit')){
      checkObject=[{role:"ROLE_CASH_RETENTION_LIMIT"}]
    }

    if(url.endsWith('/Jurisdictions-Reviews-Overdue')){
      checkObject=[{role:"ROLE_NIL_DATA_C3_JURISDICTIONS_REVIEW_STATUS_MAKER"},{role:"ROLE_NIL_DATA_C3_JURISDICTIONS_REVIEW_STATUS_CHECKER"}]
    }

    if(url.endsWith('/Jurisdictions-Risk-Profile')){
      checkObject=[{role:"ROLE_NIL_DATA_B8_JURISDICTIONS_RISK_PROFILE_MAKER"},{role:"ROLE_NIL_DATA_B8_JURISDICTIONS_RISK_PROFILE_CHECKER"}]
    }

    if(url.endsWith('/compliance-aml-cft-review')){
      checkObject=[{role:"ROLE_IAD_E1_AMLCFT_AUDITOR_REVIEWS_COMPLIANCE_MAKER"},{role:"ROLE_IAD_E1_AMLCFT_AUDITOR_REVIEWS_COMPLIANCE_CHECKER"}]
    }

    if(url.endsWith('/Audit')){
      checkObject=[{role:"ROLE_IAD_E2B_AUDIT_MAKER"},{role:"ROLE_IAD_E2B_AUDIT_CHECKER"}]
    }

    if(url.endsWith('/internal-audit-aml-cft')){
      checkObject=[{role:"ROLE_IAD_E2A_AMLCFT_INTERNAL_AUDIT_REVIEWS_MAKER"},{role:"ROLE_IAD_E2A_AMLCFT_INTERNAL_AUDIT_REVIEWS_CHECKER"}]
    }

    if(url.endsWith('/face-to-face-customers')){
      checkObject=[{role:"ROLE_SHARES_B2_FTOF_CUSTOMERS_PROFILE_MAKER"},{role:"ROLE_SHARES_B2_FTOF_CUSTOMERS_PROFILE_CHECKER"}]
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
     if(url.endsWith('/reporton-profitability')){
      checkObject=[{role:"ROLE_REPORT_ON_PROFITABILITY"}]
     }
     if(url.endsWith('/country-exposure-maturity')){
      checkObject=[{role:"ROLE_COUNTRY_EXPOSURE_MATURITY"}]
     }
     if(url.endsWith('/alo')){
      checkObject=[{role:"ROLE_ALO"}]
     }
     if(url.endsWith('/pci')){
      checkObject=[{role:"ROLE_PCI"}]
     }
     if(url.endsWith('/revised-gap-sheet')){
      checkObject=[{role:"ROLE_ANALYTICAL_LEADS"}]
     }
   



     if(url.endsWith('/jurisdictions-profile-review')){
      checkObject=[{role:"ROLE_DBMD_B7_BOJ_RISK_REVIEW_POLICY_MAKER"},{role:"ROLE_DBMD_B7_BOJ_RISK_REVIEW_POLICY_CHECKER"}]
     }
     if(url.endsWith('/jurisdictions-bank-new')){
      checkObject=[{role:"ROLE_DBMD_A3_BOJNY_MAKER"},{role:"ROLE_DBMD_A3_BOJNY_CHECKER"}]
     }
     if(url.endsWith('/profile-nonface-customers')){
      checkObject=[{role:"ROLE_DBMD_B3_NFTOF_CUSTOMERS_PROFILE_MAKER"},{role:"ROLE_DBMD_B3_NFTOF_CUSTOMERS_PROFILE_CHECKER"}]
     }
     if(url.endsWith('/aml-cft-riskmanagement')){
      checkObject=[{role:"ROLE_CAML_A4_AMLCFTRMF_APPLICATION_MAKER"},{role:"ROLE_CAML_A4_AMLCFTRMF_APPLICATION_CHECKER"}]
     }
     if(url.endsWith('/mapping-bank-aml')){
      checkObject=[{role:"ROLE_CAML_A5_AMLCFTCRSCPC_MAPPING_MAKER"},{role:"ROLE_CAML_A5_AMLCFTCRSCPC_MAPPING_CHECKER"}]
     }
     if(url.endsWith('/transaction-monitoring')){
      checkObject=[{role:"ROLE_CAML_A6_TRANSACTION_MONITORING_SYSTEMS_MAKER"},{role:"ROLE_CAML_A6_TRANSACTION_MONITORING_SYSTEMS_CHECKER"}]
     }
     if(url.endsWith('/existing-respondent-correspondent-banks')){
      checkObject=[{role:"ROLE_IBD_C1_RCB_TERMINATED_MAKER"},{role:"ROLE_IBD_C1_RCB_TERMINATED_CHECKER"}]
     }
     if(url.endsWith('/profile-of-respondent')){
      checkObject=[{role:"ROLE_IBD_B5_RCB_PROFILE_MAKER"},{role:"ROLE_IBD_B5_RCB_PROFILE_CHECKER"}]
     }
     if(url.endsWith('/profile-of-new-respondent')){
      checkObject=[{role:"ROLE_IBD_B6_NRCB_PROFILE_MAKER"},{role:"ROLE_IBD_B6_NRCB_PROFILE_CHECKER"}]
     }
     if(url.endsWith('/inactive-dormant-accounts')){
      checkObject=[{role:"ROLE_CAML_C4_INACTIVE_DORMANT_ACCOUNTS_MAKER"},{role:"ROLE_CAML_C4_INACTIVE_DORMANT_ACCOUNTS_CHECKER"}]
     }
     if(url.endsWith('/post-transaction')){
      checkObject=[{role:"ROLE_CAML_C9_POST_TRANSACTION_ALERTS_MAKER"},{role:"ROLE_CAML_C9_POST_TRANSACTION_ALERTS_CHECKER"}]
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
