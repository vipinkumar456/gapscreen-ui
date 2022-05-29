import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUploaddocumentComponent } from './customer-uploaddocument.component';

describe('CustomerUploaddocumentComponent', () => {
  let component: CustomerUploaddocumentComponent;
  let fixture: ComponentFixture<CustomerUploaddocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUploaddocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUploaddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
