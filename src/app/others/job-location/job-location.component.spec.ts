import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLocationComponent } from './job-location.component';

describe('JobLocationComponent', () => {
  let component: JobLocationComponent;
  let fixture: ComponentFixture<JobLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobLocationComponent]
    });
    fixture = TestBed.createComponent(JobLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
