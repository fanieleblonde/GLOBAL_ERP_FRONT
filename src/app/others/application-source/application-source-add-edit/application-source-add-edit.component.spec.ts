import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSourceAddEditComponent } from './application-source-add-edit.component';

describe('ApplicationSourceAddEditComponent', () => {
  let component: ApplicationSourceAddEditComponent;
  let fixture: ComponentFixture<ApplicationSourceAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSourceAddEditComponent]
    });
    fixture = TestBed.createComponent(ApplicationSourceAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
