import { Injectable } from '@angular/core';
import { RestService } from './rest-service.service';
import { RestResponse } from '../Interfaces/RestResponse';
import {
  DemandeParticipation,
  DemandeParticipationRequest,
} from '../Interfaces/DemandeParticipation';
import { Environnements } from 'src/environements/environnements';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemandeParticipationService extends RestService<
  RestResponse<DemandeParticipation>
> {
  override uri(): string {
    return 'demande-participation';
  }

  DemanderParticipation(data: Partial<DemandeParticipationRequest>): any {
    return this.http
      .post(`${Environnements.api.baseUrl}/${this.uri()}`, data)
      .pipe(
        tap((response: any): void => {
          console.log(response);
        })
      );
  }
}
