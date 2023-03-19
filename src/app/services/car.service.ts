import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private url = "/api/car-list";
  constructor(private http: HttpClient) { }

  getCars() : Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<Client>(this.url, httpOptions);
  }
}
