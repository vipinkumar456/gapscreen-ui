import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {TabViewModule} from 'primeng/tabview';
import { InviteDigiCompComponent } from './invite-digi-comp/invite-digi-comp.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ChartModule} from 'primeng/chart';
import { InvitesheetComponent } from './invitesheet/invitesheet.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CustomersRiskComponent } from './customers-risk/customers-risk.component';
import { SealinkDetailsComponent } from './sealink-details/sealink-details.component';
import { CapacityModalComponent } from './capacity-modal/capacity-modal.component';
import { CaptureShareComponent } from './capture-share/capture-share.component';
import { HttpClientModule } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
// import { CompanysearchComponent } from './companysearch/companysearch.component';
import {CheckboxModule} from 'primeng/checkbox';
import { InvitedVendorListComponent } from './invited-vendor-list/invited-vendor-list.component';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import {InputSwitchModule} from 'primeng/inputswitch';
import { CustomerRoutingModule } from './customer-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { CompanycontractComponent } from './company-contract/company-contract.component';
import { ServicecatalogueComponent } from './servicecatalogue/servicecatalogue.component';
import { CustomerCreatecontactComponent } from './customer-createcontact/customer-createcontact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {StepsModule} from 'primeng/steps';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { CreateCompanyitemsComponent } from './create-companyitems/create-companyitems.component';
import { CustomerPaymenttermsComponent } from './customer-paymentterms/customer-paymentterms.component';
import { AddPaymenttermsComponent } from './add-paymentterms/add-paymentterms.component';
import { CustomerSupplierCustomerinfoComponent } from './customer-supplier-customerinfo/customer-supplier-customerinfo.component';
import { AddSupplierinfoComponent } from './add-supplierinfo/add-supplierinfo.component';
import { AddUsermanagmentComponent } from './add-usermanagment/add-usermanagment.component';
import { CustomerCasemanagmentComponent } from './customer-casemanagment/customer-casemanagment.component';
import { AddCaseManagmentComponent } from './add-case-managment/add-case-managment.component';
import { CustomerSettingComponent } from './customer-setting/customer-setting.component';
import { InformationsComponent } from './informations/informations.component';
import { SurveyComponent } from './survey/survey.component';
import { InviteSurveyComponent } from './invite-survey/invite-survey.component';
import { CustomiseComponent } from './customise/customise.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { NewQuestionnaireComponent } from './new-questionnaire/new-questionnaire.component';
import { VendorEsgComponent } from './vendor-esg/vendor-esg.component';
import { NewEsgPopupComponent } from './new-esg-popup/new-esg-popup.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { ServicesComponent } from './services/services.component';
import { ServicemodalComponent } from './servicemodal/servicemodal.component';
import { LocationsComponent } from './locations/locations.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { CustomerCompanyinformationComponent } from './customer-companyinformation/customer-companyinformation.component';
import { CustomerUploaddocumentComponent } from './customer-uploaddocument/customer-uploaddocument.component';
import { CustomerQuestionnaireComponent } from './customer-questionnaire/customer-questionnaire.component';
import { CustomerRegulationComponent } from './customer-regulation/customer-regulation.component';
import { NewCompanySearchComponent } from './company-search/company-search.component';

import { SearchResultComponent } from './search-result/search-result.component';
import { BankDashboardComponent } from './bank-dashboard/bank-dashboard.component';
import {DialogModule} from 'primeng/dialog';
import { BankComplianceComponent } from './bank-compliance/bank-compliance.component';
import { BankDirectorComponent } from './bank-director/bank-director.component';
import { BankFinancialComponent } from './bank-financial/bank-financial.component';
import { BankEsgComponent } from './bank-esg/bank-esg.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { BankDirectorPopupComponent } from './bank-director-popup/bank-director-popup.component';
import { CustomerEsgComponent } from './customer-esg/customer-esg.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { CustomerRfiComponent } from './customer-rfi/customer-rfi.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
@NgModule({
  declarations: [
    DashboardComponent,
    InviteDigiCompComponent,
    InvitesheetComponent,
    CustomersRiskComponent,
    SealinkDetailsComponent,
    CapacityModalComponent,
    CaptureShareComponent,
    // CompanysearchComponent,
    UserManagementComponent,
    InvitedVendorListComponent,
    CompanycontractComponent,
    ServicecatalogueComponent,
    CustomerCreatecontactComponent,
    CreateCompanyitemsComponent,
    CustomerPaymenttermsComponent,
    AddPaymenttermsComponent,
    CustomerSupplierCustomerinfoComponent,
    AddSupplierinfoComponent,
    AddUsermanagmentComponent,
    CustomerCasemanagmentComponent,
    AddCaseManagmentComponent,
    CustomerSettingComponent,
    InformationsComponent,
    SurveyComponent,
    InviteSurveyComponent,
    CustomiseComponent,
    QuestionnaireComponent,
    NewQuestionnaireComponent,
    VendorEsgComponent,
    NewEsgPopupComponent,
    RegulationsComponent,
    CurrenciesComponent,
    ServicesComponent,
    ServicemodalComponent,
    LocationsComponent,
    ViewVendorComponent,
    CustomerCompanyinformationComponent,
    CustomerUploaddocumentComponent,
    CustomerQuestionnaireComponent,
    CustomerRegulationComponent,
    NewCompanySearchComponent,
    SearchResultComponent,
    BankDashboardComponent,
    BankComplianceComponent,
    BankDirectorComponent,
    BankFinancialComponent,
    BankEsgComponent,
    BankDirectorPopupComponent,
    CustomerEsgComponent,
    CustomerRfiComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    NgCircleProgressModule.forRoot(),
    ChartModule,
    ConfirmDialogModule,
    ToastModule,
    TableModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CheckboxModule,
    InputSwitchModule,
    StepsModule,
    NgbModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    Ng2TelInputModule,
    InputNumberModule,
    DynamicDialogModule,
    MultiSelectModule,
  ],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class CustomerModule { }
