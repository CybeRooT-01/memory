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
}
