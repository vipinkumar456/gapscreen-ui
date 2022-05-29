import { FooterComponent } from './footer/footer.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';

export const coreComponents = [
  HeaderComponent,
  HeaderLoginComponent,
  SidenavComponent,
  SuccessDialogComponent,
  FooterComponent,
];

export * from './header-login/header-login.component';
export * from './footer/footer.component';
export * from './sidenav/sidenav.component';
export * from './success-dialog/success-dialog.component';
