import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeAddEditComponent } from './degree-add-edit.component';

describe('DegreeAddEditComponent', () => {
  let component: DegreeAddEditComponent;
  let fixture: ComponentFixture<DegreeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DegreeAddEditComponent]
    });
    fixture = TestBed.createComponent(DegreeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
