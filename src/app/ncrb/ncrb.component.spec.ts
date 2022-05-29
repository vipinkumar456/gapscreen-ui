import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcrbComponent } from './ncrb.component';

describe('NcrbComponent', () => {
  let component: NcrbComponent;
  let fixture: ComponentFixture<NcrbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcrbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcrbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
