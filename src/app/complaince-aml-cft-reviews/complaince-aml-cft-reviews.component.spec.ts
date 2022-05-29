import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplainceAmlCftReviewsComponent } from './complaince-aml-cft-reviews.component';

describe('ComplainceAmlCftReviewsComponent', () => {
  let component: ComplainceAmlCftReviewsComponent;
  let fixture: ComponentFixture<ComplainceAmlCftReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplainceAmlCftReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplainceAmlCftReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
