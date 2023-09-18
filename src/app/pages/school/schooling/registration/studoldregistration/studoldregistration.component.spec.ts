import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudoldregistrationComponent } from './studoldregistration.component';

describe('StudoldregistrationComponent', () => {
  let component: StudoldregistrationComponent;
  let fixture: ComponentFixture<StudoldregistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudoldregistrationComponent]
    });
    fixture = TestBed.createComponent(StudoldregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
