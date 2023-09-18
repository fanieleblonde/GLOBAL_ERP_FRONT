import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomamensionComponent } from './diplomamension.component';

describe('DiplomamensionComponent', () => {
  let component: DiplomamensionComponent;
  let fixture: ComponentFixture<DiplomamensionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomamensionComponent]
    });
    fixture = TestBed.createComponent(DiplomamensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
