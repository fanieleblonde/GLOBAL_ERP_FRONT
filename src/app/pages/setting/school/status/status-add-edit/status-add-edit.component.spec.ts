import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusAddEditComponent } from './status-add-edit.component';

describe('StatusAddEditComponent', () => {
  let component: StatusAddEditComponent;
  let fixture: ComponentFixture<StatusAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusAddEditComponent]
    });
    fixture = TestBed.createComponent(StatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
