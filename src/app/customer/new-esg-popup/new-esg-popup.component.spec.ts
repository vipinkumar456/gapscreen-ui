import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEsgPopupComponent } from './new-esg-popup.component';

describe('NewEsgPopupComponent', () => {
  let component: NewEsgPopupComponent;
  let fixture: ComponentFixture<NewEsgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEsgPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEsgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
