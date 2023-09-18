import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcourAddEditComponent } from './concour-add-edit.component';

describe('ConcourAddEditComponent', () => {
  let component: ConcourAddEditComponent;
  let fixture: ComponentFixture<ConcourAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcourAddEditComponent]
    });
    fixture = TestBed.createComponent(ConcourAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
