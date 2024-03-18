import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggedUser } from '../Interfaces/LoggedUser';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedData: any;

  constructor() { }
  private userDataSubject = new Subject<LoggedUser>();
  userData$ = this.userDataSubject.asObservable();

  setUserData(userData: LoggedUser) {
    this.userDataSubject.next(userData);
  }
}
