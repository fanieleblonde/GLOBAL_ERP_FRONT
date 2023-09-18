import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PensionBracket} from "../interface/pensionBracket";

@Injectable({
  providedIn: 'root'
})
export class PensionBracketService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getPensionBracketList(): Observable<PensionBracket[]>{
    return this._http.get<PensionBracket[]>(`${this.baseUrl}/pensionbracket/get`)
  }

  create(data: PensionBracket): Observable<any>{
    return this._http.post<PensionBracket>(`${this.baseUrl}/pensionbracket/create`, data)
  }

  edit(id: number,data: PensionBracket): Observable<any>{
    return this._http.put<PensionBracket>(`${this.baseUrl}/pensionbracket/edit/${id}`, data)
  }

  delete(id: number): Observable<PensionBracket>{
    return this._http.delete<PensionBracket>(`${this.baseUrl}/pensionbracket/delete/`+id)
  }
}
