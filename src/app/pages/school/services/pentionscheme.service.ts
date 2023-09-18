import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pentionscheme} from "../interface/pentionscheme";

@Injectable({
  providedIn: 'root'
})
export class PentionschemeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getPentionSchemeList(): Observable<Pentionscheme[]>{
    return this._http.get<Pentionscheme[]>(`${this.baseUrl}/pensionscheme/get`)
  }

  create(data: Pentionscheme): Observable<any>{
    return this._http.post<Pentionscheme>(`${this.baseUrl}/pensionscheme/create`, data)
  }

  edit(id: number,data: Pentionscheme): Observable<any>{
    return this._http.put<Pentionscheme>(`${this.baseUrl}/pensionscheme/edit/${id}`, data)
  }

  delete(id: number): Observable<Pentionscheme>{
    return this._http.delete<Pentionscheme>(`${this.baseUrl}/pensionscheme/delete/`+id)
  }
}
