import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorEsgComponent } from './vendor-esg.component';

describe('VendorEsgComponent', () => {
  let component: VendorEsgComponent;
  let fixture: ComponentFixture<VendorEsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorEsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorEsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
