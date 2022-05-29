import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PffKycCddComponent } from './pff-kyc-cdd.component';

describe('PffKycCddComponent', () => {
  let component: PffKycCddComponent;
  let fixture: ComponentFixture<PffKycCddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PffKycCddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PffKycCddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
