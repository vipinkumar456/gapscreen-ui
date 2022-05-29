import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnOwnershipViewComponent } from './report-on-ownership-view.component';

describe('ReportOnOwnershipViewComponent', () => {
  let component: ReportOnOwnershipViewComponent;
  let fixture: ComponentFixture<ReportOnOwnershipViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnOwnershipViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnOwnershipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
