import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupplierCustomerinfoComponent } from './customer-supplier-customerinfo.component';

describe('CustomerSupplierCustomerinfoComponent', () => {
  let component: CustomerSupplierCustomerinfoComponent;
  let fixture: ComponentFixture<CustomerSupplierCustomerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupplierCustomerinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupplierCustomerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
