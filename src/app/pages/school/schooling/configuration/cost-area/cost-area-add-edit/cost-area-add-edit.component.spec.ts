import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAreaAddEditComponent } from './cost-area-add-edit.component';

describe('CostAreaAddEditComponent', () => {
  let component: CostAreaAddEditComponent;
  let fixture: ComponentFixture<CostAreaAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostAreaAddEditComponent]
    });
    fixture = TestBed.createComponent(CostAreaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
