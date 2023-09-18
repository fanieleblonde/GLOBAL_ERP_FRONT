import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MaritalStatus} from "../interface/maritalStatus";

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<MaritalStatus[]>{
    return this._http.get<MaritalStatus[]>(`${this.baseUrl}/marital-status/get`)
  }

  create(data: MaritalStatus): Observable<any>{
    return this._http.post<MaritalStatus>(`${this.baseUrl}/marital-status/create`, data)
  }

  edit(id: number,data: MaritalStatus): Observable<any>{
    return this._http.put<MaritalStatus>(`${this.baseUrl}/marital-status/edit/${id}`, data)
  }

  delete(id: number): Observable<MaritalStatus>{
    return this._http.delete<MaritalStatus>(`${this.baseUrl}/marital-status/delete/`+id)
  }
}
