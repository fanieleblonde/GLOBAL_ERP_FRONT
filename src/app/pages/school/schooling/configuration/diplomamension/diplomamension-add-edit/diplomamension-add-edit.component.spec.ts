import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomamensionAddEditComponent } from './diplomamension-add-edit.component';

describe('DiplomamensionAddEditComponent', () => {
  let component: DiplomamensionAddEditComponent;
  let fixture: ComponentFixture<DiplomamensionAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiplomamensionAddEditComponent]
    });
    fixture = TestBed.createComponent(DiplomamensionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
