import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RhesusComponent } from './rhesus.component';

describe('RhesusComponent', () => {
  let component: RhesusComponent;
  let fixture: ComponentFixture<RhesusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RhesusComponent]
    });
    fixture = TestBed.createComponent(RhesusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
