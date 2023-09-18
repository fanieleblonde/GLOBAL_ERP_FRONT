import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplateAddEditComponent } from './contract-template-add-edit.component';

describe('ContractTemplateAddEditComponent', () => {
  let component: ContractTemplateAddEditComponent;
  let fixture: ComponentFixture<ContractTemplateAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractTemplateAddEditComponent]
    });
    fixture = TestBed.createComponent(ContractTemplateAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
