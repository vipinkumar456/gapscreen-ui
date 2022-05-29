import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalLeadFollowUpComponent } from './analytical-lead-follow-up.component';

describe('AnalyticalLeadFollowUpComponent', () => {
  let component: AnalyticalLeadFollowUpComponent;
  let fixture: ComponentFixture<AnalyticalLeadFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticalLeadFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalLeadFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
