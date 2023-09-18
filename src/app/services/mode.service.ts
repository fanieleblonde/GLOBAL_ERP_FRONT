import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mode} from "../interface/mode";

@Injectable({
  providedIn: 'root'
})
export class ModeService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Mode[]>{
    return this._http.get<Mode[]>(`${this.baseUrl}/mode/get`)
  }

  create(data: Mode): Observable<any>{
    return this._http.post<Mode>(`${this.baseUrl}/mode/create`, data)
  }

  edit(id: number,data: Mode): Observable<any>{
    return this._http.put<Mode>(`${this.baseUrl}/mode/edit/${id}`, data)
  }

  delete(id: number): Observable<Mode>{
    return this._http.delete<Mode>(`${this.baseUrl}/mode/delete/`+id)
  }
}
