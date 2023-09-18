import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraguationAddEditComponent } from './graguation-add-edit.component';

describe('GraguationAddEditComponent', () => {
  let component: GraguationAddEditComponent;
  let fixture: ComponentFixture<GraguationAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraguationAddEditComponent]
    });
    fixture = TestBed.createComponent(GraguationAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
