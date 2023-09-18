import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CostArea} from "../interface/costarea";

@Injectable({
  providedIn: 'root'
})
export class CostAreaService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getCostAreaList(): Observable<CostArea[]>{
    return this._http.get<CostArea[]>(`${this.baseUrl}/costarea/get`)
  }

  create(data: CostArea): Observable<any>{
    return this._http.post<CostArea>(`${this.baseUrl}/costarea/create`, data)
  }

  edit(id: number,data: CostArea): Observable<any>{
    return this._http.put<CostArea>(`${this.baseUrl}/costarea/edit/${id}`, data)
  }

  delete(id: number): Observable<CostArea>{
    return this._http.delete<CostArea>(`${this.baseUrl}/costarea/delete/`+id)
  }
}
