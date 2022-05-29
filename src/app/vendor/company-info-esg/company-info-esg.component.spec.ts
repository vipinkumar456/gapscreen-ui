import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoEsgComponent } from './company-info-esg.component';

describe('CompanyInfoEsgComponent', () => {
  let component: CompanyInfoEsgComponent;
  let fixture: ComponentFixture<CompanyInfoEsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoEsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoEsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
