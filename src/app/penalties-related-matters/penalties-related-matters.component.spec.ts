import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltiesRelatedMattersComponent } from './penalties-related-matters.component';

describe('PenaltiesRelatedMattersComponent', () => {
  let component: PenaltiesRelatedMattersComponent;
  let fixture: ComponentFixture<PenaltiesRelatedMattersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltiesRelatedMattersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltiesRelatedMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
