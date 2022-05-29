import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDirectorPopupComponent } from './bank-director-popup.component';

describe('BankDirectorPopupComponent', () => {
  let component: BankDirectorPopupComponent;
  let fixture: ComponentFixture<BankDirectorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDirectorPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDirectorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
