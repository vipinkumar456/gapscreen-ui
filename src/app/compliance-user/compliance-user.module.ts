import { NgModule } from '@angular/core';
import { ComplianceEditComponent } from './compliance-edit/compliance-edit.component';
import { ComplianceUsersComponent } from './compliance-users/compliance-users.component';
import {UsersRoutingModule} from "./compliance-user-routing.module";
import { PrimeNgModule } from '../primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReuseModule } from '../shared.module';
import { CommonModule } from '@angular/common';
import { UserForm } from '../forms/user.form';

@NgModule({
  declarations: [ComplianceUsersComponent,ComplianceEditComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReuseModule,
    // UsersRoutingModule,
    UsersRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],providers:[ReactiveFormsModule,UserForm]
})
export class ComplianceUserModule { }
