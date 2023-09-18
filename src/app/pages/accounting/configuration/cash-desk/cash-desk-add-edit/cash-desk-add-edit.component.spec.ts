import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashDeskAddEditComponent } from './cash-desk-add-edit.component';

describe('CashDeskAddEditComponent', () => {
  let component: CashDeskAddEditComponent;
  let fixture: ComponentFixture<CashDeskAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashDeskAddEditComponent]
    });
    fixture = TestBed.createComponent(CashDeskAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
