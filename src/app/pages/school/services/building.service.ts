import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mode} from "../../../interface/mode";
import {Building} from "../interface/building";

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Building[]>{
    return this._http.get<Building[]>(`${this.baseUrl}/building/get`)
  }

  create(data: Building): Observable<any>{
    return this._http.post<Building>(`${this.baseUrl}/building/create`, data)
  }

  edit(id: number,data: Building): Observable<any>{
    return this._http.put<Building>(`${this.baseUrl}/building/edit/${id}`, data)
  }

  delete(id: number): Observable<Building>{
    return this._http.delete<Building>(`${this.baseUrl}/building/delete/`+id)
  }
}
