import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../interface/status";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Status[]>{
    return this._http.get<Status[]>(`${this.baseUrl}/status/get`)
  }

  create(data: Status): Observable<any>{
    return this._http.post<Status>(`${this.baseUrl}/status/create`, data)
  }

  edit(id: number,data: Status): Observable<any>{
    return this._http.put<Status>(`${this.baseUrl}/status/edit/${id}`, data)
  }

  delete(id: number): Observable<Status>{
    return this._http.delete<Status>(`${this.baseUrl}/status/delete/`+id)
  }
}
