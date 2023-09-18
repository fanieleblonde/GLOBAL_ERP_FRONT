import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingAddEditComponent } from './grading-add-edit.component';

describe('GradingAddEditComponent', () => {
  let component: GradingAddEditComponent;
  let fixture: ComponentFixture<GradingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradingAddEditComponent]
    });
    fixture = TestBed.createComponent(GradingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
