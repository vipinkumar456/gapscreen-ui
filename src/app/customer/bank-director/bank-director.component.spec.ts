import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDirectorComponent } from './bank-director.component';

describe('BankDirectorComponent', () => {
  let component: BankDirectorComponent;
  let fixture: ComponentFixture<BankDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
