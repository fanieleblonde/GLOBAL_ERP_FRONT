import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Degree} from "../interface/degree";
import {Employee} from "../interface/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Employee[]>{
    return this._http.get<Employee[]>(`${this.baseUrl}/employee/get`)
  }

  create(data: Employee): Observable<any>{
    return this._http.post<Employee>(`${this.baseUrl}/employee/create`, data)
  }

  edit(id: number,data: Employee): Observable<any>{
    return this._http.put<Employee>(`${this.baseUrl}/employee/edit/${id}`, data)
  }

  delete(id: number): Observable<Employee>{
    return this._http.delete<Employee>(`${this.baseUrl}/employee/delete/`+id)
  }
}
