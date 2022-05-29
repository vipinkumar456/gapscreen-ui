import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOnKycComponent } from './data-on-kyc.component';

describe('DataOnKycComponent', () => {
  let component: DataOnKycComponent;
  let fixture: ComponentFixture<DataOnKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOnKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataOnKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
