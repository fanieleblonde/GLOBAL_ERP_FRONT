import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApplicationSource} from "../interface/application-source";

@Injectable({
  providedIn: 'root'
})
export class ApplicationSourceService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ApplicationSource[]>{
    return this._http.get<ApplicationSource[]>(`${this.baseUrl}/application/source/get`)
  }

  create(data: ApplicationSource): Observable<any>{
    return this._http.post<ApplicationSource>(`${this.baseUrl}/application/source/create`, data)
  }

  edit(id: number,data: ApplicationSource): Observable<any>{
    return this._http.put<ApplicationSource>(`${this.baseUrl}/application/source/edit/${id}`, data)
  }

  delete(id: number): Observable<ApplicationSource>{
    return this._http.delete<ApplicationSource>(`${this.baseUrl}/application/source/delete/`+id)
  }
}
