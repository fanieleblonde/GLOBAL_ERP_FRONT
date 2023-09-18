import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillAddEditComponent } from './skill-add-edit.component';

describe('SkillAddEditComponent', () => {
  let component: SkillAddEditComponent;
  let fixture: ComponentFixture<SkillAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillAddEditComponent]
    });
    fixture = TestBed.createComponent(SkillAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
