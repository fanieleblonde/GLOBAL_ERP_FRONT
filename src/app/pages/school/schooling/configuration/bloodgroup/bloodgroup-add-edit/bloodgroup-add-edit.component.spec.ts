import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupAddEditComponent } from './bloodgroup-add-edit.component';

describe('BloodgroupAddEditComponent', () => {
  let component: BloodgroupAddEditComponent;
  let fixture: ComponentFixture<BloodgroupAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodgroupAddEditComponent]
    });
    fixture = TestBed.createComponent(BloodgroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
