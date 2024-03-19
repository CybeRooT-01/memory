import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';
import { RestResponse } from '../Interfaces/RestResponse';
import { Prestataire } from '../Interfaces/Prestataire';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService extends RestService<RestResponse<Prestataire>> {

  override uri(): string {
    return 'prestataires';
  }


  invite(data: any){
    return this.http.post('http://localhost:8000/api/prestataire/invite', data);
  }
  getInvitations(id: number | undefined){
    return this.http.get('http://localhost:8000/api/prestataire/'+id+'/invitations');
  }

  acceptInvitation(id: number | undefined){
    return this.http.put('http://localhost:8000/api/prestataire/invitation/accepter/'+id, {});
  }

  refuseInvitation(id: number | undefined){
    return this.http.delete('http://localhost:8000/api/prestataire/invitation/refuser/'+id);
  }


}
