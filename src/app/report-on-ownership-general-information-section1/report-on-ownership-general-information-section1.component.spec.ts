import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnOwnershipGeneralInformationSection1Component } from './report-on-ownership-general-information-section1.component';

describe('ReportOnOwnershipGeneralInformationSection1Component', () => {
  let component: ReportOnOwnershipGeneralInformationSection1Component;
  let fixture: ComponentFixture<ReportOnOwnershipGeneralInformationSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnOwnershipGeneralInformationSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnOwnershipGeneralInformationSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
