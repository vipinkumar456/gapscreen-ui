import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryExposureMaturityComponent } from './country-exposure-maturity.component';

describe('CountryExposureMaturityComponent', () => {
  let component: CountryExposureMaturityComponent;
  let fixture: ComponentFixture<CountryExposureMaturityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryExposureMaturityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryExposureMaturityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
