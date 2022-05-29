import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesheetComponent } from './invitesheet.component';

describe('InvitesheetComponent', () => {
  let component: InvitesheetComponent;
  let fixture: ComponentFixture<InvitesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
