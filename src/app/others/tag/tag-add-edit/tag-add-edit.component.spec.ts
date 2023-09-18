import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAddEditComponent } from './tag-add-edit.component';

describe('TagAddEditComponent', () => {
  let component: TagAddEditComponent;
  let fixture: ComponentFixture<TagAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagAddEditComponent]
    });
    fixture = TestBed.createComponent(TagAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
