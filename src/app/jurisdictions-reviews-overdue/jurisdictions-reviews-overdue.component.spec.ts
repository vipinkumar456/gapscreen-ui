import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionsReviewsOverdueComponent } from './jurisdictions-reviews-overdue.component';

describe('JurisdictionsReviewsOverdueComponent', () => {
  let component: JurisdictionsReviewsOverdueComponent;
  let fixture: ComponentFixture<JurisdictionsReviewsOverdueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdictionsReviewsOverdueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionsReviewsOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
