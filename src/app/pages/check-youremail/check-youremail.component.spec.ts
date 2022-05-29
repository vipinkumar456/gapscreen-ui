import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckYouremailComponent } from './check-youremail.component';

describe('CheckYouremailComponent', () => {
  let component: CheckYouremailComponent;
  let fixture: ComponentFixture<CheckYouremailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckYouremailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckYouremailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
