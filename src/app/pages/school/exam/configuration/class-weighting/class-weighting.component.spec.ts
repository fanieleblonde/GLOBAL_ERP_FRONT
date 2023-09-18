import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassWeightingComponent } from './class-weighting.component';

describe('ClassWeightingComponent', () => {
  let component: ClassWeightingComponent;
  let fixture: ComponentFixture<ClassWeightingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassWeightingComponent]
    });
    fixture = TestBed.createComponent(ClassWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
