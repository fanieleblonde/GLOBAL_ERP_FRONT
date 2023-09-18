import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Target} from "../interface/target";

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getTargetList(): Observable<Target[]>{
    return this._http.get<Target[]>(`${this.baseUrl}/target/get`)
  }

  create(data: Target): Observable<any>{
    return this._http.post<Target>(`${this.baseUrl}/target/create`, data)
  }

  edit(id: number,data: Target): Observable<any>{
    return this._http.put<Target>(`${this.baseUrl}/target/edit/${id}`, data)
  }

  delete(id: number): Observable<Target>{
    return this._http.delete<Target>(`${this.baseUrl}/target/delete/`+id)
  }

}
