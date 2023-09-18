import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndHourlyrateComponent } from './class-and-hourlyrate.component';

describe('ClassAndHourlyrateComponent', () => {
  let component: ClassAndHourlyrateComponent;
  let fixture: ComponentFixture<ClassAndHourlyrateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAndHourlyrateComponent]
    });
    fixture = TestBed.createComponent(ClassAndHourlyrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
