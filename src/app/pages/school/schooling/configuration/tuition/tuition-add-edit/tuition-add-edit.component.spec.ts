import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionAddEditComponent } from './tuition-add-edit.component';

describe('TuitionAddEditComponent', () => {
  let component: TuitionAddEditComponent;
  let fixture: ComponentFixture<TuitionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuitionAddEditComponent]
    });
    fixture = TestBed.createComponent(TuitionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
