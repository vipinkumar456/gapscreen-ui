import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyitemsComponent } from './create-companyitems.component';

describe('CreateCompanyitemsComponent', () => {
  let component: CreateCompanyitemsComponent;
  let fixture: ComponentFixture<CreateCompanyitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCompanyitemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCompanyitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
