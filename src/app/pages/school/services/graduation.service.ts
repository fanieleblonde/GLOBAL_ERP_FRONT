import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Formation} from "../interface/formation";
import {Graduation} from "../interface/graguation";

@Injectable({
  providedIn: 'root'
})
export class GraduationService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Graduation[]>{
    return this._http.get<Graduation[]>(`${this.baseUrl}/graduation/get`)
  }

  create(data: Graduation): Observable<any>{
    return this._http.post<Graduation>(`${this.baseUrl}/graduation/create`, data)
  }

  edit(id: number,data: Graduation): Observable<any>{
    return this._http.put<Graduation>(`${this.baseUrl}/graduation/edit/${id}`, data)
  }

  delete(id: number): Observable<Graduation>{
    return this._http.delete<Graduation>(`${this.baseUrl}/graduation/delete/`+id)
  }
}
