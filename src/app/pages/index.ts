import { IndexComponent } from './index/index.component';
import { InviteEmailComponent } from './invite-email/invite-email.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';



export const corePages = [
  LoginComponent,
  RegistrationComponent,
  IndexComponent,
  InviteEmailComponent
];

export * from './login/login.component';
export * from './registration/registration.component';
