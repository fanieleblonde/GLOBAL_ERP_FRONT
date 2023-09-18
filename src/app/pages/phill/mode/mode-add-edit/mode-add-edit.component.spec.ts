import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeAddEditComponent } from './mode-add-edit.component';

describe('ModeAddEditComponent', () => {
  let component: ModeAddEditComponent;
  let fixture: ComponentFixture<ModeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeAddEditComponent]
    });
    fixture = TestBed.createComponent(ModeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
