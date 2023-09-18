import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextClassAddEditComponent } from './next-class-add-edit.component';

describe('NextClassAddEditComponent', () => {
  let component: NextClassAddEditComponent;
  let fixture: ComponentFixture<NextClassAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextClassAddEditComponent]
    });
    fixture = TestBed.createComponent(NextClassAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
