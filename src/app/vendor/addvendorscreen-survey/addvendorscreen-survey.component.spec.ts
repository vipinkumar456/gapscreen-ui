import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvendorscreenSurveyComponent } from './addvendorscreen-survey.component';

describe('AddvendorscreenSurveyComponent', () => {
  let component: AddvendorscreenSurveyComponent;
  let fixture: ComponentFixture<AddvendorscreenSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddvendorscreenSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvendorscreenSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
