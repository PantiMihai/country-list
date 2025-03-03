import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,region';

  constructor(private http: HttpClient) {}

  private extractData(res: any) {
    return res || {};
  }

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      map(res => this.extractData(res)), 
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errMsg: string;
    if (error.error instanceof ErrorEvent) {
      errMsg = `Error: ${error.error.message}`;
    } else {
      errMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errMsg);
    return throwError(() => new Error(errMsg));
  }
}
