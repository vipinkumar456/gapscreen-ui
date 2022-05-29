import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top20NewComponent } from './top20-new.component';

describe('Top20NewComponent', () => {
  let component: Top20NewComponent;
  let fixture: ComponentFixture<Top20NewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top20NewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top20NewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
