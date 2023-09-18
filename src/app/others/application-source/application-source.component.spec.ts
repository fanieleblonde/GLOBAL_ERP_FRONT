import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSourceComponent } from './application-source.component';

describe('ApplicationSourceComponent', () => {
  let component: ApplicationSourceComponent;
  let fixture: ComponentFixture<ApplicationSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationSourceComponent]
    });
    fixture = TestBed.createComponent(ApplicationSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
