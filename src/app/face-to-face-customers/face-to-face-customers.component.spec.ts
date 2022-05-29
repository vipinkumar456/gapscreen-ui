import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceToFaceCustomersComponent } from './face-to-face-customers.component';

describe('FaceToFaceCustomersComponent', () => {
  let component: FaceToFaceCustomersComponent;
  let fixture: ComponentFixture<FaceToFaceCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceToFaceCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceToFaceCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
