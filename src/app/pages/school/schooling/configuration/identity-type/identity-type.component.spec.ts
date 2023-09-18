import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityTypeComponent } from './identity-type.component';

describe('IdentityTypeComponent', () => {
  let component: IdentityTypeComponent;
  let fixture: ComponentFixture<IdentityTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityTypeComponent]
    });
    fixture = TestBed.createComponent(IdentityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
