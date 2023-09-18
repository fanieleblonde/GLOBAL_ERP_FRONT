import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExspenseHeadingAddEditComponent } from './exspense-heading-add-edit.component';

describe('ExspenseHeadingAddEditComponent', () => {
  let component: ExspenseHeadingAddEditComponent;
  let fixture: ComponentFixture<ExspenseHeadingAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExspenseHeadingAddEditComponent]
    });
    fixture = TestBed.createComponent(ExspenseHeadingAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
