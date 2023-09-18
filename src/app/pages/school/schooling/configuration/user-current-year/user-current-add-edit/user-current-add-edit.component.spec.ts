import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentAddEditComponent } from './user-current-add-edit.component';

describe('UserCurrentAddEditComponent', () => {
  let component: UserCurrentAddEditComponent;
  let fixture: ComponentFixture<UserCurrentAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCurrentAddEditComponent]
    });
    fixture = TestBed.createComponent(UserCurrentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
