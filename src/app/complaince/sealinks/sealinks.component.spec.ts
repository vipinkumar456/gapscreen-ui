import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SealinksComponent } from './sealinks.component';

describe('SealinksComponent', () => {
  let component: SealinksComponent;
  let fixture: ComponentFixture<SealinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SealinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SealinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
