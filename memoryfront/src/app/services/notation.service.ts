import { Injectable } from '@angular/core';
import { RestResponse } from '../Interfaces/RestResponse';
import { Notations } from '../Interfaces/Notation';
import { RestService } from './rest-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotationService extends RestService<Notations> {

  override uri(): string {
    return 'notation';
  }
}
