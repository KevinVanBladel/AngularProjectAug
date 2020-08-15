import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class gebruikerService {
  private currentUserSubject: BehaviorSubject<Gebruiker>;
  public currentUser: Observable<Gebruiker>;
  private logincheck: string;
  user: Gebruiker;
  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("currentUser")
    })
  };
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Gebruiker>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    this.myAppUrl = "http://localhost:5000/";
    this.myApiUrl = 'api/gebruiker/';
    
  }

  GetUser(): Observable<Gebruiker>{ 
    return this.http.get<Gebruiker>(this.myAppUrl+this.myApiUrl, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  login(username: string, password: string) {
    return this.http.post<Gebruiker>(this.myAppUrl+this.myApiUrl+"login", { UserName : username, Password : password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', user.token);
                this.currentUserSubject.next(user);
                return user;
            }));
  }
  register(UserName, Password, Voornaam, Achternaam){
   return this.http.post<Gebruiker>(this.myAppUrl+this.myApiUrl+"register", { UserName : UserName, Password : Password, Voornaam : Voornaam, Achternaam : Achternaam})
   .subscribe((data) => {
   });
  }
 isLoggedIn() {
   this.logincheck = localStorage.getItem("currentUser");
   if(this.logincheck != null){

     return true;
   }
   else{
     return false;
   }
   
  }

  logout() {
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