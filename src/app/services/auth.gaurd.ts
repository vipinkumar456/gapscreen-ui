import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyInformationFormComponent } from '../vendor/company-information-form/company-information-form.component';

@Injectable()
export class CanDeactivateTeam implements CanDeactivate<CompanyInformationFormComponent>
{
  constructor() {}

  canDeactivate(
    component: CompanyInformationFormComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    return true;
  }
}
