import { Component, OnInit } from '@angular/core';
import { Invitation } from 'src/app/Interfaces/Invitations';
import { LoggedUser } from 'src/app/Interfaces/LoggedUser';
import { Response } from 'src/app/Interfaces/Response';
import { PrestataireService } from 'src/app/services/prestataire.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-invitation-prestataire',
  templateUrl: './invitation-prestataire.component.html',
  styleUrls: ['./invitation-prestataire.component.css']
})
export class InvitationPrestataireComponent implements OnInit{

  invitation:Invitation[] = [];
  user_id: number | undefined ;
  isLoading:boolean = true
  isEmptyInvitation: boolean = false;
  constructor(private sharedservice:SharedService, private prestataireservice:PrestataireService) { }

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    this.sharedservice.userData$.subscribe((userData: LoggedUser) => {
      this.user_id = userData.data?.id;
      console.log(this.user_id);
      this.getstuff()
      console.log("empty :" + this.isEmptyInvitation);
      
      this.isLoading = false;
    });
  }

  getstuff(){
    this.prestataireservice.getInvitations(this.user_id).subscribe((response: any) => {
      this.invitation = response.data;
      console.log(this.invitation);
      this.isEmptyInvitation = this.invitation.length === 0;
    });
  }
  isValiderBtnLoading: boolean = false;
  valider(id: number | undefined){
    this.isValiderBtnLoading = true;
    this.prestataireservice.acceptInvitation(id).subscribe((response: any) => {
      this.isValiderBtnLoading = false;
      if(response.statut === 200){
        console.log(response.statut);
        this.getstuff()
      }
    }, (error) => {
      this.isValiderBtnLoading = false;
      console.log(error);
    });
  }
  isRejetterBtnLoading: boolean = false;
  rejetter(id: number | undefined){
    this.isRejetterBtnLoading = true;
    this.prestataireservice.refuseInvitation(id).subscribe((response: any) => {
      if(response.statut === 200){
        this.isRejetterBtnLoading = false;
        console.log(response.statut);
        this.getstuff()
      }
    }, (error) => {
      this.isRejetterBtnLoading = false
      console.log(error);
    });
  }
    
}
