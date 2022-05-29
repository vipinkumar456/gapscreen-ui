import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalLeadComponent } from './analytical-lead.component';

describe('AnalyticalLeadComponent', () => {
  let component: AnalyticalLeadComponent;
  let fixture: ComponentFixture<AnalyticalLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticalLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticalLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
