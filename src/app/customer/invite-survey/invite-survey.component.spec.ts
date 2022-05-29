import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteSurveyComponent } from './invite-survey.component';

describe('InviteSurveyComponent', () => {
  let component: InviteSurveyComponent;
  let fixture: ComponentFixture<InviteSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
