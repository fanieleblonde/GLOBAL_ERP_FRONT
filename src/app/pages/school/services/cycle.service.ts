import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cycle} from "../interface/cycle";

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {  }

  getCycleList(): Observable<Cycle[]>{
    return this._http.get<Cycle[]>(`${this.baseUrl}/cycle/get`)
  }

  create(data: Cycle): Observable<any>{
    return this._http.post<Cycle>(`${this.baseUrl}/cycle/create`, data)
  }

  edit(id: number,data: Cycle): Observable<any>{
    return this._http.put<Cycle>(`${this.baseUrl}/cycle/edit/${id}`, data)
  }

  delete(id: number): Observable<Cycle>{
    return this._http.delete<Cycle>(`${this.baseUrl}/cycle/delete/`+id)
  }
}
