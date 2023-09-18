import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SkillType} from "../interface/skill-type";
import {WorkLocation} from "../interface/work-location";

@Injectable({
  providedIn: 'root'
})
export class WorkLocationService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<WorkLocation[]>{
    return this._http.get<WorkLocation[]>(`${this.baseUrl}/work/location/get`)
  }

  create(data: WorkLocation): Observable<any>{
    return this._http.post<WorkLocation>(`${this.baseUrl}/work/location/create`, data)
  }

  edit(id: number,data: WorkLocation): Observable<any>{
    return this._http.put<WorkLocation>(`${this.baseUrl}/work/location/edit/${id}`, data)
  }

  delete(id: number): Observable<WorkLocation>{
    return this._http.delete<WorkLocation>(`${this.baseUrl}/work/location/delete/`+id)
  }
}
