import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Wedstrijd } from '../models/wedstrijd';

@Injectable({
  providedIn: 'root'
})
export class wedstrijdService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/wedstrijd/';
  }

  getwedstrijds(): Observable<Wedstrijd[]> {
    return this.http.get<Wedstrijd[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getwedstrijd(id: number): Observable<Wedstrijd> {
      return this.http.get<Wedstrijd>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savewedstrijd(wedstrijd): Observable<Wedstrijd> {
      return this.http.post<Wedstrijd>(this.myAppUrl + this.myApiUrl, JSON.stringify(wedstrijd), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updatewedstrijd(id: number, wedstrijd): Observable<Wedstrijd> {
      return this.http.put<Wedstrijd>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(wedstrijd), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletewedstrijd(id: number): Observable<Wedstrijd> {
      return this.http.delete<Wedstrijd>(this.myAppUrl + this.myApiUrl + id)
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