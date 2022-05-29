import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisedGapSheetComponent } from './revised-gap-sheet.component';

describe('RevisedGapSheetComponent', () => {
  let component: RevisedGapSheetComponent;
  let fixture: ComponentFixture<RevisedGapSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisedGapSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisedGapSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
