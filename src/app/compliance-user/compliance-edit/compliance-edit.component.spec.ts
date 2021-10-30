import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceEditComponent } from './compliance-edit.component';

describe('ComplianceEditComponent', () => {
  let component: ComplianceEditComponent;
  let fixture: ComponentFixture<ComplianceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
