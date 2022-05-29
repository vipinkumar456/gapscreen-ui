import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnOwnershipGeneralInformationComponent } from './report-on-ownership-general-information.component';

describe('ReportOnOwnershipGeneralInformationComponent', () => {
  let component: ReportOnOwnershipGeneralInformationComponent;
  let fixture: ComponentFixture<ReportOnOwnershipGeneralInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnOwnershipGeneralInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnOwnershipGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
