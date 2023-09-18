import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAddEditComponent } from './institution-add-edit.component';

describe('InstitutionAddEditComponent', () => {
  let component: InstitutionAddEditComponent;
  let fixture: ComponentFixture<InstitutionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionAddEditComponent]
    });
    fixture = TestBed.createComponent(InstitutionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
