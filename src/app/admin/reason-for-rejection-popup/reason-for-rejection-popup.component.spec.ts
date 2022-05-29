import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonForRejectionPopupComponent } from './reason-for-rejection-popup.component';

describe('ReasonForRejectionPopupComponent', () => {
  let component: ReasonForRejectionPopupComponent;
  let fixture: ComponentFixture<ReasonForRejectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasonForRejectionPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonForRejectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
