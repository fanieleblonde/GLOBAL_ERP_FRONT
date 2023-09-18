import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Campus} from "../interface/campus";
@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getCampusList(): Observable<Campus[]>{
    return this._http.get<Campus[]>(`${this.baseUrl}/campus/get`)
  }

  create(data: Campus): Observable<any>{
    return this._http.post<Campus>(`${this.baseUrl}/campus/create`, data)
  }

  edit(id: number,data: Campus): Observable<any>{
    return this._http.put<Campus>(`${this.baseUrl}/campus/edit/${id}`, data)
  }

  delete(id: number): Observable<Campus>{
    return this._http.delete<Campus>(`${this.baseUrl}/campus/delete/`+id)
  }
}
