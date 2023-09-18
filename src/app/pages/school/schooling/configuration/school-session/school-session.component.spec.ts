import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolSessionComponent } from './school-session.component';

describe('SchoolSessionComponent', () => {
  let component: SchoolSessionComponent;
  let fixture: ComponentFixture<SchoolSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolSessionComponent]
    });
    fixture = TestBed.createComponent(SchoolSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
