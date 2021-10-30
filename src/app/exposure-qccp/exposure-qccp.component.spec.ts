import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureQccpComponent } from './exposure-qccp.component';

describe('ExposureQccpComponent', () => {
  let component: ExposureQccpComponent;
  let fixture: ComponentFixture<ExposureQccpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposureQccpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposureQccpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
