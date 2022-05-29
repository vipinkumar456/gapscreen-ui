import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfNewRespondentCorrespondentComponent } from './profile-of-new-respondent-correspondent.component';

describe('ProfileOfNewRespondentCorrespondentComponent', () => {
  let component: ProfileOfNewRespondentCorrespondentComponent;
  let fixture: ComponentFixture<ProfileOfNewRespondentCorrespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOfNewRespondentCorrespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfNewRespondentCorrespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
