import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCurrentYearComponent } from './user-current-year.component';

describe('UserCurrentYearComponent', () => {
  let component: UserCurrentYearComponent;
  let fixture: ComponentFixture<UserCurrentYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCurrentYearComponent]
    });
    fixture = TestBed.createComponent(UserCurrentYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
