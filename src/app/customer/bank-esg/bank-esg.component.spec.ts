import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankEsgComponent } from './bank-esg.component';

describe('BankEsgComponent', () => {
  let component: BankEsgComponent;
  let fixture: ComponentFixture<BankEsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankEsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankEsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
