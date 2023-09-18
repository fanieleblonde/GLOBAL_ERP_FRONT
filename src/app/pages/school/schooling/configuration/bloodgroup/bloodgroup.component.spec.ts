import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupComponent } from './bloodgroup.component';

describe('BloodgroupComponent', () => {
  let component: BloodgroupComponent;
  let fixture: ComponentFixture<BloodgroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloodgroupComponent]
    });
    fixture = TestBed.createComponent(BloodgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
