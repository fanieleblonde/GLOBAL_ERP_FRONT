import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Regime} from "../interface/regime";

@Injectable({
  providedIn: 'root'
})
export class RegimeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getRegimeList(): Observable<Regime[]>{
    return this._http.get<Regime[]>(`${this.baseUrl}/regime/get`)
  }

  create(data: Regime): Observable<any>{
    return this._http.post<Regime>(`${this.baseUrl}/regime/create`, data)
  }

  edit(id: number,data: Regime): Observable<any>{
    return this._http.put<Regime>(`${this.baseUrl}/regime/edit/${id}`, data)
  }

  delete(id: number): Observable<Regime>{
    return this._http.delete<Regime>(`${this.baseUrl}/regime/delete/`+id)
  }
}
