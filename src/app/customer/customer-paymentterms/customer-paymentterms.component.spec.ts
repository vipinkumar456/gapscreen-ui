import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymenttermsComponent } from './customer-paymentterms.component';

describe('CustomerPaymenttermsComponent', () => {
  let component: CustomerPaymenttermsComponent;
  let fixture: ComponentFixture<CustomerPaymenttermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPaymenttermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPaymenttermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
