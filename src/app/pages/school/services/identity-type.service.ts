import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Institution} from "../interface/institution";
import {IdentityType} from "../interface/identityType";

@Injectable({
  providedIn: 'root'
})
export class IdentityTypeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<IdentityType[]>{
    return this._http.get<IdentityType[]>(`${this.baseUrl}/identity-type/get`)
  }

  create(data: IdentityType): Observable<any>{
    return this._http.post<IdentityType>(`${this.baseUrl}/identity-type/create`, data)
  }

  edit(id: number,data: IdentityType): Observable<any>{
    return this._http.put<IdentityType>(`${this.baseUrl}/identity-type/edit/${id}`, data)
  }

  delete(id: number): Observable<IdentityType>{
    return this._http.delete<IdentityType>(`${this.baseUrl}/identity-type/delete/`+id)
  }
}
