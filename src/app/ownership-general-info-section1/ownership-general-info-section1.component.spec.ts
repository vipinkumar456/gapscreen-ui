import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipGeneralInfoSection1Component } from './ownership-general-info-section1.component';

describe('OwnershipGeneralInfoSection1Component', () => {
  let component: OwnershipGeneralInfoSection1Component;
  let fixture: ComponentFixture<OwnershipGeneralInfoSection1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnershipGeneralInfoSection1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipGeneralInfoSection1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
