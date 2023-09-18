import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Guardianship} from "../interface/guardianship";

@Injectable({
  providedIn: 'root'
})
export class GuardianshipService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Guardianship[]>{
    return this._http.get<Guardianship[]>(`${this.baseUrl}/guardianship/get`)
  }

  create(data: Guardianship): Observable<any>{
    return this._http.post<Guardianship>(`${this.baseUrl}/guardianship/create`, data)
  }

  edit(id: number,data: Guardianship): Observable<any>{
    return this._http.put<Guardianship>(`${this.baseUrl}/guardianship/edit/${id}`, data)
  }

  delete(id: number): Observable<Guardianship>{
    return this._http.delete<Guardianship>(`${this.baseUrl}/guardianship/delete/`+id)
  }
}
