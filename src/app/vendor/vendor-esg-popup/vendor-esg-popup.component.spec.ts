import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEsgPopupComponent } from './vendor-esg-popup.component';

describe('VendorEsgPopupComponent', () => {
  let component: VendorEsgPopupComponent;
  let fixture: ComponentFixture<VendorEsgPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorEsgPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEsgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
