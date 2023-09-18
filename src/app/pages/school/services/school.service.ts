import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {School} from "../interface/school";

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<School[]>{
    return this._http.get<School[]>(`${this.baseUrl}/school/get`)
  }

  create(data: School): Observable<any>{
    return this._http.post<School>(`${this.baseUrl}/school/create`, data)
  }

  edit(id: number,data: School): Observable<any>{
    return this._http.put<School>(`${this.baseUrl}/school/edit/${id}`, data)
  }

  delete(id: number): Observable<School>{
    return this._http.delete<School>(`${this.baseUrl}/school/delete/`+id)
  }
}
