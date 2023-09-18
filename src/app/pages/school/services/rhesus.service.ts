import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rhesus} from "../interface/rhesus";

@Injectable({
  providedIn: 'root'
})
export class RhesusService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getRhesusList(): Observable<Rhesus[]>{
    return this._http.get<Rhesus[]>(`${this.baseUrl}/rhesus/get`)
  }

  create(data: Rhesus): Observable<any>{
    return this._http.post<Rhesus>(`${this.baseUrl}/rhesus/create`, data)
  }

  edit(id: number,data: Rhesus): Observable<any>{
    return this._http.put<Rhesus>(`${this.baseUrl}/rhesus/edit/${id}`, data)
  }

  delete(id: number): Observable<Rhesus>{
    return this._http.delete<Rhesus>(`${this.baseUrl}/rhesus/delete/`+id)
  }
}
