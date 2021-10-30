import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnreconciledComponent } from './unreconciled.component';

describe('UnreconciledComponent', () => {
  let component: UnreconciledComponent;
  let fixture: ComponentFixture<UnreconciledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnreconciledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnreconciledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
