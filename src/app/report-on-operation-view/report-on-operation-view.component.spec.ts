import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnOperationViewComponent } from './report-on-operation-view.component';

describe('ReportOnOperationViewComponent', () => {
  let component: ReportOnOperationViewComponent;
  let fixture: ComponentFixture<ReportOnOperationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnOperationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnOperationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
