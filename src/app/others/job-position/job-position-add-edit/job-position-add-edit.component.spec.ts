import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPositionAddEditComponent } from './job-position-add-edit.component';

describe('JobPositionAddEditComponent', () => {
  let component: JobPositionAddEditComponent;
  let fixture: ComponentFixture<JobPositionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobPositionAddEditComponent]
    });
    fixture = TestBed.createComponent(JobPositionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
