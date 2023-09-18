import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../interface/status";
import {CycleWeighting} from "../interface/cycle-weighting";

@Injectable({
  providedIn: 'root'
})
export class CycleWeightingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<CycleWeighting[]>{
    return this._http.get<CycleWeighting[]>(`${this.baseUrl}/cycle/weighting/get`)
  }

  create(data: CycleWeighting): Observable<any>{
    return this._http.post<CycleWeighting>(`${this.baseUrl}/cycle/weighting/create`, data)
  }

  edit(id: number,data: CycleWeighting): Observable<any>{
    return this._http.put<CycleWeighting>(`${this.baseUrl}/cycle/weighting/edit/${id}`, data)
  }

  delete(id: number): Observable<CycleWeighting>{
    return this._http.delete<CycleWeighting>(`${this.baseUrl}/cycle/weighting/delete/`+id)
  }
}
