import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOfRespondentComponent } from './profile-of-respondent.component';

describe('ProfileOfRespondentComponent', () => {
  let component: ProfileOfRespondentComponent;
  let fixture: ComponentFixture<ProfileOfRespondentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileOfRespondentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOfRespondentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
