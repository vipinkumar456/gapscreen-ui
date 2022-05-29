import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSettingComponent } from './table-setting.component';

describe('TableSettingComponent', () => {
  let component: TableSettingComponent;
  let fixture: ComponentFixture<TableSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
