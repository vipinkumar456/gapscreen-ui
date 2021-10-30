import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EaseComponent } from './ease.component';

describe('EaseComponent', () => {
  let component: EaseComponent;
  let fixture: ComponentFixture<EaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
