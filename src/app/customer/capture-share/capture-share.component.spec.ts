import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureShareComponent } from './capture-share.component';

describe('CaptureShareComponent', () => {
  let component: CaptureShareComponent;
  let fixture: ComponentFixture<CaptureShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
