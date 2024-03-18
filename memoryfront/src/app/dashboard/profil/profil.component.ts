import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { NotationService } from 'src/app/services/notation.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  UserBizzare: LoggedUser = {};
  UserConnected: LoggedUser = {};
  showTextarea = false;
  comment: string = '';
  constructor(
    private authservice: AuthService,
    private notationservice: NotationService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    let url = window.location.href;
    console.log(url);
    let parambizzare = url.split('/')[4];
    console.log(parambizzare);
    this.authservice
      .getUserByIdBizzare(parambizzare)
      .subscribe((response: LoggedUser) => {
        console.log(response);
        this.UserBizzare = response;
      });

      this.authservice.getCurrentUser().subscribe((response: LoggedUser) => {
        this.UserConnected = response;
      });

    const bootstrapScript = document.createElement('script');
    bootstrapScript.src =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js';
    bootstrapScript.async = true;
    document.body.appendChild(bootstrapScript);
  }

  showTextareaOnClick() {
    this.showTextarea = true;
  }
  getSelectedRating(): number {
    const selectedRating = document.querySelector('input[name="rate"]:checked');
    return parseInt(selectedRating?.getAttribute('value') || '0');
  }

  submitRating() {
    const data = {
      note: this.getSelectedRating(),
      commentaire: this.comment,
      notee_id: this.UserBizzare.data?.id,
      noteur_id: this.UserConnected.data?.id,
    };
    console.log(data);
    if(data.note === 0){
      this.toastr.error('Veuillez choisir une note');
      return;
    }
    if (data.notee_id == data.noteur_id) {
      this.toastr.error('Vous ne pouvez pas vous noter');
      return;
    }

    this.notationservice.create(data).subscribe(
      (response:any) => {
        console.log(response);
        this.toastr.success(response.message);
        this.showTextarea = false;
        this.comment = '';
      },
      (error) => {
        console.error(error);
        this.toastr.error('Une erreur est survenue lors de l\'enregistrement de votre note. Veuillez réessayer.');
      }
    );
    
    
    
  }
}
