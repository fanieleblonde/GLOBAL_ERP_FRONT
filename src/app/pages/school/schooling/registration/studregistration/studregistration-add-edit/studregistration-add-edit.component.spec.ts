import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudregistrationAddEditComponent } from './studregistration-add-edit.component';

describe('StudregistrationAddEditComponent', () => {
  let component: StudregistrationAddEditComponent;
  let fixture: ComponentFixture<StudregistrationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudregistrationAddEditComponent]
    });
    fixture = TestBed.createComponent(StudregistrationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
