import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRfiComponent } from './customer-rfi.component';

describe('CustomerRfiComponent', () => {
  let component: CustomerRfiComponent;
  let fixture: ComponentFixture<CustomerRfiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRfiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
