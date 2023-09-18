import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudoldregistrationAddEditComponent } from './studoldregistration-add-edit.component';

describe('StudoldregistrationAddEditComponent', () => {
  let component: StudoldregistrationAddEditComponent;
  let fixture: ComponentFixture<StudoldregistrationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudoldregistrationAddEditComponent]
    });
    fixture = TestBed.createComponent(StudoldregistrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
