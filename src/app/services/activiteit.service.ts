import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activiteit } from '../models/activiteit';

@Injectable({
  providedIn: 'root'
})
export class activiteitService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/activiteit/';
  }

  getactiviteits(): Observable<Activiteit[]> {
    return this.http.get<Activiteit[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getactiviteit(id: number): Observable<Activiteit> {
      return this.http.get<Activiteit>(this.myAppUrl + this.myApiUrl + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveactiviteit(activiteit): Observable<Activiteit> {
      return this.http.post<Activiteit>(this.myAppUrl + this.myApiUrl, JSON.stringify(activiteit), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateactiviteit(id: number, activiteit): Observable<Activiteit> {
      return this.http.put<Activiteit>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(activiteit), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteactiviteit(id: number): Observable<Activiteit> {
      return this.http.delete<Activiteit>(this.myAppUrl + this.myApiUrl + id)
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