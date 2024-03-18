import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environnements } from 'src/environements/environnements';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public http: HttpClient) {}

  url = `${Environnements.api.baseUrl}/message`;

  sendMessage(data: any) {
    return this.http.post(this.url, data);
  }
  getDiscussion(id: number | undefined) {
    return this.http.get(Environnements.api.baseUrl + `/user/${id}/messages`);
  }
}
