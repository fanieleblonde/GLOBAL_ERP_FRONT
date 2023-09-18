import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartureReason} from "../interface/departure-reason";
import {EmploymentType} from "../interface/employment-type";

@Injectable({
  providedIn: 'root'
})
export class EmploymentTypeService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<EmploymentType[]>{
    return this._http.get<EmploymentType[]>(`${this.baseUrl}/employment/type/get`)
  }

  create(data: EmploymentType): Observable<any>{
    return this._http.post<EmploymentType>(`${this.baseUrl}/employment/type/create`, data)
  }

  edit(id: number,data: EmploymentType): Observable<any>{
    return this._http.put<EmploymentType>(`${this.baseUrl}/employment/type/edit/${id}`, data)
  }

  delete(id: number): Observable<EmploymentType>{
    return this._http.delete<EmploymentType>(`${this.baseUrl}/employment/type/delete/`+id)
  }
}
