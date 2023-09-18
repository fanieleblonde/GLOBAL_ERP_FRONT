import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Speciality} from "../interface/speciality";
import {Subject} from "../interface/subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Subject[]>{
    return this._http.get<Subject[]>(`${this.baseUrl}/subject/get`)
  }

  create(data: Subject): Observable<any>{
    return this._http.post<Subject>(`${this.baseUrl}/subject/create`, data)
  }

  edit(id: number,data: Subject): Observable<any>{
    return this._http.put<Subject>(`${this.baseUrl}/subject/edit/${id}`, data)
  }

  delete(id: number): Observable<Subject>{
    return this._http.delete<Subject>(`${this.baseUrl}/subject/delete/`+id)
  }
}
