import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortnightlyComponent } from './fortnightly.component';

describe('FortnightlyComponent', () => {
  let component: FortnightlyComponent;
  let fixture: ComponentFixture<FortnightlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortnightlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortnightlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
