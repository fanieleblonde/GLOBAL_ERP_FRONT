import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndRoomComponent } from './class-and-room.component';

describe('ClassAndRoomComponent', () => {
  let component: ClassAndRoomComponent;
  let fixture: ComponentFixture<ClassAndRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassAndRoomComponent]
    });
    fixture = TestBed.createComponent(ClassAndRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
