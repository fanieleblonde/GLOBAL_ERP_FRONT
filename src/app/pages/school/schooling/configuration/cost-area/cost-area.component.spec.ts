import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostAreaComponent } from './cost-area.component';

describe('CostAreaComponent', () => {
  let component: CostAreaComponent;
  let fixture: ComponentFixture<CostAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostAreaComponent]
    });
    fixture = TestBed.createComponent(CostAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
