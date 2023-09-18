import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLocationAddEditComponent } from './work-location-add-edit.component';

describe('WorkLocationAddEditComponent', () => {
  let component: WorkLocationAddEditComponent;
  let fixture: ComponentFixture<WorkLocationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkLocationAddEditComponent]
    });
    fixture = TestBed.createComponent(WorkLocationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
