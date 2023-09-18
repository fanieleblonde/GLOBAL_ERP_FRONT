import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolClassComponent } from './school-class.component';

describe('SchoolClassComponent', () => {
  let component: SchoolClassComponent;
  let fixture: ComponentFixture<SchoolClassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolClassComponent]
    });
    fixture = TestBed.createComponent(SchoolClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
