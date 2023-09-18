import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleWeightingComponent } from './cycle-weighting.component';

describe('CycleWeightingComponent', () => {
  let component: CycleWeightingComponent;
  let fixture: ComponentFixture<CycleWeightingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CycleWeightingComponent]
    });
    fixture = TestBed.createComponent(CycleWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
