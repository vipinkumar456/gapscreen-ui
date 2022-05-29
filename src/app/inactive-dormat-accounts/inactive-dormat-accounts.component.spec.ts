import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveDormatAccountsComponent } from './inactive-dormat-accounts.component';

describe('InactiveDormatAccountsComponent', () => {
  let component: InactiveDormatAccountsComponent;
  let fixture: ComponentFixture<InactiveDormatAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveDormatAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveDormatAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
