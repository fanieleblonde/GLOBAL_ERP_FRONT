import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolSession} from "../interface/school-session";

@Injectable({
  providedIn: 'root'
})
export class SchoolSessionService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SchoolSession[]>{
    return this._http.get<SchoolSession[]>(`${this.baseUrl}/school-session/get`)
  }

  create(data: SchoolSession): Observable<any>{
    return this._http.post<SchoolSession>(`${this.baseUrl}/school-session/create`, data)
  }

  edit(id: number,data: SchoolSession): Observable<any>{
    return this._http.put<SchoolSession>(`${this.baseUrl}/school-session/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolSession>{
    return this._http.delete<SchoolSession>(`${this.baseUrl}/school-session/delete/`+id)
  }
}
