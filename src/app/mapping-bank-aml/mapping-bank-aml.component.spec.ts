import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingBankAmlComponent } from './mapping-bank-aml.component';

describe('MappingBankAmlComponent', () => {
  let component: MappingBankAmlComponent;
  let fixture: ComponentFixture<MappingBankAmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingBankAmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingBankAmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
