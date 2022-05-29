import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionsRiskProfileComponent } from './jurisdictions-risk-profile.component';

describe('JurisdictionsRiskProfileComponent', () => {
  let component: JurisdictionsRiskProfileComponent;
  let fixture: ComponentFixture<JurisdictionsRiskProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdictionsRiskProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionsRiskProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
