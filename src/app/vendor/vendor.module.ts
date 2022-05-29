import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyInfo } from './company-info/company-info.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { CompanyInformationFormComponent } from './company-information-form/company-information-form.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { CompanyInfoRegulationsComponent } from './company-info-regulations/company-info-regulations.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CompanyInfoQuestionnaireComponent } from './company-info-questionnaire/company-info-questionnaire.component';
import { FormsModule } from '@angular/forms';
import { CanDeactivateTeam } from '../services/auth.gaurd';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { UserManagementComponent } from './user-management/user-management.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AddVendorUserManagmentComponent } from './add-vendor-user-managment/add-vendor-user-managment.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { SurveyComponent } from './survey/survey.component';
import { QuestionnaireScreenComponent } from './dashboard-questionnaire/dashboard-questionnaire.component'
import { OverviewComponent } from './overview/overview.component';
import { FinancialComponent } from './financial/financial.component';
import { EsgComponent } from './esg/esg.component';
import { DirectorsComponent } from './directors/directors.component';
import { AddvendorscreenSurveyComponent } from './addvendorscreen-survey/addvendorscreen-survey.component';
import {TabViewModule} from 'primeng/tabview';
import {ChartModule} from 'primeng/chart';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import {AccordionModule} from 'primeng/accordion';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {CarouselModule} from 'primeng/carousel';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { CompanyInfoEsgComponent } from './company-info-esg/company-info-esg.component';
import { StepsModule } from 'primeng/steps';
import { VendorEsgPopupComponent } from './vendor-esg-popup/vendor-esg-popup.component';

@NgModule({
  declarations: [
    CompanyInfo,
    VendorRegistrationComponent,
    CompanyInformationFormComponent,
    UploadDocumentsComponent,
    CompanyInfoRegulationsComponent,
    ActivitiesComponent,
    CompanyInfoQuestionnaireComponent,
    CompanyInfoEsgComponent,
    UserManagementComponent,
    AddVendorUserManagmentComponent,
    CompleteRegistrationComponent,
    VendorDashboardComponent,
    SurveyComponent,
    QuestionnaireScreenComponent,
    OverviewComponent,
    FinancialComponent,
    EsgComponent,
    DirectorsComponent,
    AddvendorscreenSurveyComponent,
    VendorEsgPopupComponent,
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgCircleProgressModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    Ng2TelInputModule,
    SharedModule,
    NgbModule,
    CalendarModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    TableModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    CheckboxModule,
    InputSwitchModule,
    TabViewModule,
    DropdownModule,
    ChartModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    AccordionModule,
    DynamicDialogModule,
    CarouselModule,
    StepsModule
    
  ],
  providers:[CanDeactivateTeam,MessageService,ConfirmationService,DialogService]
})
export class VendorModule {}
