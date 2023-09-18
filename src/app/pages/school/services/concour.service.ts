import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Concour} from "../interface/concour";

@Injectable({
  providedIn: 'root'
})
export class ConcourService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getConcourList(): Observable<Concour[]>{
    return this._http.get<Concour[]>(`${this.baseUrl}/concour/get`)
  }

  create(data: Concour): Observable<any>{
    return this._http.post<Concour>(`${this.baseUrl}/concour/create`, data)
  }

  edit(id: number,data: Concour): Observable<any>{
    return this._http.put<Concour>(`${this.baseUrl}/concour/edit/${id}`, data)
  }

  delete(id: number): Observable<Concour>{
    return this._http.delete<Concour>(`${this.baseUrl}/concour/delete/`+id)
  }
}
