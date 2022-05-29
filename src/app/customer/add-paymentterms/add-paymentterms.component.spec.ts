import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymenttermsComponent } from './add-paymentterms.component';

describe('AddPaymenttermsComponent', () => {
  let component: AddPaymenttermsComponent;
  let fixture: ComponentFixture<AddPaymenttermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymenttermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymenttermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
