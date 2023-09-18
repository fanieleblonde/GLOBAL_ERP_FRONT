import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaThComponent } from './formula-th.component';

describe('FormulaThComponent', () => {
  let component: FormulaThComponent;
  let fixture: ComponentFixture<FormulaThComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaThComponent]
    });
    fixture = TestBed.createComponent(FormulaThComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
