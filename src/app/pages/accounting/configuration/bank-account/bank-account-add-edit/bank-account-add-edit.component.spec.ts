import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountAddEditComponent } from './bank-account-add-edit.component';

describe('BankAccountAddEditComponent', () => {
  let component: BankAccountAddEditComponent;
  let fixture: ComponentFixture<BankAccountAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAccountAddEditComponent]
    });
    fixture = TestBed.createComponent(BankAccountAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
