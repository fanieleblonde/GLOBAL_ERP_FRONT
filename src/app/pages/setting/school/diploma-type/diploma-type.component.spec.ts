import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaTypeComponent } from './diploma-type.component';

describe('DiplomaTypeComponent', () => {
  let component: DiplomaTypeComponent;
  let fixture: ComponentFixture<DiplomaTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomaTypeComponent]
    });
    fixture = TestBed.createComponent(DiplomaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
