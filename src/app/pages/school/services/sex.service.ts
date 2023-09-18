import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IdentityType} from "../interface/identityType";
import {Sex} from "../interface/sex";

@Injectable({
  providedIn: 'root'
})
export class SexService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Sex[]>{
    return this._http.get<Sex[]>(`${this.baseUrl}/sex/get`)
  }

  create(data: Sex): Observable<any>{
    return this._http.post<Sex>(`${this.baseUrl}/sex/create`, data)
  }

  edit(id: number,data: Sex): Observable<any>{
    return this._http.put<Sex>(`${this.baseUrl}/sex/edit/${id}`, data)
  }

  delete(id: number): Observable<Sex>{
    return this._http.delete<Sex>(`${this.baseUrl}/sex/delete/`+id)
  }
}
