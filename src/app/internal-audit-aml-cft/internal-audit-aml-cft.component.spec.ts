import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalAuditAmlCftComponent } from './internal-audit-aml-cft.component';

describe('InternalAuditAmlCftComponent', () => {
  let component: InternalAuditAmlCftComponent;
  let fixture: ComponentFixture<InternalAuditAmlCftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalAuditAmlCftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalAuditAmlCftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
