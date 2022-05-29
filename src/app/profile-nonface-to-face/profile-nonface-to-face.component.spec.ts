import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNonfaceToFaceComponent } from './profile-nonface-to-face.component';

describe('ProfileNonfaceToFaceComponent', () => {
  let component: ProfileNonfaceToFaceComponent;
  let fixture: ComponentFixture<ProfileNonfaceToFaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNonfaceToFaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNonfaceToFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
