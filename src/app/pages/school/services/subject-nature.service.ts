import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubjectNature} from "../interface/subject-nature";

@Injectable({
  providedIn: 'root'
})
export class SubjectNatureService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SubjectNature[]>{
    return this._http.get<SubjectNature[]>(`${this.baseUrl}/subject-nature/get`)
  }

  create(data: SubjectNature): Observable<any>{
    return this._http.post<SubjectNature>(`${this.baseUrl}/subject-nature/create`, data)
  }

  edit(id: number,data: SubjectNature): Observable<any>{
    return this._http.put<SubjectNature>(`${this.baseUrl}/subject-nature/edit/${id}`, data)
  }

  delete(id: number): Observable<SubjectNature>{
    return this._http.delete<SubjectNature>(`${this.baseUrl}/subject-nature/delete/`+id)
  }
}
