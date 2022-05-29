import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankFinancialComponent } from './bank-financial.component';

describe('BankFinancialComponent', () => {
  let component: BankFinancialComponent;
  let fixture: ComponentFixture<BankFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
