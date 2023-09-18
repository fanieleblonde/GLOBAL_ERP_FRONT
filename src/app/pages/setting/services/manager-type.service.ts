import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManagerType} from "../interface/manager_type";

@Injectable({
  providedIn: 'root'
})
export class ManagerTypeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ManagerType[]>{
    return this._http.get<ManagerType[]>(`${this.baseUrl}/manager-type/get`)
  }

  create(data: ManagerType): Observable<any>{
    return this._http.post<ManagerType>(`${this.baseUrl}/manager-type/create`, data)
  }

  edit(id: number,data: ManagerType): Observable<any>{
    return this._http.put<ManagerType>(`${this.baseUrl}/manager-type/edit/${id}`, data)
  }

  delete(id: number): Observable<ManagerType>{
    return this._http.delete<ManagerType>(`${this.baseUrl}/manager-type/delete/`+id)
  }
}
