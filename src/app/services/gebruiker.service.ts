import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Gebruiker } from '../models/gebruiker';

@Injectable({
  providedIn: 'root'
})
export class gebruikerService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/gebruikers/';
  }

  getgebruikers(): Observable<Gebruiker[]> {
    return this.http.get<Gebruiker[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getgebruiker(id: string): Observable<Gebruiker> {
      return this.http.get<Gebruiker>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savegebruiker(gebruiker): Observable<Gebruiker> {
      return this.http.post<Gebruiker>(this.myAppUrl + this.myApiUrl, JSON.stringify(gebruiker), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updategebruiker(id: string, gebruiker): Observable<Gebruiker> {
      return this.http.put<Gebruiker>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(gebruiker), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletegebruiker(id: string): Observable<Gebruiker> {
      return this.http.delete<Gebruiker>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
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