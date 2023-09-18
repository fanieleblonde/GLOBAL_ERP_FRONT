import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CycleWeightingAddEditComponent } from './cycle-weighting-add-edit.component';

describe('CycleWeightingAddEditComponent', () => {
  let component: CycleWeightingAddEditComponent;
  let fixture: ComponentFixture<CycleWeightingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CycleWeightingAddEditComponent]
    });
    fixture = TestBed.createComponent(CycleWeightingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
