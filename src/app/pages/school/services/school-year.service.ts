import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolYear} from "../interface/school-year";
import {User} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SchoolYear[]>{
    return this._http.get<SchoolYear[]>(`${this.baseUrl}/year/get`)
  }
  setCurrentYear(yearId: number): Observable<any>{
    return this._http.get<any>(`http://localhost:8000/application/setCurrentYear/${yearId}`)
  }

  create(data: SchoolYear): Observable<any>{
    return this._http.post<SchoolYear>(`${this.baseUrl}/year/create`, data)
  }

  edit(id: number,data: SchoolYear): Observable<any>{
    return this._http.put<SchoolYear>(`${this.baseUrl}/year/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolYear>{
    return this._http.delete<SchoolYear>(`${this.baseUrl}/year/delete/`+id)
  }
}
