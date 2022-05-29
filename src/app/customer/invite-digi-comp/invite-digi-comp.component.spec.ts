import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDigiCompComponent } from './invite-digi-comp.component';

describe('InviteDigiCompComponent', () => {
  let component: InviteDigiCompComponent;
  let fixture: ComponentFixture<InviteDigiCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteDigiCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteDigiCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
