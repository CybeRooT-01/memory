import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/AuthGuards';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { EvenementsComponent } from './evenements/evenements.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { RoleOrganisateurGuards } from '../shared/guards/RoleOrganisateurGuards';
import { ProfilComponent } from './profil/profil.component';
import { ProfilPrestataireComponent } from './profil-prestataire/profil-prestataire.component';
import { RolePrestataireGuards } from '../shared/guards/RolePrestataireGuards';
import { DemandeParticipationComponent } from './demande-participation/demande-participation.component';
import { ChatComponent } from './chat/chat.component';
import { PrestatairesComponent } from './prestataires/prestataires.component';
const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'acceuil',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'evenements',
        component: EvenementsComponent,
      },
      {
        path: 'acceuil',
        component: AcceuilComponent,
      },
      {
        path: 'create-event',
        component: CreateEventComponent,
        canActivate: [RoleOrganisateurGuards],
      },
      {
        path: 'profil/:idbizarre',
        component: ProfilComponent,
      },
      {
        path: 'profil-prestataire',
        component: ProfilPrestataireComponent,
        canActivate: [RolePrestataireGuards],
      },
      {
        path: 'demande-participation',
        component: DemandeParticipationComponent,
        canActivate: [RoleOrganisateurGuards],
      },
      {
        path: 'prestataires',
        component: PrestatairesComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    EvenementsComponent,
    AcceuilComponent,
    CreateEventComponent,
    ProfilComponent,
    ProfilPrestataireComponent,
    DemandeParticipationComponent,
    ChatComponent,
    PrestatairesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
  ],
})
export class DashboardModule {}
