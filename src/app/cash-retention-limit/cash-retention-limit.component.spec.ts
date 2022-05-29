import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRetentionLimitComponent } from './cash-retention-limit.component';

describe('CashRetentionLimitComponent', () => {
  let component: CashRetentionLimitComponent;
  let fixture: ComponentFixture<CashRetentionLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashRetentionLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashRetentionLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
