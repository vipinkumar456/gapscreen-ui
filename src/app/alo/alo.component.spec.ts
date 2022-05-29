import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ALOComponent } from './alo.component';

describe('ALOComponent', () => {
  let component: ALOComponent;
  let fixture: ComponentFixture<ALOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ALOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ALOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
