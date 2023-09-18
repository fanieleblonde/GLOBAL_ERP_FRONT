import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Module} from "../interface/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Module[]>{
    return this._http.get<Module[]>(`${this.baseUrl}/course/module/get`)
  }

  create(data: Module): Observable<any>{
    return this._http.post<Module>(`${this.baseUrl}/course/module/create`, data)
  }

  edit(id: number,data: Module): Observable<any>{
    return this._http.put<Module>(`${this.baseUrl}/course/module/edit/${id}`, data)
  }

  delete(id: number): Observable<Module>{
    return this._http.delete<Module>(`${this.baseUrl}/course/module/delete/`+id)
  }
}
