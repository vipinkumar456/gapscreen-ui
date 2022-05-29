import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfo } from './company-info/company-info.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { AddVendorUserManagmentComponent } from './add-vendor-user-managment/add-vendor-user-managment.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'vendor', pathMatch: 'full' },
  {
    path: 'vendor-info',
    component: CompanyInfo,
  },
  {
    path: 'vendor-info/:step',
    component: VendorRegistrationComponent
  },
  {
    path: 'completed',
    component: CompleteRegistrationComponent, 
  }, {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'dashboard',
    component: VendorDashboardComponent,
  },
  {
    path: 'add-vender',
    component: AddVendorUserManagmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
