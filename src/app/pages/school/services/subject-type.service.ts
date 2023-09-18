import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectType} from "../interface/subject-type";

@Injectable({
  providedIn: 'root'
})
export class SubjectTypeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SubjectType[]>{
    return this._http.get<SubjectType[]>(`${this.baseUrl}/subject-type/get`)
  }

  create(data: SubjectType): Observable<any>{
    return this._http.post<SubjectType>(`${this.baseUrl}/subject-type/create`, data)
  }

  edit(id: number,data: SubjectType): Observable<any>{
    return this._http.put<SubjectType>(`${this.baseUrl}/subject-type/edit/${id}`, data)
  }

  delete(id: number): Observable<SubjectType>{
    return this._http.delete<SubjectType>(`${this.baseUrl}/subject-type/delete/`+id)
  }
}
