import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchWorkAddEditComponent } from './research-work-add-edit.component';

describe('ResearchWorkAddEditComponent', () => {
  let component: ResearchWorkAddEditComponent;
  let fixture: ComponentFixture<ResearchWorkAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResearchWorkAddEditComponent]
    });
    fixture = TestBed.createComponent(ResearchWorkAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
