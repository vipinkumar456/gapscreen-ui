import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreatecontactComponent } from './customer-createcontact.component';

describe('CustomerCreatecontactComponent', () => {
  let component: CustomerCreatecontactComponent;
  let fixture: ComponentFixture<CustomerCreatecontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCreatecontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCreatecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
