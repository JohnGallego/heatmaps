import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersViewComponent } from './filters-view.component';

describe('FiltersViewComponent', () => {
  let component: FiltersViewComponent;
  let fixture: ComponentFixture<FiltersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
