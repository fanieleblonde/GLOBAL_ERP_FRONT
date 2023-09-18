import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimeAddEditComponent } from './regime-add-edit.component';

describe('RegimeAddEditComponent', () => {
  let component: RegimeAddEditComponent;
  let fixture: ComponentFixture<RegimeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegimeAddEditComponent]
    });
    fixture = TestBed.createComponent(RegimeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
