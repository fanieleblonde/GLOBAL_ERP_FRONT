import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family} from "../interface/family";
import {FormulaTh} from "../interface/formula-th";

@Injectable({
  providedIn: 'root'
})
export class FormulaThService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<FormulaTh[]>{
    return this._http.get<FormulaTh[]>(`${this.baseUrl}/formula-th/get`)
  }

  create(data: FormulaTh): Observable<any>{
    return this._http.post<FormulaTh>(`${this.baseUrl}/formula-th/create`, data)
  }

  edit(id: number,data: FormulaTh): Observable<any>{
    return this._http.put<FormulaTh>(`${this.baseUrl}/formula-th/edit/${id}`, data)
  }

  delete(id: number): Observable<FormulaTh>{
    return this._http.delete<FormulaTh>(`${this.baseUrl}/formula-th/delete/`+id)
  }
}
