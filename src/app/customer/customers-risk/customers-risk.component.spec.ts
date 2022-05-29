import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRiskComponent } from './customers-risk.component';

describe('CustomersRiskComponent', () => {
  let component: CustomersRiskComponent;
  let fixture: ComponentFixture<CustomersRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersRiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
