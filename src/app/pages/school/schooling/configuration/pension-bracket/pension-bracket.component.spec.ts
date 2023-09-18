import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionBracketComponent } from './pension-bracket.component';

describe('PensionBracketComponent', () => {
  let component: PensionBracketComponent;
  let fixture: ComponentFixture<PensionBracketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PensionBracketComponent]
    });
    fixture = TestBed.createComponent(PensionBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
