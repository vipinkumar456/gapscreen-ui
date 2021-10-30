import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StressRelatedComponent } from './stress-related.component';

describe('StressRelatedComponent', () => {
  let component: StressRelatedComponent;
  let fixture: ComponentFixture<StressRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StressRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StressRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
