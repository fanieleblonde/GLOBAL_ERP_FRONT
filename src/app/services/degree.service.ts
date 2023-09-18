import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Degree} from "../interface/degree";

@Injectable({
  providedIn: 'root'
})
export class DegreeService {


  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Degree[]>{
    return this._http.get<Degree[]>(`${this.baseUrl}/degree/get`)
  }

  create(data: Degree): Observable<any>{
    return this._http.post<Degree>(`${this.baseUrl}/degree/create`, data)
  }

  edit(id: number,data: Degree): Observable<any>{
    return this._http.put<Degree>(`${this.baseUrl}/degree/edit/${id}`, data)
  }

  delete(id: number): Observable<Degree>{
    return this._http.delete<Degree>(`${this.baseUrl}/degree/delete/`+id)
  }
}
