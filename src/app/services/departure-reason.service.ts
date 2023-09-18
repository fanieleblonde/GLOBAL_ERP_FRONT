import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartureReason} from "../interface/departure-reason";

@Injectable({
  providedIn: 'root'
})
export class DepartureReasonService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<DepartureReason[]>{
    return this._http.get<DepartureReason[]>(`${this.baseUrl}/departure/reason/get`)
  }

  create(data: DepartureReason): Observable<any>{
    return this._http.post<DepartureReason>(`${this.baseUrl}/departure/reason/create`, data)
  }

  edit(id: number,data: DepartureReason): Observable<any>{
    return this._http.put<DepartureReason>(`${this.baseUrl}/departure/reason/edit/${id}`, data)
  }

  delete(id: number): Observable<DepartureReason>{
    return this._http.delete<DepartureReason>(`${this.baseUrl}/departure/reason/delete/`+id)
  }
}
