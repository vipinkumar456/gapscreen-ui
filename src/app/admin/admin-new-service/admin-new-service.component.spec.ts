import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewServiceComponent } from './admin-new-service.component';

describe('AdminNewServiceComponent', () => {
  let component: AdminNewServiceComponent;
  let fixture: ComponentFixture<AdminNewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
