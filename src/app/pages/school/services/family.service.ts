import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family} from "../interface/family";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getFamilyList(): Observable<Family[]>{
    return this._http.get<Family[]>(`${this.baseUrl}/family/get`)
  }

  create(data: Family): Observable<any>{
    return this._http.post<Family>(`${this.baseUrl}/family/create`, data)
  }

  edit(id: number,data: Family): Observable<any>{
    return this._http.put<Family>(`${this.baseUrl}/family/edit/${id}`, data)
  }

  delete(id: number): Observable<Family>{
    return this._http.delete<Family>(`${this.baseUrl}/family/delete/`+id)
  }
}
