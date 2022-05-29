import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingRespondentCorrespondentComponent } from './existing-respondent-correspondent.component';

describe('ExistingRespondentCorrespondentComponent', () => {
  let component: ExistingRespondentCorrespondentComponent;
  let fixture: ComponentFixture<ExistingRespondentCorrespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingRespondentCorrespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingRespondentCorrespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
