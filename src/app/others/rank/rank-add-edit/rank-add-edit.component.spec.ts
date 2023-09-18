import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankAddEditComponent } from './rank-add-edit.component';

describe('RankAddEditComponent', () => {
  let component: RankAddEditComponent;
  let fixture: ComponentFixture<RankAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RankAddEditComponent]
    });
    fixture = TestBed.createComponent(RankAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
