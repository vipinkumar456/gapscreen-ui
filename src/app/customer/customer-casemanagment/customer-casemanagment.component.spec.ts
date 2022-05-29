import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCasemanagmentComponent } from './customer-casemanagment.component';

describe('CustomerCasemanagmentComponent', () => {
  let component: CustomerCasemanagmentComponent;
  let fixture: ComponentFixture<CustomerCasemanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCasemanagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCasemanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
