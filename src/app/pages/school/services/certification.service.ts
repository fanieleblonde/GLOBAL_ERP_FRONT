import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Civility} from "../interface/civility";
import {Certification} from "../interface/certification";

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Certification[]>{
    return this._http.get<Certification[]>(`${this.baseUrl}/certification/get`)
  }

  create(data: Certification): Observable<any>{
    return this._http.post<Certification>(`${this.baseUrl}/certification/create`, data)
  }

  edit(id: number,data: Certification): Observable<any>{
    return this._http.put<Certification>(`${this.baseUrl}/certification/edit/${id}`, data)
  }

  delete(id: number): Observable<Certification>{
    return this._http.delete<Certification>(`${this.baseUrl}/certification/delete/`+id)
  }
}
