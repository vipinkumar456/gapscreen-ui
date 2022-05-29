import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycontractComponent } from './company-contract.component';

describe('CompanycontractComponent', () => {
  let component: CompanycontractComponent;
  let fixture: ComponentFixture<CompanycontractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanycontractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanycontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
