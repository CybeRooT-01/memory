import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from 'src/app/Interfaces/Evenement';
import { AuthService } from 'src/app/services/auth.service';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BirahimValidator } from 'src/app/validator/Birahim.validator';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
import { PrestataireService } from 'src/app/services/prestataire.service';
import { Prestataire } from 'src/app/Interfaces/Prestataire';
import { DemandeParticipationService } from 'src/app/services/demande-participation.service';
import { DemandeParticipationRequest } from '../../Interfaces/DemandeParticipation';

@Component({
  selector: 'app-evenements',
  templateUrl: './evenements.component.html',
  styleUrls: ['./evenements.component.css'],
})
export class EvenementsComponent implements OnInit {
  commentaire: any;
  checktime(e: Event) {
    console.log('ok');
  }
  checkdate(e: MatDatepickerInputEvent<Date>) {
    let datevalue = e.value?.toISOString().split('T')[0];
    if (
      datevalue! > this.today ||
      datevalue !== this.formulaire.value.date.toISOString().split('T')[0]
    ) {
      this.isModified = true;
    } else {
      this.isModified = false;
    }
  }
  isModified: boolean = false;
  iswritable: boolean = false;
  today: any = new Date(new Date()).toISOString().split('T')[0];
  selectedEvent: Evenement | undefined;
  demandeParticip: Evenement | undefined;
  SuppSelectedEvent: Evenement | undefined;
  updateSelectedEvent: Evenement | undefined;
  evenements: Evenement[] = [];
  allEvenements: Evenement[] = [];
  userlogged: LoggedUser | undefined;
  user_id: number | undefined;
  formulaire: FormGroup;
  prestataire_id: number | undefined;
  prestataires: Prestataire[] = [];
  @ViewChild('nom') nom!: ElementRef;
  @ViewChild('date') date!: ElementRef;
  @ViewChild('heure') heure!: ElementRef;
  @ViewChild('lieu') lieu!: ElementRef;
  @ViewChild('type_evenement') type_evenement!: ElementRef;
  @ViewChild('description') description!: ElementRef;

  constructor(
    private prestataireservice: PrestataireService,
    private evenementservice: EvenementService,
    private authservice: AuthService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private demandeParticipationService: DemandeParticipationService
  ) {
    this.formulaire = this.fb.group({
      nom: [''],
      date: ['', BirahimValidator.dateValide],
      heure: [''],
      lieu: [''],
      type_evenement: [''],
      description: [''],
    });
  }

  closeModal() {
    this.selectedEvent = undefined;
  }
  isMyEvent(event: Evenement): boolean {
    return event.createur.id === this.user_id;
  }

  ngOnInit(): void {
    console.log(this.today);

    this.evenementservice.All().subscribe((response: Evenement[]) => {
      this.evenements = response;
      this.allEvenements = response;
    });
    this.authservice.getCurrentUser().subscribe((user: LoggedUser) => {
      this.user_id = user.data?.id;
      this.userlogged = user;
      console.log(this.userlogged);
    });
    this.formulaire.get('heure')?.valueChanges.subscribe((value) => {
      let newhoraire = value;
      let ancienHoraire = this.updateSelectedEvent?.heure.slice(0, 5);
      if (newhoraire !== ancienHoraire) {
        this.isModified = true;
      } else {
        this.isModified = false;
      }
    });
   
  }

  searchEvent($event: any) {
    // console.log($event.target.value);
    if ($event.target.value === '') {
      this.evenements = this.allEvenements;
    } else {
      let filtered = this.allEvenements.filter((event: Evenement) => {
        return event.nom
          .toLowerCase()
          .includes($event.target.value.toLowerCase());
      });
      this.evenements = filtered;
    }
  }
  getMyEvents() {
    this.evenementservice.All().subscribe((response: Evenement[]) => {
      this.evenements = response.filter((event: Evenement) => {
        return event.createur.id === this.user_id;
      });
    });
  }
  getAllEvents() {
    this.evenements = this.allEvenements;
  }
  openModal(ev: Evenement) {
    this.selectedEvent = ev;
  }
  openSuppModal(ev: Evenement) {
    this.SuppSelectedEvent = ev;
  }
  closeSuppModal() {
    this.SuppSelectedEvent = undefined;
  }
  deleteAll($event: Event) {
    let val = ($event.target as HTMLInputElement).value;
    const cleanedValue = val.replace(/[a-zA-Z]/g, '');
    ($event.target as HTMLInputElement).value = cleanedValue;
  }

  // Votre logique ici lorsqu'une nouvelle date est sélectionnée

  openUpdateModal(ev: Evenement) {
    this.updateSelectedEvent = ev;
    this.formulaire.setValue({
      nom: ev.nom,
      date: ev.date,
      heure: ev.heure.slice(0, 5),
      lieu: ev.lieu,
      type_evenement: ev.type_evenement,
      description: ev.description,
    });
    setTimeout(() => {
      this.renderer.listen(this.nom.nativeElement, 'input', (event) => {
        if (
          this.nom.nativeElement.value !== ev.nom &&
          this.nom.nativeElement.value !== ''
        ) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      this.renderer.listen(this.lieu.nativeElement, 'input', (event) => {
        if (
          this.lieu.nativeElement.value !== ev.lieu &&
          this.lieu.nativeElement.value !== ''
        ) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
      this.renderer.listen(
        this.type_evenement.nativeElement,
        'input',
        (event) => {
          if (
            this.type_evenement.nativeElement.value !== ev.type_evenement &&
            this.type_evenement.nativeElement.value !== ''
          ) {
            this.isModified = true;
          } else {
            this.isModified = false;
          }
        }
      );
      this.renderer.listen(this.description.nativeElement, 'input', (event) => {
        if (
          this.description.nativeElement.value !== ev.description &&
          this.description.nativeElement.value !== ''
        ) {
          this.isModified = true;
        } else {
          this.isModified = false;
        }
      });
    }, 1000);
  }
  closeUpdateModal(e: Event) {
    e.preventDefault();
    this.updateSelectedEvent = undefined;
  }
  deleteEVent(id: number) {
    console.log(id);
    this.evenementservice.delete(id).subscribe((response: any) => {
      if (response.status === 200) {
        this.evenements = this.evenements.filter((event: Evenement) => {
          return event.id !== id;
        });
        this.SuppSelectedEvent = undefined;
      }
    });
  }

  updateEvent(id: number) {
    let data: any = {
      id: id,
      nom: this.formulaire.value.nom,
      date: this.formulaire.value.date,
      heure: this.formulaire.value.heure,
      lieu: this.formulaire.value.lieu,
      type_evenement: this.formulaire.value.type_evenement,
      description: this.formulaire.value.description,
      user_id: this.user_id,
    };
    console.log(data);
    this.evenementservice.update(data).subscribe((response: any) => {
      if (response.status === 200) {
        this.toastr.success('Evenement modifié avec succès');
        this.ngOnInit();
        this.updateSelectedEvent = undefined;
      }
    });
  }
  closeDemandeModal() {
    this.demandeParticip = undefined;
  }

  openDemandeModal(dmnde: Evenement) {
    this.demandeParticip = dmnde;
     if (this.userlogged?.data?.role === 'Prestataire de Services') {
       console.log('je suis un prestataire de service');
      let presta
       this.prestataireservice.All().subscribe((response: any) => {
         this.prestataires = response.data;
         presta =
         this.prestataires.filter(
           (prestataire: Prestataire) => {
             return prestataire.user?.id === this.user_id;
           }
           )[0];
         if (presta) {
           this.prestataire_id = presta.id;
         }
       });
     }
  }
  demandeParticipation(id: number) {
    let data: DemandeParticipationRequest = {
      evenement_id: id,
      prestataire_id: this.prestataire_id,
      commentaire: this.commentaire,
    };
    if (this.prestataire_id === undefined) {
      this.toastr.error(
        'Veuillez mettre a jour votre profil prestataire pour pouvoir participer à un événement'
      );
      return;
    }
    console.log(data);
    this.demandeParticipationService.DemanderParticipation(data).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
        this.demandeParticip = undefined;
      },
      (error: any) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
