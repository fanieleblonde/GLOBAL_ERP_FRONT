import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExspenseHeadingComponent } from './exspense-heading.component';

describe('ExspenseHeadingComponent', () => {
  let component: ExspenseHeadingComponent;
  let fixture: ComponentFixture<ExspenseHeadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExspenseHeadingComponent]
    });
    fixture = TestBed.createComponent(ExspenseHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
