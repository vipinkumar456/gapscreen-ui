import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import { Button } from 'protractor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InputSwitchModule} from 'primeng/inputswitch';

import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { TableSettingComponent } from './table-setting/table-setting.component';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { InviteCustomerComponent } from './invite-customer/invite-customer.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InviteNewCustomerComponent } from './invite-new-customer/invite-new-customer.component';
import { SharedModule } from '../shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import { AdminNewServiceComponent } from './admin-new-service/admin-new-service.component';
import { ReasonForRejectionPopupComponent } from './reason-for-rejection-popup/reason-for-rejection-popup.component';
import {InputNumberModule} from 'primeng/inputnumber';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { InvitesheetComponent } from './invitesheet/invitesheet.component';
@NgModule({
  declarations: [
    AdminDashboardComponent,
    ShippingDetailsComponent,

    TableSettingComponent,
    InviteCustomerComponent,
    InviteNewCustomerComponent,
    AdminNewServiceComponent,
    ReasonForRejectionPopupComponent,
    InvitesheetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    Ng2TelInputModule,
    AdminRoutingModule,
    TableModule,
    MultiSelectModule,
    DialogModule,
    ButtonModule,
    NgbModule,
    ConfirmDialogModule,
    ToastModule,
    SharedModule,
    InputTextModule,
    InputSwitchModule,
    DropdownModule,
    InputTextareaModule,
    InputNumberModule
  ],
  providers: [MessageService,ConfirmationService,DialogService]
})
export class AdminModule { }
