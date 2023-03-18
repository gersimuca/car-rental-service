import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './car';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientRequestService {

  constructor(private http: HttpClient) { }

  public makeRequest(car: Car, client: Client) {
    client.carModule = car.carType;
    return this.http.post("http://localhost:8080/request", client, { responseType: 'text' as 'json' });
  }
}
