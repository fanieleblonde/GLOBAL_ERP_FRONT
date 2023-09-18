import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tuition} from "../interface/tuition";

@Injectable({
  providedIn: 'root'
})
export class TuitionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getTuitionList(): Observable<Tuition[]>{
    return this._http.get<Tuition[]>(`${this.baseUrl}/tuition/get`)
  }

  create(data: Tuition): Observable<any>{
    return this._http.post<Tuition>(`${this.baseUrl}/tuition/create`, data)
  }

  edit(id: number,data: Tuition): Observable<any>{
    return this._http.put<Tuition>(`${this.baseUrl}/tuition/edit/${id}`, data)
  }

  delete(id: number): Observable<Tuition>{
    return this._http.delete<Tuition>(`${this.baseUrl}/tuition/delete/`+id)
  }
}
