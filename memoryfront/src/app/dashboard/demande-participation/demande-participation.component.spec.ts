import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeParticipationComponent } from './demande-participation.component';

describe('DemandeParticipationComponent', () => {
  let component: DemandeParticipationComponent;
  let fixture: ComponentFixture<DemandeParticipationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeParticipationComponent]
    });
    fixture = TestBed.createComponent(DemandeParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
