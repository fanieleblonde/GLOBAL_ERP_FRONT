import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTypeComponent } from './manager-type.component';

describe('ManagerTypeComponent', () => {
  let component: ManagerTypeComponent;
  let fixture: ComponentFixture<ManagerTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTypeComponent]
    });
    fixture = TestBed.createComponent(ManagerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
