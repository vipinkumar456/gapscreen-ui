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
import { ReportOnOwnershipGeneralInformationSection1Component } from './report-on-ownership-general-information-section1/report-on-ownership-general-information-section1.component';
import { OwnershipGeneralInfoSection2Component } from './ownership-general-info-section2/ownership-general-info-section2.component';
import { OwnershipGeneralInfoSection1Component } from './ownership-general-info-section1/ownership-general-info-section1.component';
import {InputMaskModule} from 'primeng/inputmask';
import { RoleAuthGuardService } from "./role-auth-guard.service";

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
      ReportOnOwnershipGeneralInformationSection1Component,
      OwnershipGeneralInfoSection2Component,
      OwnershipGeneralInfoSection1Component,
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
    InputMaskModule
    

  ],
  providers: [
    AppInterceptor,
    HttpService,
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    AccountCanDeactivateService,
    BankingCanDeactivateService,
    AuthGuard,
    SharedService,
    RoleAuthGuardService
  ],
  bootstrap: [AppComponent],
  exports: [ThousandPipe],
})
export class AppModule {}
