import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ModuleCategory} from "../interface/module-category";

@Injectable({
  providedIn: 'root'
})
export class ModuleCategoryService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ModuleCategory[]>{
    return this._http.get<ModuleCategory[]>(`${this.baseUrl}/module-category/get`)
  }

  create(data: ModuleCategory): Observable<any>{
    return this._http.post<ModuleCategory>(`${this.baseUrl}/module-category/create`, data)
  }

  edit(id: number,data: ModuleCategory): Observable<any>{
    return this._http.put<ModuleCategory>(`${this.baseUrl}/module-category/edit/${id}`, data)
  }

  delete(id: number): Observable<ModuleCategory>{
    return this._http.delete<ModuleCategory>(`${this.baseUrl}/module-category/delete/`+id)
  }
}
