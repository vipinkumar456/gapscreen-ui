import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AMLKYCRelatedComplaintsComponent } from './aml-kyc-related-complaints.component';

describe('AMLKYCRelatedComplaintsComponent', () => {
  let component: AMLKYCRelatedComplaintsComponent;
  let fixture: ComponentFixture<AMLKYCRelatedComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AMLKYCRelatedComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AMLKYCRelatedComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
