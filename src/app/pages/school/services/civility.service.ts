import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Civility} from "../interface/civility";

@Injectable({
  providedIn: 'root'
})
export class CivilityService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Civility[]>{
    return this._http.get<Civility[]>(`${this.baseUrl}/civility/get`)
  }

  create(data: Civility): Observable<any>{
    return this._http.post<Civility>(`${this.baseUrl}/civility/create`, data)
  }

  edit(id: number,data: Civility): Observable<any>{
    return this._http.put<Civility>(`${this.baseUrl}/civility/edit/${id}`, data)
  }

  delete(id: number): Observable<Civility>{
    return this._http.delete<Civility>(`${this.baseUrl}/civility/delete/`+id)
  }
}
