import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudregistrationComponent } from './studregistration.component';

describe('StudregistrationComponent', () => {
  let component: StudregistrationComponent;
  let fixture: ComponentFixture<StudregistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudregistrationComponent]
    });
    fixture = TestBed.createComponent(StudregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
