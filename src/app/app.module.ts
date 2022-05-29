import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { HeaderComponent } from "./header/header.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GapScreenComponent } from "./gap-screen/gap-screen.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AnnexComponent } from "./annex/annex.component";
import { PrimeNgModule } from "./primeng.module";
import { HttpService } from "./services/http.service";
import { AppInterceptor } from "./services/interceptor";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxSpinnerModule } from "ngx-spinner";
import { StressRelatedComponent } from "./stress-related/stress-related.component";
import { ThousandPipe } from "./services/number.pipe";
import {
  AccountCanDeactivateService,
  BankingCanDeactivateService,
} from "./services/saveTable.service";
import { StressRelatedVerticalComponent } from "./stress-related-vertical/stress-related-vertical.component";
import { BankingComponent } from "./banking/banking.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BlueValidatorDirective } from "./services/min.validator";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuard } from "./auth.gaurd";
import { SharedService } from "./services/shared.service";
import { Top20Component } from "./top20/top20.component";
import { PositionsComponent } from "./positions/positions.component";
import { Top20NewComponent } from "./top20-new/top20-new.component";
import {CounterfeitComponent } from "./counterfeit/counterfeit.component";
import { NcrbComponent } from "./ncrb/ncrb.component";
import { FortnightlyComponent } from "./fortnightly/fortnightly.component";
import { ExposureQccpComponent } from "./exposure-qccp/exposure-qccp.component";
import { EquifaxComponent } from "./equifax/equifax.component";
import { ReportingComponent } from "./reporting/reporting.component";
import { UnreconciledComponent } from "./unreconciled/unreconciled.component";
import { NostroComponent } from "./nostro/nostro.component";
import { MadComponent } from "./mad/mad.component";
import { CalendarModule } from "primeng/calendar";
import { ReportOnOperationComponent } from './report-on-operation/report-on-operation.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { DateRangeTextPipe } from "./services/pipe/daterange.pipe";
import {AccordionModule} from 'primeng/accordion';
import { DateRangeSortTextPipe } from "./services/pipe/daterange_short.pipe";
import { RemoveCommaPipe } from "./services/pipe/remove_comma.pipe";
import { ReportOnOperationViewComponent } from "./report-on-operation-view/report-on-operation-view.component";
import { ReportOnOwnershipGeneralInformationComponent } from './report-on-ownership-general-information/report-on-ownership-general-information.component';
import { OwnershipGeneralInfoSection2Component } from './ownership-general-info-section2/ownership-general-info-section2.component';
import { OwnershipGeneralInfoSection1Component } from './ownership-general-info-section1/ownership-general-info-section1.component';
import {InputMaskModule} from 'primeng/inputmask';
import { RoleAuthGuardService } from "./role-auth-guard.service";
import { AnalyticalLeadComponent } from './analytical-lead/analytical-lead.component';
import { AnalyticalLeadFollowUpComponent } from './analytical-lead-follow-up/analytical-lead-follow-up.component';
import { ReportOnOwnershipViewComponent } from './report-on-ownership-view/report-on-ownership-view.component';
import { ALOComponent } from './alo/alo.component';
import { ReportonProfitabilityComponent } from './reporton-profitability/reporton-profitability.component';
import { CountryExposureMaturityComponent } from './country-exposure-maturity/country-exposure-maturity.component';
import { PCIComponent } from './pci/pci.component';
import { PffKycCddComponent } from './pff-kyc-cdd/pff-kyc-cdd.component';
import { ProfileNonfaceToFaceComponent } from './profile-nonface-to-face/profile-nonface-to-face.component';
import { JurisdictionsBankNewpresenceComponent } from './jurisdictions-bank-newpresence/jurisdictions-bank-newpresence.component';
import { JurisdictionsProfileReviewComponent } from './jurisdictions-profile-review/jurisdictions-profile-review.component';
import { AmlCftRiskmanagementComponent } from './aml-cft-riskmanagement/aml-cft-riskmanagement.component';
import { MappingBankAmlComponent } from './mapping-bank-aml/mapping-bank-aml.component';
import { TransactionMonitoringComponent } from './transaction-monitoring/transaction-monitoring.component';
import { ProfileOfRespondentComponent } from './profile-of-respondent/profile-of-respondent.component';
import { ProfileOfNewRespondentCorrespondentComponent } from './profile-of-new-respondent-correspondent/profile-of-new-respondent-correspondent.component';
import { ExistingRespondentCorrespondentComponent } from './existing-respondent-correspondent/existing-respondent-correspondent.component';
import { PenaltiesRelatedMattersComponent } from './penalties-related-matters/penalties-related-matters.component';
import { SanctionCautionListComponent } from './sanction-caution-list/sanction-caution-list.component';
import { SuspicionReportsComponent } from './suspicion-reports/suspicion-reports.component';
import { DataOnKycComponent } from './data-on-kyc/data-on-kyc.component';
import { TransactionMonitoringSystemsComponent } from './transaction-monitoring-systems/transaction-monitoring-systems.component';
import { AMLKYCRelatedComplaintsComponent } from './aml-kyc-related-complaints/aml-kyc-related-complaints.component';
import { AMLComponent } from './Deficiencies-in-KYC/aml/aml.component';
import { JurisdictionsReviewsOverdueComponent } from './jurisdictions-reviews-overdue/jurisdictions-reviews-overdue.component';
import { JurisdictionsRiskProfileComponent } from './jurisdictions-risk-profile/jurisdictions-risk-profile.component';
import { AuditComponent } from './audit/audit.component';
import { PostTransactionComponent } from './post-transaction/post-transaction.component';
import { InactiveDormatAccountsComponent } from './inactive-dormat-accounts/inactive-dormat-accounts.component';
import { ComplainceAmlCftReviewsComponent } from './complaince-aml-cft-reviews/complaince-aml-cft-reviews.component';
import { FaceToFaceCustomersComponent } from './face-to-face-customers/face-to-face-customers.component';
import { RevisedGapSheetComponent } from './revised-gap-sheet/revised-gap-sheet.component';
import { DatePipe } from '@angular/common';
import { OperationCreditReviewComponent } from './operation-credit-review/operation-credit-review.component';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import { AccountListComponent } from './operation-credit-review/account-list/account-list.component';
import { CashRetentionLimitComponent } from './cash-retention-limit/cash-retention-limit.component';
import { InternalAuditAmlCftComponent } from "./internal-audit-aml-cft/internal-audit-aml-cft.component";
@NgModule({
  declarations: [
    AppComponent,
    DateRangeTextPipe,
    DateRangeSortTextPipe,
    RemoveCommaPipe,
    LoginComponent,
    LandingPageComponent,
    HeaderComponent,
    GapScreenComponent,
    AnnexComponent,
    StressRelatedComponent,
    ThousandPipe,
    StressRelatedVerticalComponent,
    BankingComponent,
    BankingComponent,
    NotFoundComponent,
    BlueValidatorDirective,
    LogoutComponent,
     Top20Component,
     PositionsComponent,
     Top20NewComponent,
     CounterfeitComponent,
      NcrbComponent,
      FortnightlyComponent,
      ExposureQccpComponent,
       EquifaxComponent,
      ReportingComponent,
      UnreconciledComponent,
      NostroComponent,
      MadComponent,
      ReportOnOperationComponent,
      ReportOnOperationViewComponent,
      ReportOnOwnershipGeneralInformationComponent,
      OwnershipGeneralInfoSection2Component,
      OwnershipGeneralInfoSection1Component,
        AnalyticalLeadComponent,
        AnalyticalLeadFollowUpComponent,
        ReportOnOwnershipViewComponent,
        ALOComponent,
        ReportonProfitabilityComponent,
        CountryExposureMaturityComponent,
        PCIComponent,
        PffKycCddComponent,
        ProfileNonfaceToFaceComponent,
        JurisdictionsBankNewpresenceComponent,
        JurisdictionsProfileReviewComponent,
        AmlCftRiskmanagementComponent,
        MappingBankAmlComponent,
        TransactionMonitoringComponent,
        ProfileOfRespondentComponent,
        ProfileOfNewRespondentCorrespondentComponent,
        ExistingRespondentCorrespondentComponent,
        PenaltiesRelatedMattersComponent,
        SanctionCautionListComponent,
        SuspicionReportsComponent,
        DataOnKycComponent,
        TransactionMonitoringSystemsComponent,
        AMLKYCRelatedComplaintsComponent,
        AMLComponent,
        JurisdictionsReviewsOverdueComponent,
        JurisdictionsRiskProfileComponent,
        AuditComponent,
        PostTransactionComponent,
        InactiveDormatAccountsComponent,
        ComplainceAmlCftReviewsComponent,
        FaceToFaceCustomersComponent,
        RevisedGapSheetComponent,
        OperationCreditReviewComponent,
        AccountListComponent,
        CashRetentionLimitComponent,
        InternalAuditAmlCftComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CalendarModule,
    ToggleButtonModule,
    AccordionModule,
    InputMaskModule,
    DynamicDialogModule
    

  ],
  providers: [
    AppInterceptor,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    AccountCanDeactivateService,
    BankingCanDeactivateService,
    AuthGuard,
    SharedService,
    RoleAuthGuardService,
    DatePipe,
    DialogService
  ],
  bootstrap: [AppComponent],
  exports: [ThousandPipe],
})
export class AppModule {}
