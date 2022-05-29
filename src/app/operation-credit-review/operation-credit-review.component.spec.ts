import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCreditReviewComponent } from './operation-credit-review.component';

describe('OperationCreditReviewComponent', () => {
  let component: OperationCreditReviewComponent;
  let fixture: ComponentFixture<OperationCreditReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCreditReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCreditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
