import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddEditComponent } from './role-add-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: RoleAddEditComponent;
  let fixture: ComponentFixture<RoleAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAddEditComponent]
    });
    fixture = TestBed.createComponent(RoleAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
