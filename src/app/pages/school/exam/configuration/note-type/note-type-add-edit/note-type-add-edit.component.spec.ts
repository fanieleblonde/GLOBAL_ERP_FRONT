import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteTypeAddEditComponent } from './note-type-add-edit.component';

describe('NoteTypeAddEditComponent', () => {
  let component: NoteTypeAddEditComponent;
  let fixture: ComponentFixture<NoteTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(NoteTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
