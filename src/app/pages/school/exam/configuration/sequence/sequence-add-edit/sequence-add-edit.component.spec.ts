import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceAddEditComponent } from './sequence-add-edit.component';

describe('SequenceAddEditComponent', () => {
  let component: SequenceAddEditComponent;
  let fixture: ComponentFixture<SequenceAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SequenceAddEditComponent]
    });
    fixture = TestBed.createComponent(SequenceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
