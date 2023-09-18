import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddEditComponent } from './menu-add-edit.component';

describe('ParticipantAddEditComponent', () => {
  let component: MenuAddEditComponent;
  let fixture: ComponentFixture<MenuAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAddEditComponent]
    });
    fixture = TestBed.createComponent(MenuAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
