import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoQuestionnaireComponent } from './company-info-questionnaire.component';

describe('QuestionnaireComponent', () => {
  let component: CompanyInfoQuestionnaireComponent;
  let fixture: ComponentFixture<CompanyInfoQuestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyInfoQuestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
