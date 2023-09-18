import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolPeriod} from "../interface/school-period";

@Injectable({
  providedIn: 'root'
})
export class SchoolPeriodService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SchoolPeriod[]>{
    return this._http.get<SchoolPeriod[]>(`${this.baseUrl}/school-period/get`)
  }

  create(data: SchoolPeriod): Observable<any>{
    return this._http.post<SchoolPeriod>(`${this.baseUrl}/school-period/create`, data)
  }

  edit(id: number,data: SchoolPeriod): Observable<any>{
    return this._http.put<SchoolPeriod>(`${this.baseUrl}/school-period/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolPeriod>{
    return this._http.delete<SchoolPeriod>(`${this.baseUrl}/school-period/delete/`+id)
  }
}
