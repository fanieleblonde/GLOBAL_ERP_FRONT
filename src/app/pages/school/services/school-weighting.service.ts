import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolWeighting} from "../interface/school-weighting";

@Injectable({
  providedIn: 'root'
})
export class SchoolWeightingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SchoolWeighting[]>{
    return this._http.get<SchoolWeighting[]>(`${this.baseUrl}/school/weighting/get`)
  }

  create(data: SchoolWeighting): Observable<any>{
    return this._http.post<SchoolWeighting>(`${this.baseUrl}/school/weighting/create`, data)
  }

  edit(id: number,data: SchoolWeighting): Observable<any>{
    return this._http.put<SchoolWeighting>(`${this.baseUrl}/school/weighting/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolWeighting>{
    return this._http.delete<SchoolWeighting>(`${this.baseUrl}/school/weighting/delete/`+id)
  }
}
