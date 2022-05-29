import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportonProfitabilityComponent } from './reporton-profitability.component';

describe('ReportonProfitabilityComponent', () => {
  let component: ReportonProfitabilityComponent;
  let fixture: ComponentFixture<ReportonProfitabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportonProfitabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportonProfitabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
