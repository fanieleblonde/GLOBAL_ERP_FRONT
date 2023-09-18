import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../interface/program";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Program[]>{
    return this._http.get<Program[]>(`${this.baseUrl}/program/get`)
  }

  create(data: Program): Observable<any>{
    return this._http.post<Program>(`${this.baseUrl}/program/create`, data)
  }

  edit(id: number,data: Program): Observable<any>{
    return this._http.put<Program>(`${this.baseUrl}/program/edit/${id}`, data)
  }

  delete(id: number): Observable<Program>{
    return this._http.delete<Program>(`${this.baseUrl}/program/delete/`+id)
  }
}
