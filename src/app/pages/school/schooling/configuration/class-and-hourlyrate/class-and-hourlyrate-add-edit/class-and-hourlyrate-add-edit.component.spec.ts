import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndHourlyrateAddEditComponent } from './class-and-hourlyrate-add-edit.component';

describe('ClassAndHourlyrateAddEditComponent', () => {
  let component: ClassAndHourlyrateAddEditComponent;
  let fixture: ComponentFixture<ClassAndHourlyrateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAndHourlyrateAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassAndHourlyrateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
