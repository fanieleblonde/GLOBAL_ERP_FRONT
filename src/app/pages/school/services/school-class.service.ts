import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SchoolClass} from "../interface/school-class";

@Injectable({
  providedIn: 'root'
})
export class SchoolClassService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SchoolClass[]>{
    return this._http.get<SchoolClass[]>(`${this.baseUrl}/class/get`)
  }

  create(data: SchoolClass): Observable<any>{
    return this._http.post<SchoolClass>(`${this.baseUrl}/class/create`, data)
  }

  edit(id: number,data: SchoolClass): Observable<any>{
    return this._http.put<SchoolClass>(`${this.baseUrl}/class/edit/${id}`, data)
  }

  delete(id: number): Observable<SchoolClass>{
    return this._http.delete<SchoolClass>(`${this.baseUrl}/class/delete/`+id)
  }
}
