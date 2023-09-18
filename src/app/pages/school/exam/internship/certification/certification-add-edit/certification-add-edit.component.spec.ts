import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationAddEditComponent } from './certification-add-edit.component';

describe('CertificationAddEditComponent', () => {
  let component: CertificationAddEditComponent;
  let fixture: ComponentFixture<CertificationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationAddEditComponent]
    });
    fixture = TestBed.createComponent(CertificationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
