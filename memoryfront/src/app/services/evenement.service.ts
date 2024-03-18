import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';
import { Evenement } from '../Interfaces/Evenement';
import { RestResponse } from '../Interfaces/RestResponse';

@Injectable({
  providedIn: 'root',
})
export abstract class EvenementService extends RestService<RestResponse<Evenement>>{
  override uri(): string {
    return 'evenements';
  }


    
}
