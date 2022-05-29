import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShippingDetailsComponent } from './shipping-details/shipping-details.component';
import { InviteCustomerComponent } from './invite-customer/invite-customer.component';
import { InviteNewCustomerComponent } from './invite-new-customer/invite-new-customer.component';
import { AdminNewServiceComponent } from './admin-new-service/admin-new-service.component';
import { InvitesheetComponent } from './invitesheet/invitesheet.component';
const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'shippingdetails/:id',
    component: ShippingDetailsComponent,
  },

 
  {
    path:"invitecustomer",
    component:InviteCustomerComponent,
  },
  {
    path:"invitenewcustomer",
    component:InviteNewCustomerComponent,
  },
  {
    path:"invitenewcustomer/:type/:id",
    component:InviteNewCustomerComponent,
  },
  {
    path:"invitesheet",
    component:InvitesheetComponent,
  },
  {
    path:"adminnewservice",
    component:AdminNewServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
