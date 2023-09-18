import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcourComponent } from './concour.component';

describe('ConcourComponent', () => {
  let component: ConcourComponent;
  let fixture: ComponentFixture<ConcourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConcourComponent]
    });
    fixture = TestBed.createComponent(ConcourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
