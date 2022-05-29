import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlCftRiskmanagementComponent } from './aml-cft-riskmanagement.component';

describe('AmlCftRiskmanagementComponent', () => {
  let component: AmlCftRiskmanagementComponent;
  let fixture: ComponentFixture<AmlCftRiskmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmlCftRiskmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlCftRiskmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
