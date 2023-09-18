import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Civility} from "../interface/civility";
import {Country} from "../interface/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Country[]>{
    return this._http.get<Country[]>(`${this.baseUrl}/country/get`)
  }

  create(data: Country): Observable<any>{
    return this._http.post<Country>(`${this.baseUrl}/country/create`, data)
  }

  edit(id: number,data: Country): Observable<any>{
    return this._http.put<Country>(`${this.baseUrl}/country/edit/${id}`, data)
  }

  delete(id: number): Observable<Country>{
    return this._http.delete<Country>(`${this.baseUrl}/country/delete/`+id)
  }
}
