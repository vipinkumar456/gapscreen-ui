import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseManagmentComponent } from './add-case-managment.component';

describe('AddCaseManagmentComponent', () => {
  let component: AddCaseManagmentComponent;
  let fixture: ComponentFixture<AddCaseManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaseManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
