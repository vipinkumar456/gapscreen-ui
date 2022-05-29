import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityModalComponent } from './capacity-modal.component';

describe('CapacityModalComponent', () => {
  let component: CapacityModalComponent;
  let fixture: ComponentFixture<CapacityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
