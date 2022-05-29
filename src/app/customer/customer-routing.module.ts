import { CompanycontractComponent } from './company-contract/company-contract.component';
import { SealinkDetailsComponent } from './sealink-details/sealink-details.component';
import { CustomersRiskComponent } from './customers-risk/customers-risk.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteDigiCompComponent } from './invite-digi-comp/invite-digi-comp.component';
import { InvitesheetComponent } from './invitesheet/invitesheet.component';
// import { CompanysearchComponent } from './companysearch/companysearch.component';
import { InvitedVendorListComponent } from './invited-vendor-list/invited-vendor-list.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { CustomerCreatecontactComponent } from './customer-createcontact/customer-createcontact.component';
import { ServicecatalogueComponent } from './servicecatalogue/servicecatalogue.component';
import { CreateCompanyitemsComponent } from './create-companyitems/create-companyitems.component';
import { CustomerPaymenttermsComponent } from './customer-paymentterms/customer-paymentterms.component';
import { CustomerSupplierCustomerinfoComponent } from './customer-supplier-customerinfo/customer-supplier-customerinfo.component';
import { AddSupplierinfoComponent } from './add-supplierinfo/add-supplierinfo.component';
import { AddUsermanagmentComponent } from './add-usermanagment/add-usermanagment.component';
import { CustomerCasemanagmentComponent } from './customer-casemanagment/customer-casemanagment.component';
import { AddCaseManagmentComponent } from './add-case-managment/add-case-managment.component';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { CustomerUploaddocumentComponent } from './customer-uploaddocument/customer-uploaddocument.component';
import { CustomerQuestionnaireComponent } from './customer-questionnaire/customer-questionnaire.component';
import { CustomerRegulationComponent } from './customer-regulation/customer-regulation.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NewCompanySearchComponent } from './company-search/company-search.component';
import { BankDashboardComponent } from './bank-dashboard/bank-dashboard.component';
import { CustomerEsgComponent } from './customer-esg/customer-esg.component';
const routes: Routes = [
   { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'invite',
    component: InviteDigiCompComponent,
  },
  {
    path: 'invite/:type/:id',
    component: InviteDigiCompComponent,
  },
  {
    path: 'inviteSheet',
    component: InvitesheetComponent,
  },
  {
    path: 'invite-customer',
    component: InvitedVendorListComponent,
  },
  {
    path: 'customersrisk',
    component: CustomersRiskComponent
  },
  {
    path: 'sealinkdetails',
    component: SealinkDetailsComponent
  }, 
  {
    path: 'user-management',
    component: UserManagementComponent
  },
  {
    path: 'company-contract',
    component: CompanycontractComponent
  },
    {
    path: 'create-contract',
    component: CustomerCreatecontactComponent
  },
  {
    path: 'service-catalogue',
    component: ServicecatalogueComponent
  },{
    path: 'payment-terms',
    component: CustomerPaymenttermsComponent
  },
  {
    path: 'supplier-customer-information',
    component: CustomerSupplierCustomerinfoComponent
  },
   {
    path: 'Add-supplier-info',
    component: AddSupplierinfoComponent
  },{
    path: 'add-user',
    component: AddUsermanagmentComponent
  },
  {
    path: 'case-managment',
    component: CustomerCasemanagmentComponent
  }, {
    path: 'add-case-managment',
    component: AddCaseManagmentComponent
  },
  {
    path: 'customer-setting',
    component: CustomerSettingComponent
  },  {
    path: 'view-vendor/:step',
    component: ViewVendorComponent
  },
  {
    path: 'new-companysearch',
    component: NewCompanySearchComponent
  },
  {
    path: 'search-result/:id',
    component: SearchResultComponent
  },
  {
    path: 'bank-dashboard/:id',
    component: BankDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
