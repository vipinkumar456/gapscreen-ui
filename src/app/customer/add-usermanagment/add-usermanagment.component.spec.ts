import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsermanagmentComponent } from './add-usermanagment.component';

describe('AddUsermanagmentComponent', () => {
  let component: AddUsermanagmentComponent;
  let fixture: ComponentFixture<AddUsermanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUsermanagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsermanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
