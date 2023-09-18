import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalStatusAddEditComponent } from './marital-status-add-edit.component';

describe('MaritalStatusAddEditComponent', () => {
  let component: MaritalStatusAddEditComponent;
  let fixture: ComponentFixture<MaritalStatusAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaritalStatusAddEditComponent]
    });
    fixture = TestBed.createComponent(MaritalStatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
