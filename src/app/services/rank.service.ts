import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Rank} from "../interface/rank";

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) { }

  getList(): Observable<Rank[]>{
    return this._http.get<Rank[]>(`${this.baseUrl}/rank/get`)
  }

  create(data: Rank): Observable<any>{
    return this._http.post<Rank>(`${this.baseUrl}/rank/create`, data)
  }

  edit(id: number,data: Rank): Observable<any>{
    return this._http.put<Rank>(`${this.baseUrl}/rank/edit/${id}`, data)
  }

  delete(id: number): Observable<Rank>{
    return this._http.delete<Rank>(`${this.baseUrl}/rank/delete/`+id)
  }
}
