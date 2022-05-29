import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMonitoringSystemsComponent } from './transaction-monitoring-systems.component';

describe('TransactionMonitoringSystemsComponent', () => {
  let component: TransactionMonitoringSystemsComponent;
  let fixture: ComponentFixture<TransactionMonitoringSystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionMonitoringSystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMonitoringSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
