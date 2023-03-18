import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from './client';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestService {

  constructor(private http: HttpClient) { }

  makeRequest(client: Client) {

    return this.http.post("http://localhost:8080/request", client, { responseType: 'text' as 'json' });
    console.log(client.carModule)
    console.log("It was successfully")
  }
}
