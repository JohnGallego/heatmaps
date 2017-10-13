import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapsPageComponent } from './heatmaps-page.component';

describe('HeatmapsPageComponent', () => {
  let component: HeatmapsPageComponent;
  let fixture: ComponentFixture<HeatmapsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
