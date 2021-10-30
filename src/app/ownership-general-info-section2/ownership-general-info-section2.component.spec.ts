import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipGeneralInfoSection2Component } from './ownership-general-info-section2.component';

describe('OwnershipGeneralInfoSection2Component', () => {
  let component: OwnershipGeneralInfoSection2Component;
  let fixture: ComponentFixture<OwnershipGeneralInfoSection2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnershipGeneralInfoSection2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnershipGeneralInfoSection2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
