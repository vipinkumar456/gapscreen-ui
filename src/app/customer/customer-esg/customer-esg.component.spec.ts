import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEsgComponent } from './customer-esg.component';

describe('CustomerEsgComponent', () => {
  let component: CustomerEsgComponent;
  let fixture: ComponentFixture<CustomerEsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerEsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
