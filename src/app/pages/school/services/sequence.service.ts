import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../interface/formation";
import {Sequence} from "../interface/sequence";

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Sequence[]>{
    return this._http.get<Sequence[]>(`${this.baseUrl}/sequence/get`)
  }

  create(data: Sequence): Observable<any>{
    return this._http.post<Sequence>(`${this.baseUrl}/sequence/create`, data)
  }

  edit(id: number,data: Sequence): Observable<any>{
    return this._http.put<Sequence>(`${this.baseUrl}/sequence/edit/${id}`, data)
  }

  delete(id: number): Observable<Sequence>{
    return this._http.delete<Sequence>(`${this.baseUrl}/sequence/delete/`+id)
  }
}
