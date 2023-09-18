import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSessionAddEditComponent } from './school-session-add-edit.component';

describe('SchoolSessionAddEditComponent', () => {
  let component: SchoolSessionAddEditComponent;
  let fixture: ComponentFixture<SchoolSessionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolSessionAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolSessionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
