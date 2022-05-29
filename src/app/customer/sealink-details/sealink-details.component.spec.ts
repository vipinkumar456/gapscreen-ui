import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealinkDetailsComponent } from './sealink-details.component';

describe('SealinkDetailsComponent', () => {
  let component: SealinkDetailsComponent;
  let fixture: ComponentFixture<SealinkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SealinkDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SealinkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
