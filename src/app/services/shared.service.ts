import { AppCookieService } from './cookieService';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CompanyInformationFormComponent } from '../vendor/company-information-form/company-information-form.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  private subject = new Subject<any>();
  loginUser = this.subject.asObservable();

  constructor(private appCookieService: AppCookieService) {}

  loggedIn(user) {
    this.subject.next(user);
  }
  canDeactivate(
    component: CompanyInformationFormComponent
  ): Observable<boolean> | boolean {
    if (component.infoForm.dirty) {
      return confirm('Are you sure you want to exit without saving ?');
    }
    return true;
  }
}
