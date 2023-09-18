import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionBracketAddEditComponent } from './pension-bracket-add-edit.component';

describe('PensionBracketAddEditComponent', () => {
  let component: PensionBracketAddEditComponent;
  let fixture: ComponentFixture<PensionBracketAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PensionBracketAddEditComponent]
    });
    fixture = TestBed.createComponent(PensionBracketAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
