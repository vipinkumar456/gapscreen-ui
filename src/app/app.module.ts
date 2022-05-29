import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { coreComponents } from './components';
import * as pages from './pages';
import { VendorModule } from './vendor/vendor.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CanDeactivateTeam } from './services/auth.gaurd';
import { AddUserComponent } from './add-user/add-user.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import {TabViewModule} from 'primeng/tabview';
import {DropdownModule} from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CheckYouremailComponent } from './pages/check-youremail/check-youremail.component';
import { CreateNewpasswordComponent } from './pages/create-newpassword/create-newpassword.component';
@NgModule({
  declarations: [...coreComponents, ...pages.corePages,
    AppComponent,
    AddUserComponent,
    ForgotPasswordComponent,
    CheckYouremailComponent,
    CreateNewpasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VendorModule,
    Ng2TelInputModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    MultiSelectModule,
    TabViewModule,
    DropdownModule,
    NgCircleProgressModule.forRoot({
      "radius": 60,
      "space": -10,
      
      "outerStrokeGradient": true,
      "outerStrokeWidth": 10,
      "outerStrokeColor": "#4882c2",
      "outerStrokeGradientStopColor": "#53a9ff",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "70%",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
      "clockwise": false,
      "startFromZero": false,
      "lazy": true})
  ],
  providers: [CanDeactivateTeam],
  bootstrap: [AppComponent]
})
export class AppModule { }
