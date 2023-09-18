import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGroupAddEditComponent } from './test-group-add-edit.component';

describe('TestGroupAddEditComponent', () => {
  let component: TestGroupAddEditComponent;
  let fixture: ComponentFixture<TestGroupAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestGroupAddEditComponent]
    });
    fixture = TestBed.createComponent(TestGroupAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
