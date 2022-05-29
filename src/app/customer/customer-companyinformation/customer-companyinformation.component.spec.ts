import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCompanyinformationComponent } from './customer-companyinformation.component';

describe('CustomerCompanyinformationComponent', () => {
  let component: CustomerCompanyinformationComponent;
  let fixture: ComponentFixture<CustomerCompanyinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCompanyinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCompanyinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
