import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnOperationComponent } from './report-on-operation.component';

describe('ReportOnOperationComponent', () => {
  let component: ReportOnOperationComponent;
  let fixture: ComponentFixture<ReportOnOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
