import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Module} from "../interface/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) { }

  addModule(data: Module): Observable<any>{
    return this._http.post<Module>(`${this.baseUrl}/create/module`, data)
  }

  updateModule(id: number,data: Module): Observable<any>{
    return this._http.put<Module>(`${this.baseUrl}/edit/module/${id}`, data)
  }

  getModuleList(): Observable<Module[]>{
    return this._http.get<Module[]>(`${this.baseUrl}/modules`)
  }

  deleteModule(id: number): Observable<Module>{
    return this._http.delete<Module>(`${this.baseUrl}/delete/module/`+id)
  }

  deleteMultipleModule(ids: number[]): Observable<Module[]>{
    const options = {body: ids}
    return this._http.delete<Module[]>(`${this.baseUrl}/delete/modules`, options);
  }
}
