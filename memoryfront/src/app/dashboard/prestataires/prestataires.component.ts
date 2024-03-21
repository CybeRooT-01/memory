import { Component } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { Evenement } from 'src/app/Interfaces/Evenement';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { Prestataire } from 'src/app/Interfaces/Prestataire';
import { AuthService } from 'src/app/services/auth.service';
import { EvenementService } from 'src/app/services/evenement.service';
import { PrestataireService } from 'src/app/services/prestataire.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-prestataires',
  templateUrl: './prestataires.component.html',
  styleUrls: ['./prestataires.component.css']
})
export class PrestatairesComponent {

  prestataire : Prestataire[] = [];
  evenements: Evenement[] = [];
  user_id: number | undefined ;
  selectedEventId: number | undefined;
  message: string = '';
  allPrestataires: Prestataire[] = [];
  isLoading:boolean = true
  isEmptyInvitation:boolean = false;

  constructor(
    private prestataireservice: PrestataireService,
    private evenementService: EvenementService,
    private sharedService: SharedService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.prestataireservice.All().subscribe((response) => {
      this.prestataire = response.data;
      this.allPrestataires = response.data;
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    });

    this.sharedService.userData$.subscribe((userData: LoggedUser) => {
      this.user_id = userData.data?.id;
    });

    this.evenementService.All().subscribe((response) => {      
      this.evenements = response.filter((evenement:Evenement) => {
        return evenement.createur.id === this.user_id;
      });
      this.isLoading = false
      this.isEmptyInvitation = this.evenements.length === 0
      console.log(this.evenements);
      console.log(this.user_id);
      
      
    });
  }
  isInviterBtnLoading: boolean = false;
  inviter(id: number|undefined, event_id: number|undefined, message: string){
    this.isInviterBtnLoading = true;

    let data = {
      inviteur_id: this.user_id,
      invite_id: id,
      message: message,
      evenement_id: event_id
    }
    if(event_id === undefined || +event_id === 0){
      this.toastr.error('Veuillez selectionner un evenement');
      this.isInviterBtnLoading = false;
      return;
    }
    data.evenement_id = +event_id;
    console.log(data);
    this.prestataireservice.invite(data).subscribe((response: any) => {
      this.isInviterBtnLoading = false;

      if(response.status === 201){
        this.toastr.success('Invitation envoyée avec succès');
        this.message = '';
        this.ngOnInit()
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.isInviterBtnLoading = false;

    });
  }
searchPrestataire(event: any){
  this.prestataire = this.allPrestataires.filter((prestataire: Prestataire) => {
    return prestataire.nom.toLowerCase().includes(event.target.value.toLowerCase() )
    });
}

    


}
