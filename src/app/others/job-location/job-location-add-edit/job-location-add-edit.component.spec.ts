import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLocationAddEditComponent } from './job-location-add-edit.component';

describe('JobLocationAddEditComponent', () => {
  let component: JobLocationAddEditComponent;
  let fixture: ComponentFixture<JobLocationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobLocationAddEditComponent]
    });
    fixture = TestBed.createComponent(JobLocationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
