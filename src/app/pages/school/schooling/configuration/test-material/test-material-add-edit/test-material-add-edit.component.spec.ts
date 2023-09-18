import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMaterialAddEditComponent } from './test-material-add-edit.component';

describe('TestMaterialAddEditComponent', () => {
  let component: TestMaterialAddEditComponent;
  let fixture: ComponentFixture<TestMaterialAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestMaterialAddEditComponent]
    });
    fixture = TestBed.createComponent(TestMaterialAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
