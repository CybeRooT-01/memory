import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPrestataireComponent } from './profil-prestataire.component';

describe('ProfilPrestataireComponent', () => {
  let component: ProfilPrestataireComponent;
  let fixture: ComponentFixture<ProfilPrestataireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilPrestataireComponent]
    });
    fixture = TestBed.createComponent(ProfilPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
