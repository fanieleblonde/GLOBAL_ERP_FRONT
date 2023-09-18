import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionschemeAddEditComponent } from './pentionscheme-add-edit.component';

describe('PentionschemeAddEditComponent', () => {
  let component: PentionschemeAddEditComponent;
  let fixture: ComponentFixture<PentionschemeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PentionschemeAddEditComponent]
    });
    fixture = TestBed.createComponent(PentionschemeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
