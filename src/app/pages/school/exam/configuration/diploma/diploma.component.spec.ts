import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaComponent } from './diploma.component';

describe('DiplomaComponent', () => {
  let component: DiplomaComponent;
  let fixture: ComponentFixture<DiplomaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomaComponent]
    });
    fixture = TestBed.createComponent(DiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
