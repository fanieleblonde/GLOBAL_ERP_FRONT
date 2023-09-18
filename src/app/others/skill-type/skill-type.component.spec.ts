import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTypeComponent } from './skill-type.component';

describe('SkillTypeComponent', () => {
  let component: SkillTypeComponent;
  let fixture: ComponentFixture<SkillTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillTypeComponent]
    });
    fixture = TestBed.createComponent(SkillTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
