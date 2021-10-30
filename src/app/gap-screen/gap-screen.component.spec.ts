import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GapScreenComponent } from './gap-screen.component';

describe('GapScreenComponent', () => {
  let component: GapScreenComponent;
  let fixture: ComponentFixture<GapScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GapScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GapScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
