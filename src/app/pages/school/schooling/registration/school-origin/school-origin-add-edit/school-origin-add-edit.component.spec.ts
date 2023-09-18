import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOriginAddEditComponent } from './school-origin-add-edit.component';

describe('SchoolOriginAddEditComponent', () => {
  let component: SchoolOriginAddEditComponent;
  let fixture: ComponentFixture<SchoolOriginAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolOriginAddEditComponent]
    });
    fixture = TestBed.createComponent(SchoolOriginAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
