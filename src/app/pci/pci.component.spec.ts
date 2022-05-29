import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCIComponent } from './pci.component';

describe('PCIComponent', () => {
  let component: PCIComponent;
  let fixture: ComponentFixture<PCIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
