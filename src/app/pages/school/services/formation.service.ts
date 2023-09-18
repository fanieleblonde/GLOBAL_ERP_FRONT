import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Speciality} from "../interface/speciality";
import {Formation} from "../interface/formation";

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Formation[]>{
    return this._http.get<Formation[]>(`${this.baseUrl}/formation/get`)
  }

  create(data: Formation): Observable<any>{
    return this._http.post<Formation>(`${this.baseUrl}/formation/create`, data)
  }

  edit(id: number,data: Formation): Observable<any>{
    return this._http.put<Formation>(`${this.baseUrl}/formation/edit/${id}`, data)
  }

  delete(id: number): Observable<Formation>{
    return this._http.delete<Formation>(`${this.baseUrl}/formation/delete/`+id)
  }
}
