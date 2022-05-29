import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisdictionsProfileReviewComponent } from './jurisdictions-profile-review.component';

describe('JurisdictionsProfileReviewComponent', () => {
  let component: JurisdictionsProfileReviewComponent;
  let fixture: ComponentFixture<JurisdictionsProfileReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JurisdictionsProfileReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JurisdictionsProfileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
