import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCustomerComponent } from './invite-customer.component';

describe('InviteCustomerComponent', () => {
  let component: InviteCustomerComponent;
  let fixture: ComponentFixture<InviteCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
