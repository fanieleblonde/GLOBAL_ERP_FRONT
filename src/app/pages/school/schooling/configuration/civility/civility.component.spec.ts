import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilityComponent } from './civility.component';

describe('CivilityComponent', () => {
  let component: CivilityComponent;
  let fixture: ComponentFixture<CivilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CivilityComponent]
    });
    fixture = TestBed.createComponent(CivilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
