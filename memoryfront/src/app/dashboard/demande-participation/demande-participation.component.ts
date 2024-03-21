import { Component, OnInit } from '@angular/core';
import { DemandeParticipationService } from '../../services/demande-participation.service';
import { DemandeParticipation } from 'src/app/Interfaces/DemandeParticipation';
import { MatNativeDateModule } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-demande-participation',
  templateUrl: './demande-participation.component.html',
  styleUrls: ['./demande-participation.component.css'],
})
export class DemandeParticipationComponent implements OnInit {
  isLoading:boolean = true;
  isEmptyInvitation:boolean = false;
  constructor(
    private demandeParticipationService: DemandeParticipationService,
    private toastr: ToastrService
  ) {}
  demandeParticipation: DemandeParticipation[] = [];

  ngOnInit(): void {
    this.demandeParticipationService.All().subscribe((response) => {
      this.demandeParticipation = response.filter(
        (element: DemandeParticipation) => {
          return element.etat === 'en attente';
        }
      );
      this.isLoading = false
      console.log(this.demandeParticipation);
      this.isEmptyInvitation = this.demandeParticipation.length === 0;
    });
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);
  }

  valider(id: number) {
    let data = {
      id: id,
    };
    this.demandeParticipationService.update(data).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success(response.message);
        this.demandeParticipation = this.demandeParticipation.filter(
          (element: DemandeParticipation) => {
            return element.id !== id;
          }
        );
        this.isEmptyInvitation = this.demandeParticipation.length === 0;

      },
      (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

  refuser(id: number) {
    this.demandeParticipationService.delete(id).subscribe(
      (response: any) => {
        console.log(response);
        this.toastr.success(response.message);
        this.demandeParticipation = this.demandeParticipation.filter(
          (element: DemandeParticipation) => {
            return element.id !== id;
          }
        );
        this.isEmptyInvitation = this.demandeParticipation.length === 0;
      },
      (error: any) => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }
}
