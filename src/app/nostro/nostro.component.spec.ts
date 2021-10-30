import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NostroComponent } from './nostro.component';

describe('NostroComponent', () => {
  let component: NostroComponent;
  let fixture: ComponentFixture<NostroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NostroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NostroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
