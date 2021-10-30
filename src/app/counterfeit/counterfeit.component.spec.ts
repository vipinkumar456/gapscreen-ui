import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterfeitComponent } from './counterfeit.component';

describe('CounterfeitComponent', () => {
  let component: CounterfeitComponent;
  let fixture: ComponentFixture<CounterfeitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterfeitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterfeitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
