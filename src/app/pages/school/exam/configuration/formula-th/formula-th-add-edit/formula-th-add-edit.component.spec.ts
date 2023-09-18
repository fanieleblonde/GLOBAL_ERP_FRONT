import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaThAddEditComponent } from './formula-th-add-edit.component';

describe('FormulaThAddEditComponent', () => {
  let component: FormulaThAddEditComponent;
  let fixture: ComponentFixture<FormulaThAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormulaThAddEditComponent]
    });
    fixture = TestBed.createComponent(FormulaThAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
