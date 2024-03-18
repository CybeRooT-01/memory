import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPrestataireComponent } from './invitation-prestataire.component';

describe('InvitationPrestataireComponent', () => {
  let component: InvitationPrestataireComponent;
  let fixture: ComponentFixture<InvitationPrestataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvitationPrestataireComponent]
    });
    fixture = TestBed.createComponent(InvitationPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
