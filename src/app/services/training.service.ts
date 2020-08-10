import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Training } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class trainingService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + localStorage.getItem("currentUser")
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = 'http://localhost:5000'; //port waarop api draait
      this.myApiUrl = '/api/training/' ;
  }
  
  gettrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.myAppUrl + this.myApiUrl, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  gettraining(id: number): Observable<Training> {
      return this.http.get<Training>(this.myAppUrl + this.myApiUrl + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  savetraining(training): Observable<Training> {
      return this.http.post<Training>(this.myAppUrl + this.myApiUrl, JSON.stringify(training), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updatetraining(id: number, training): Observable<Training> {
      return this.http.put<Training>(this.myAppUrl + this.myApiUrl + id, JSON.stringify(training), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deletetraining(id: number): Observable<Training> {
      return this.http.delete<Training>(this.myAppUrl + this.myApiUrl + id)
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
