import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewpasswordComponent } from './create-newpassword.component';

describe('CreateNewpasswordComponent', () => {
  let component: CreateNewpasswordComponent;
  let fixture: ComponentFixture<CreateNewpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
