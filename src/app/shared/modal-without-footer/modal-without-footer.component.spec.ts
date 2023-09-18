import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWithoutFooterComponent } from './modal-without-footer.component';

describe('ModalWithoutFooterComponent', () => {
  let component: ModalWithoutFooterComponent;
  let fixture: ComponentFixture<ModalWithoutFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalWithoutFooterComponent]
    });
    fixture = TestBed.createComponent(ModalWithoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
