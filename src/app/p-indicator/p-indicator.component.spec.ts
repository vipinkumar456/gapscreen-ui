import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PIndicatorComponent } from './p-indicator.component';

describe('PIndicatorComponent', () => {
  let component: PIndicatorComponent;
  let fixture: ComponentFixture<PIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
