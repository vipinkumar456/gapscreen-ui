import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedVendorListComponent } from './invited-vendor-list.component';

describe('InvitedVendorListComponent', () => {
  let component: InvitedVendorListComponent;
  let fixture: ComponentFixture<InvitedVendorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedVendorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitedVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
