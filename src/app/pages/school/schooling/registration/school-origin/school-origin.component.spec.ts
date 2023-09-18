import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolOriginComponent } from './school-origin.component';

describe('SchoolOriginComponent', () => {
  let component: SchoolOriginComponent;
  let fixture: ComponentFixture<SchoolOriginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolOriginComponent]
    });
    fixture = TestBed.createComponent(SchoolOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
