import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Role} from "../interface/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) { }

  addRole(data: Role): Observable<any>{
    return this._http.post<Role>(`${this.baseUrl}/create/role`, data)
  }

  updateRole(id: number,data: Role): Observable<any>{
    return this._http.put<Role>(`${this.baseUrl}/edit/role/${id}`, data)
  }

  getRoleList(): Observable<Role[]>{
    return this._http.get<Role[]>(`${this.baseUrl}/roles`)
  }

  getCustomRoleList(): Observable<Role[]>{
    return this._http.get<Role[]>(`${this.baseUrl}/get/custom/roles`)
  }

  deleteRole(id: number): Observable<Role>{
    return this._http.delete<Role>(`${this.baseUrl}/delete/role/`+id)
  }

  deleteMultipleRole(ids: number[]): Observable<Role[]>{
    const options = {body: ids}
    return this._http.delete<Role[]>(`${this.baseUrl}/delete/roles`, options);
  }
}
