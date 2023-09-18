import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAddEditComponent } from './target-add-edit.component';

describe('TargetAddEditComponent', () => {
  let component: TargetAddEditComponent;
  let fixture: ComponentFixture<TargetAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetAddEditComponent]
    });
    fixture = TestBed.createComponent(TargetAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
