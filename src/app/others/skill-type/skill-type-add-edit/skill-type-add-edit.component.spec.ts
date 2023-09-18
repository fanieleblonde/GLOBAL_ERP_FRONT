import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTypeAddEditComponent } from './skill-type-add-edit.component';

describe('SkillTypeAddEditComponent', () => {
  let component: SkillTypeAddEditComponent;
  let fixture: ComponentFixture<SkillTypeAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillTypeAddEditComponent]
    });
    fixture = TestBed.createComponent(SkillTypeAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
