import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatairesComponent } from './prestataires.component';

describe('PrestatairesComponent', () => {
  let component: PrestatairesComponent;
  let fixture: ComponentFixture<PrestatairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestatairesComponent]
    });
    fixture = TestBed.createComponent(PrestatairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
