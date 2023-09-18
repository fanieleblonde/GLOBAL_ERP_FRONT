import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Diploma} from "../interface/diploma";

@Injectable({
  providedIn: 'root'
})
export class DiplomaService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getDiplomaList(): Observable<Diploma[]>{
    return this._http.get<Diploma[]>(`${this.baseUrl}/diploma/get`)
  }

  create(data: Diploma): Observable<any>{
    return this._http.post<Diploma>(`${this.baseUrl}/diploma/create`, data)
  }

  edit(id: number,data: Diploma): Observable<any>{
    return this._http.put<Diploma>(`${this.baseUrl}/diploma/edit/${id}`, data)
  }

  delete(id: number): Observable<Diploma>{
    return this._http.delete<Diploma>(`${this.baseUrl}/diploma/delete/`+id)
  }
}
