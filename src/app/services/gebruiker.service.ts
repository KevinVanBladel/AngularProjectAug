import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class gebruikerService {
  private currentUserSubject: BehaviorSubject<Gebruiker>;
  public currentUser: Observable<Gebruiker>;
  myAppUrl: string;
  myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Gebruiker>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();  
    this.myAppUrl = "http://localhost:5000/";
    this.myApiUrl = 'api/gebruiker/';
  }

  public get currentUserValue(): Gebruiker{
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(this.myAppUrl+this.myApiUrl+"login", { UserName : username, Password : password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', user.token);
                this.currentUserSubject.next(user);
                return user;
            }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}