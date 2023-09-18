import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityWeightingComponent } from './speciality-weighting.component';

describe('SpecialityWeightingComponent', () => {
  let component: SpecialityWeightingComponent;
  let fixture: ComponentFixture<SpecialityWeightingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialityWeightingComponent]
    });
    fixture = TestBed.createComponent(SpecialityWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
