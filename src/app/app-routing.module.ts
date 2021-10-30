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
import { ReportOnOwnershipGeneralInformationSection1Component } from "./report-on-ownership-general-information-section1/report-on-ownership-general-information-section1.component";
import { OwnershipGeneralInfoSection2Component } from "./ownership-general-info-section2/ownership-general-info-section2.component";
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
        path:"report-on-ownership-general-information",
        component:ReportOnOwnershipGeneralInformationComponent,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-ownership-general-information-section1",
        component:ReportOnOwnershipGeneralInformationSection1Component,
        canActivate:[AuthGuard],
      },
      {
        path:"report-on-ownership-general-information-section2",
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
