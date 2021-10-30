import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceUsersComponent } from './compliance-users.component';

describe('ComplianceUsersComponent', () => {
  let component: ComplianceUsersComponent;
  let fixture: ComponentFixture<ComplianceUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
