import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './pages';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { CanDeactivateTeam } from './services/auth.gaurd';
import { InviteEmailComponent } from './pages/invite-email/invite-email.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CreateNewpasswordComponent } from './pages/create-newpassword/create-newpassword.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'invite-email/:type',
    component: InviteEmailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password-email/:type',
    component: CreateNewpasswordComponent,
  },
  {
    path: '',
    canDeactivate: [CanDeactivateTeam],
    component: IndexComponent,
    children: [
      {
        path: 'vendor',

        loadChildren: () =>
          import('./vendor/vendor.module').then((m) => m.VendorModule),
        canDeactivate: [CanDeactivateTeam],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      // {
      //   path: 'vendorcontract',
      //   loadChildren: () =>
      //     import('./vendorcontract/vendorcontract.module').then((m) => m.VendorcontractModule),
      // },
      // {
      //   path:'vendorcompany',
      //   loadChildren: () =>
      //     import('./vendor-company/vendor-company.module').then((m) => m.VendorCompanyModule)
      // },
      // {
      //   path: 'vendorsupplier',
      //   loadChildren: () =>
      //     import('./vendorsupplier/vendorsupplier.module').then((m) => m.VendorsupplierModule),
      // },
      // {
      //   path: 'vendorpaymentterms',
      //   loadChildren: () =>
      //     import('./vendor-payment-terms/vendor-payment-terms.module').then((m) => m.VendorPaymentTermsModule),
      // },
      // {
      //   path: 'vendorcasemanagement',
      //   loadChildren: () =>
      //     import('./vendor-case-management/vendor-case-management.module').then((m)=> m.VendorCaseManagementModule)
      // },
      // {
      //   path: 'complaince',
      //   loadChildren: () =>
      //     import('./complaince/complaince.module').then((m) => m.ComplainceModule)
      // },
      // {
      //   path: 'vendorsetting',
      //   loadChildren: () =>
      //     import('./vendor-setting/vendor-setting.module').then((m)=> m.VendorSettingModule)
      // },
      // {
      //   path: 'vendorscreen',
      //   loadChildren: () =>
      //     import('./vendor-screen/vendor-screen.module').then((m)=> m.VendorScreenModule)
      // }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
