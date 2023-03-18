import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestService {

  private url = "/api/request";
  constructor(private http: HttpClient) { }

  makeRequest(client: Client) : Observable<Client>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    return this.http.post<Client>(this.url, client, httpOptions);

  }
}
