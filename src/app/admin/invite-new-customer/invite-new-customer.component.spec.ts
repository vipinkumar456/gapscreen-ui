import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteNewCustomerComponent } from './invite-new-customer.component';

describe('InviteNewCustomerComponent', () => {
  let component: InviteNewCustomerComponent;
  let fixture: ComponentFixture<InviteNewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteNewCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteNewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
