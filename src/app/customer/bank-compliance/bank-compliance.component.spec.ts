import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankComplianceComponent } from './bank-compliance.component';

describe('BankComplianceComponent', () => {
  let component: BankComplianceComponent;
  let fixture: ComponentFixture<BankComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
