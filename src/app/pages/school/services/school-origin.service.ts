import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolOrigin} from "../interface/schoolOrigin";

@Injectable({
  providedIn: 'root'
})
export class SchoolOriginService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getSchoolOriginList(): Observable<SchoolOrigin[]>{
    return this._http.get<SchoolOrigin[]>(`${this.baseUrl}/schoolorigin/get`)
  }

  create(data: SchoolOrigin): Observable<any>{
    return this._http.post<SchoolOrigin>(`${this.baseUrl}/schoolorigin/create`, data)
  }

  edit(id: number,data: SchoolOrigin): Observable<any>{
    return this._http.put<SchoolOrigin>(`${this.baseUrl}/schoolorigin/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolOrigin>{
    return this._http.delete<SchoolOrigin>(`${this.baseUrl}/schoolorigin/delete/`+id)
  }
}
