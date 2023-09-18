import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassProgramComponent } from './class-program.component';

describe('ClassProgramComponent', () => {
  let component: ClassProgramComponent;
  let fixture: ComponentFixture<ClassProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassProgramComponent]
    });
    fixture = TestBed.createComponent(ClassProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
