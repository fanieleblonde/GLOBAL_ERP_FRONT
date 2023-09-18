import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Year} from "../interface/year";

@Injectable({
  providedIn: 'root'
})
export class YearService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getYearList(): Observable<Year[]>{
    return this._http.get<Year[]>(`${this.baseUrl}/year/get`)
  }

  create(data: Year): Observable<any>{
    return this._http.post<Year>(`${this.baseUrl}/year/create`, data)
  }

  edit(id: number,data: Year): Observable<any>{
    return this._http.put<Year>(`${this.baseUrl}/year/edit/${id}`, data)
  }

  delete(id: number): Observable<Year>{
    return this._http.delete<Year>(`${this.baseUrl}/year/delete/`+id)
  }
}
