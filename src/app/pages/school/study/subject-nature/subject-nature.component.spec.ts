import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectNatureComponent } from './subject-nature.component';

describe('SubjectNatureComponent', () => {
  let component: SubjectNatureComponent;
  let fixture: ComponentFixture<SubjectNatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectNatureComponent]
    });
    fixture = TestBed.createComponent(SubjectNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
