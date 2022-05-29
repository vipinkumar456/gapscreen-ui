import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRegulationComponent } from './customer-regulation.component';

describe('CustomerRegulationComponent', () => {
  let component: CustomerRegulationComponent;
  let fixture: ComponentFixture<CustomerRegulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRegulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
