import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorUserManagmentComponent } from './add-vendor-user-managment.component';

describe('AddVendorUserManagmentComponent', () => {
  let component: AddVendorUserManagmentComponent;
  let fixture: ComponentFixture<AddVendorUserManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorUserManagmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorUserManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
