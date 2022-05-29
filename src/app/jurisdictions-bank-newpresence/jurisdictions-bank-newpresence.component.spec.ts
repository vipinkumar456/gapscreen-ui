import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionsBankNewpresenceComponent } from './jurisdictions-bank-newpresence.component';

describe('JurisdictionsBankNewpresenceComponent', () => {
  let component: JurisdictionsBankNewpresenceComponent;
  let fixture: ComponentFixture<JurisdictionsBankNewpresenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdictionsBankNewpresenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionsBankNewpresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
