import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionComponent } from './religion.component';

describe('ReligionComponent', () => {
  let component: ReligionComponent;
  let fixture: ComponentFixture<ReligionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReligionComponent]
    });
    fixture = TestBed.createComponent(ReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
