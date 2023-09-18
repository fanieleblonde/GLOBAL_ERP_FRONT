import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../interface/program";
import {PeriodType} from "../interface/period-type";

@Injectable({
  providedIn: 'root'
})
export class PeriodTypeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<PeriodType[]>{
    return this._http.get<PeriodType[]>(`${this.baseUrl}/period-type/get`)
  }

  create(data: PeriodType): Observable<any>{
    return this._http.post<PeriodType>(`${this.baseUrl}/period-type/create`, data)
  }

  edit(id: number,data: PeriodType): Observable<any>{
    return this._http.put<PeriodType>(`${this.baseUrl}/period-type/edit/${id}`, data)
  }

  delete(id: number): Observable<PeriodType>{
    return this._http.delete<PeriodType>(`${this.baseUrl}/period-type/delete/`+id)
  }
}
