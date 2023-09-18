import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentionschemeComponent } from './pentionscheme.component';

describe('PentionschemeComponent', () => {
  let component: PentionschemeComponent;
  let fixture: ComponentFixture<PentionschemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PentionschemeComponent]
    });
    fixture = TestBed.createComponent(PentionschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
