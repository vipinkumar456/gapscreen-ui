import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierinfoComponent } from './add-supplierinfo.component';

describe('AddSupplierinfoComponent', () => {
  let component: AddSupplierinfoComponent;
  let fixture: ComponentFixture<AddSupplierinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplierinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplierinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
