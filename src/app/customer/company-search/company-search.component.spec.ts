import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanySearchComponent } from './company-search.component';

describe('NewCompanySearchComponent', () => {
  let component: NewCompanySearchComponent;
  let fixture: ComponentFixture<NewCompanySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCompanySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompanySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
