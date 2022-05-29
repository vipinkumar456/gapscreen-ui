import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionCautionListComponent } from './sanction-caution-list.component';

describe('SanctionCautionListComponent', () => {
  let component: SanctionCautionListComponent;
  let fixture: ComponentFixture<SanctionCautionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanctionCautionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionCautionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
