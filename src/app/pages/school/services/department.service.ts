import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Department} from "../interface/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Department[]>{
    return this._http.get<Department[]>(`${this.baseUrl}/department/get`)
  }

  create(data: Department): Observable<any>{
    return this._http.post<Department>(`${this.baseUrl}/department/create`, data)
  }

  edit(id: number,data: Department): Observable<any>{
    return this._http.put<Department>(`${this.baseUrl}/department/edit/${id}`, data)
  }

  delete(id: number): Observable<Department>{
    return this._http.delete<Department>(`${this.baseUrl}/department/delete/`+id)
  }
}
