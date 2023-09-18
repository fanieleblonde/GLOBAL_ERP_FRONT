import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ministry} from "../interface/ministry";

@Injectable({
  providedIn: 'root'
})
export class MinistryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }


  getMinistryList(): Observable<Ministry[]>{
    return this._http.get<Ministry[]>(`${this.baseUrl}/ministry/get`)
  }

  create(data: Ministry): Observable<any>{
    return this._http.post<Ministry>(`${this.baseUrl}/ministry/create`, data)
  }

  edit(id: number,data: Ministry): Observable<any>{
    return this._http.put<Ministry>(`${this.baseUrl}/ministry/edit/${id}`, data)
  }

  delete(id: number): Observable<Ministry>{
    return this._http.delete<Ministry>(`${this.baseUrl}/ministry/delete/`+id)
  }
}
