import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAddEditComponent } from './quality-add-edit.component';

describe('QualityAddEditComponent', () => {
  let component: QualityAddEditComponent;
  let fixture: ComponentFixture<QualityAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityAddEditComponent]
    });
    fixture = TestBed.createComponent(QualityAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
