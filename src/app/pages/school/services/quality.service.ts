import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Quality} from "../interface/quality";

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getQualityList(): Observable<Quality[]>{
    return this._http.get<Quality[]>(`${this.baseUrl}/quality/get`)
  }

  create(data: Quality): Observable<any>{
    return this._http.post<Quality>(`${this.baseUrl}/quality/create`, data)
  }

  edit(id: number,data: Quality): Observable<any>{
    return this._http.put<Quality>(`${this.baseUrl}/quality/edit/${id}`, data)
  }

  delete(id: number): Observable<Quality>{
    return this._http.delete<Quality>(`${this.baseUrl}/quality/delete/`+id)
  }
}
