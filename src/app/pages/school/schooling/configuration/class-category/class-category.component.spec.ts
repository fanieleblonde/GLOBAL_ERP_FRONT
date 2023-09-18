import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassCategoryComponent } from './class-category.component';

describe('ClassCategoryComponent', () => {
  let component: ClassCategoryComponent;
  let fixture: ComponentFixture<ClassCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassCategoryComponent]
    });
    fixture = TestBed.createComponent(ClassCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
