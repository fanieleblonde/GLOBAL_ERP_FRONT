import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EvaluationPeriod} from "../interface/evaluation-period";

@Injectable({
  providedIn: 'root'
})
export class EvaluationPeriodService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<EvaluationPeriod[]>{
    return this._http.get<EvaluationPeriod[]>(`${this.baseUrl}/evaluation-period/get`)
  }

  create(data: EvaluationPeriod): Observable<any>{
    return this._http.post<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/create`, data)
  }

  edit(id: number,data: EvaluationPeriod): Observable<any>{
    return this._http.put<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/edit/${id}`, data)
  }

  delete(id: number): Observable<EvaluationPeriod>{
    return this._http.delete<EvaluationPeriod>(`${this.baseUrl}/evaluation-period/delete/`+id)
  }
}
