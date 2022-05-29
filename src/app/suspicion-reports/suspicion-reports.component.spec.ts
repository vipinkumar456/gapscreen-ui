import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspicionReportsComponent } from './suspicion-reports.component';

describe('SuspicionReportsComponent', () => {
  let component: SuspicionReportsComponent;
  let fixture: ComponentFixture<SuspicionReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspicionReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspicionReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
