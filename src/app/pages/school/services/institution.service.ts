import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../interface/institution";

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Institution[]>{
    return this._http.get<Institution[]>(`${this.baseUrl}/institution/get`)
  }

  create(data: Institution): Observable<any>{
    return this._http.post<Institution>(`${this.baseUrl}/institution/create`, data)
  }

  edit(id: number,data: Institution): Observable<any>{
    return this._http.put<Institution>(`${this.baseUrl}/institution/edit/${id}`, data)
  }

  delete(id: number): Observable<Institution>{
    return this._http.delete<Institution>(`${this.baseUrl}/institution/delete/`+id)
  }
}
