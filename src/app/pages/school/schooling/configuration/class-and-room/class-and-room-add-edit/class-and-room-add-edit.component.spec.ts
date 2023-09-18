import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndRoomAddEditComponent } from './class-and-room-add-edit.component';

describe('ClassAndRoomAddEditComponent', () => {
  let component: ClassAndRoomAddEditComponent;
  let fixture: ComponentFixture<ClassAndRoomAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAndRoomAddEditComponent]
    });
    fixture = TestBed.createComponent(ClassAndRoomAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
