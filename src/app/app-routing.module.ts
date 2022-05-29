import { AuditComponent } from './audit/audit.component';
import { JurisdictionsRiskProfileComponent } from './jurisdictions-risk-profile/jurisdictions-risk-profile.component';
import { JurisdictionsReviewsOverdueComponent } from './jurisdictions-reviews-overdue/jurisdictions-reviews-overdue.component';
import { AMLComponent } from './Deficiencies-in-KYC/aml/aml.component';
import { AMLKYCRelatedComplaintsComponent } from './aml-kyc-related-complaints/aml-kyc-related-complaints.component';
import { TransactionMonitoringSystemsComponent } from './transaction-monitoring-systems/transaction-monitoring-systems.component';
import { DataOnKycComponent } from './data-on-kyc/data-on-kyc.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { LoginComponent } from "./login/login.component";
import { GapScreenComponent } from "./gap-screen/gap-screen.component";
import { AnnexComponent } from "./annex/annex.component";
import { StressRelatedComponent } from './stress-related/stress-related.component';
import { AccountCanDeactivateService, BankingCanDeactivateService } from './services/saveTable.service';
import { EaseComponent } from './ease/ease.component';
import { StressRelatedVerticalComponent } from './stress-related-vertical/stress-related-vertical.component';
import { BankingComponent } from "./banking/banking.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthGuard } from "./auth.gaurd";
import { LogoutComponent } from "./logout/logout.component";
 import { Top20Component } from "./top20/top20.component";
 import { PositionsComponent} from "./positions/positions.component";
import { Top20NewComponent } from "./top20-new/top20-new.component";
import { CounterfeitComponent} from "./counterfeit/counterfeit.component";
import { NcrbComponent } from "./ncrb/ncrb.component";
import { FortnightlyComponent } from "./fortnightly/fortnightly.component";
import { ExposureQccpComponent } from "./exposure-qccp/exposure-qccp.component";
 import { EquifaxComponent } from "./equifax/equifax.component"
import { ReportingComponent } from "./reporting/reporting.component";
import { UnreconciledComponent } from "./unreconciled/unreconciled.component";
import { NostroComponent } from "./nostro/nostro.component";
import { MadComponent } from "./mad/mad.component";
import { ReportOnOperationComponent } from "./report-on-operation/report-on-operation.component";
import { ReportOnOperationViewComponent } from "./report-on-operation-view/report-on-operation-view.component";
import { ReportOnOwnershipGeneralInformationComponent } from "./report-on-ownership-general-information/report-on-ownership-general-information.component";
import { OwnershipGeneralInfoSection2Component } from "./ownership-general-info-section2/ownership-general-info-section2.component";
import {AnalyticalLeadComponent} from './analytical-lead/analytical-lead.component';
import {AnalyticalLeadFollowUpComponent} from './analytical-lead-follow-up/analytical-lead-follow-up.component';
import { ReportOnOwnershipViewComponent } from "./report-on-ownership-view/report-on-ownership-view.component";
import { ALOComponent } from "./alo/alo.component";
import { ReportonProfitabilityComponent } from "./reporton-profitability/reporton-profitability.component";
import { CountryExposureMaturityComponent } from "./country-exposure-maturity/country-exposure-maturity.component";
import { PCIComponent } from "./pci/pci.component";
import { OwnershipGeneralInfoSection1Component } from "./ownership-general-info-section1/ownership-general-info-section1.component";
import { PffKycCddComponent } from "./pff-kyc-cdd/pff-kyc-cdd.component";
import { ProfileNonfaceToFaceComponent } from "./profile-nonface-to-face/profile-nonface-to-face.component";
import { JurisdictionsBankNewpresenceComponent } from "./jurisdictions-bank-newpresence/jurisdictions-bank-newpresence.component";
import { JurisdictionsProfileReviewComponent } from "./jurisdictions-profile-review/jurisdictions-profile-review.component";
import { AmlCftRiskmanagementComponent } from "./aml-cft-riskmanagement/aml-cft-riskmanagement.component";
import { MappingBankAmlComponent } from "./mapping-bank-aml/mapping-bank-aml.component";
import { TransactionMonitoringComponent } from "./transaction-monitoring/transaction-monitoring.component";
import { ProfileOfRespondentComponent } from "./profile-of-respondent/profile-of-respondent.component";
import { ProfileOfNewRespondentCorrespondentComponent } from "./profile-of-new-respondent-correspondent/profile-of-new-respondent-correspondent.component";
import { ExistingRespondentCorrespondentComponent } from "./existing-respondent-correspondent/existing-respondent-correspondent.component";
import { PenaltiesRelatedMattersComponent } from "./penalties-related-matters/penalties-related-matters.component";
import { SanctionCautionListComponent } from "./sanction-caution-list/sanction-caution-list.component";
import { SuspicionReportsComponent } from "./suspicion-reports/suspicion-reports.component";
import { PostTransactionComponent } from "./post-transaction/post-transaction.component";
import { InactiveDormatAccountsComponent } from "./inactive-dormat-accounts/inactive-dormat-accounts.component";
import { ComplainceAmlCftReviewsComponent } from "./complaince-aml-cft-reviews/complaince-aml-cft-reviews.component";
import { FaceToFaceCustomersComponent } from "./face-to-face-customers/face-to-face-customers.component";
import { RevisedGapSheetComponent } from './revised-gap-sheet/revised-gap-sheet.component';
import { OperationCreditReviewComponent } from './operation-credit-review/operation-credit-review.component';
import { CashRetentionLimitComponent } from './cash-retention-limit/cash-retention-limit.component';
import { InternalAuditAmlCftComponent } from './internal-audit-aml-cft/internal-audit-aml-cft.component';
const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "home/",
  },
  {
    path: "",
    component: HeaderComponent,
    
    children: [
      {
        path: "home/:token",
        component: LandingPageComponent,
        // canActivate:[AuthGuard],
      },
      {
        path: "home",
        component: LandingPageComponent,
        // canActivate:[AuthGuard],
      },

      {
        path: "annex/:token",
        component: AnnexComponent,
        canActivate:[AuthGuard],
      },
      {
        path: "annex",
        component: AnnexComponent,
        canActivate:[AuthGuard],
      },
      {
        path: "pipeline/:index/:token",
        component: StressRelatedVerticalComponent,
        canActivate:[AuthGuard],
        canDeactivate:[AccountCanDeactivateService]
      },
      {
        path: "pipeline/:index",
        component: StressRelatedVerticalComponent,
        canActivate:[AuthGuard],
        canDeactivate:[AccountCanDeactivateService]
      },
      {
        path: "gap/:token",
        canActivate:[AuthGuard],
        component: GapScreenComponent,
      },
      {
        path: "gap",
        canActivate:[AuthGuard],
        component: GapScreenComponent,
      },
      {
        path: "stress/:type/:token",
        component: StressRelatedComponent,
        canActivate:[AuthGuard],
        canDeactivate:[AccountCanDeactivateService]
      },
      {
        path: "stress/:type",
        component: StressRelatedComponent,
        canActivate:[AuthGuard],
        canDeactivate:[AccountCanDeactivateService]
      },
      {
        path: "ease/:token",
        canActivate:[AuthGuard],
        loadChildren:()=>import('./ease3/ease3.module').then(m=>m.Ease3Module)
      },
      {
        path: "ease",
        canActivate:[AuthGuard],
        loadChildren:()=>import('./ease3/ease3.module').then(m=>m.Ease3Module)
      },
      {
        path: 'adminPanel',
        canActivate:[AuthGuard],
        loadChildren: () => import("./user-module/user.module").then((m) => m.UserModule),
        
      },
      {
        path: 'compliance-adminPanel',
        canActivate:[AuthGuard],
        loadChildren: () => import("./compliance-user/compliance-user.module").then((m) => m.ComplianceUserModule),
      },
      {
        path:"banking/:token",
        component:BankingComponent,
        canActivate:[AuthGuard],
        canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"banking",
        component:BankingComponent,
        canActivate:[AuthGuard],
        canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"top20/:token",
        component:Top20NewComponent,
        canActivate:[AuthGuard],
        // canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"top20",
        component:Top20NewComponent,
        canActivate:[AuthGuard],
        // canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"positions/:token",
        component:PositionsComponent,
        canActivate:[AuthGuard],
        // canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"positions",
        component:PositionsComponent,
        canActivate:[AuthGuard],
        // canDeactivate:[BankingCanDeactivateService]
      },
      {
        path:"counterfeit/:token",
        component:CounterfeitComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"counterfeit",
        component:CounterfeitComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"ncrb/:token",
        component:NcrbComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"ncrb",
        component:NcrbComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"fortnightly/:token",
        component:FortnightlyComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"fortnightly",
        component:FortnightlyComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"exposure-qccp/:token",
        component:ExposureQccpComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"exposure-qccp",
        component:ExposureQccpComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"reporting/:token",
        component:ReportingComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"reporting",
        component:ReportingComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"equifax/:token",
        component:EquifaxComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"equifax",
        component:EquifaxComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"unreconciled/:token",
        component:UnreconciledComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"unreconciled",
        component:UnreconciledComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"nostro/:token",
        component:NostroComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"nostro",
        component:NostroComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-operation",
        component:ReportOnOperationViewComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-operation/:type/:id",
        component:ReportOnOperationComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-ownership-view",
        component:ReportOnOwnershipViewComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-ownership-general-information/:type/:id",
        component:ReportOnOwnershipGeneralInformationComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"ownership-general-info-section1/:type/:id",
        component:OwnershipGeneralInfoSection1Component,
        canActivate:[AuthGuard],
      },
      
      {
        path:"country-exposure-maturity",
        component:CountryExposureMaturityComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"ownership-general-info-section2/:type/:id",
        component:OwnershipGeneralInfoSection2Component,
        canActivate:[AuthGuard],
      },
      {
        path:"mad/:token",
        component:MadComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"mad",
        component:MadComponent,
        canActivate:[AuthGuard],
      },
      {
        path:'AnalyticalLeadComponent',
        component:AnalyticalLeadComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Analytical-Lead-FollowUp',
        component:AnalyticalLeadFollowUpComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'alo',
        component:ALOComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'reporton-profitability',
        component:ReportonProfitabilityComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'RevisedGapSheetComponent',
        component:CountryExposureMaturityComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'pci',
        component:PCIComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'pff-kyc-cdd',
        component:PffKycCddComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'profile-nonface-customers',
        component:ProfileNonfaceToFaceComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'jurisdictions-bank-new',
        component:JurisdictionsBankNewpresenceComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'jurisdictions-profile-review',
        component:JurisdictionsProfileReviewComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'aml-cft-riskmanagement',
        component:AmlCftRiskmanagementComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'mapping-bank-aml',
        component:MappingBankAmlComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'transaction-monitoring',
        component:TransactionMonitoringComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'profile-of-respondent',
        component:ProfileOfRespondentComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'profile-of-new-respondent',
        component:ProfileOfNewRespondentCorrespondentComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'existing-respondent-correspondent-banks',
        component:ExistingRespondentCorrespondentComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'penalties-related-matters',
        component:PenaltiesRelatedMattersComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'sanction-caution-list',
        component:SanctionCautionListComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'suspicion-reports',
        component:SuspicionReportsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'Data-On-Kyc',
        component:DataOnKycComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'IT-Base-Transaction-Monitoring',
        component:TransactionMonitoringSystemsComponent,
        canActivate:[AuthGuard]
      },
       {
        path:'AML-KYC-Related-Complaints',
        component:AMLKYCRelatedComplaintsComponent,
        canActivate:[AuthGuard]
      },{
        path:'KYC-AML-DEFICIENCIES',
        component:AMLComponent,
        canActivate:[AuthGuard]
      },{
        
        path:'Jurisdictions-Reviews-Overdue',
        component:JurisdictionsReviewsOverdueComponent,
        canActivate:[AuthGuard]
      },{
        
        path:'Jurisdictions-Risk-Profile',
        component:JurisdictionsRiskProfileComponent,
        canActivate:[AuthGuard]
      },{
        
        path:'Audit',
        component:AuditComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'post-transaction',
        component:PostTransactionComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'inactive-dormant-accounts',
        component:InactiveDormatAccountsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'compliance-aml-cft-review',
        component:ComplainceAmlCftReviewsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'internal-audit-aml-cft',
        component:InternalAuditAmlCftComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'face-to-face-customers',
        component:FaceToFaceCustomersComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'revised-gap-sheet',
        component:RevisedGapSheetComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'operations-credit-review',
        component:OperationCreditReviewComponent,
        canActivate:[AuthGuard]
      },{
        path:'cash-retention-limit',
        component:CashRetentionLimitComponent,
        canActivate:[AuthGuard]
      },

    ],
  },
  
  {
    path:"notfound",
    component:NotFoundComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:"**",
    redirectTo:'notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
