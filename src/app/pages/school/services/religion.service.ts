import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Religion} from "../interface/religion";

@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getReligionList(): Observable<Religion[]>{
    return this._http.get<Religion[]>(`${this.baseUrl}/religion/get`)
  }

  create(data: Religion): Observable<any>{
    return this._http.post<Religion>(`${this.baseUrl}/religion/create`, data)
  }

  edit(id: number,data: Religion): Observable<any>{
    return this._http.put<Religion>(`${this.baseUrl}/religion/edit/${id}`, data)
  }

  delete(id: number): Observable<Religion>{
    return this._http.delete<Religion>(`${this.baseUrl}/religion/delete/`+id)
  }
}
