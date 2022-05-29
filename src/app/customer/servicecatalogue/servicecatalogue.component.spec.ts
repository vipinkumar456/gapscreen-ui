import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecatalogueComponent } from './servicecatalogue.component';

describe('ServicecatalogueComponent', () => {
  let component: ServicecatalogueComponent;
  let fixture: ComponentFixture<ServicecatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicecatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
