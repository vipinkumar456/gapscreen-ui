import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressRelatedVerticalComponent } from './stress-related-vertical.component';

describe('StressRelatedVerticalComponent', () => {
  let component: StressRelatedVerticalComponent;
  let fixture: ComponentFixture<StressRelatedVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressRelatedVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressRelatedVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
