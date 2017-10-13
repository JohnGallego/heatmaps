import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptsViewComponent } from './concepts-view.component';

describe('ConceptsViewComponent', () => {
  let component: ConceptsViewComponent;
  let fixture: ComponentFixture<ConceptsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
