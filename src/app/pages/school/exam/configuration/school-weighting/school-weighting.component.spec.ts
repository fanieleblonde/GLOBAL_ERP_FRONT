import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolWeightingComponent } from './school-weighting.component';

describe('SchoolWeightingComponent', () => {
  let component: SchoolWeightingComponent;
  let fixture: ComponentFixture<SchoolWeightingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolWeightingComponent]
    });
    fixture = TestBed.createComponent(SchoolWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
