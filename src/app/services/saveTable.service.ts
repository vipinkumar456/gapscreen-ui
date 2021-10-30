import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { BankingComponent } from '../banking/banking.component';
import { StressRelatedComponent } from '../stress-related/stress-related.component';

@Injectable()
export class AccountCanDeactivateService implements CanDeactivate<StressRelatedComponent> {
    canDeactivate(component : StressRelatedComponent) : boolean {
        if(component.changed) {
            return confirm("Are you sure you want to exit without saving ?");
        }
        return true;
    }
}

export class BankingCanDeactivateService implements CanDeactivate<BankingComponent> {
    canDeactivate(component : BankingComponent) : boolean {
        if(component.changed) {
            return confirm("Are you sure you want to exit without saving ?");
        }
        return true;
    }
}