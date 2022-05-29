import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMLComponent } from './aml.component';

describe('AMLComponent', () => {
  let component: AMLComponent;
  let fixture: ComponentFixture<AMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
