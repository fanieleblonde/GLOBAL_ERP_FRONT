import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DiplomaMension} from "../interface/diplomamension";

@Injectable({
  providedIn: 'root'
})
export class DiplomamensionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getDiplomaMensionList(): Observable<DiplomaMension[]>{
    return this._http.get<DiplomaMension[]>(`${this.baseUrl}/diplomamension/get`)
  }

  create(data: DiplomaMension): Observable<any>{
    return this._http.post<DiplomaMension>(`${this.baseUrl}/diplomamension/create`, data)
  }

  edit(id: number,data: DiplomaMension): Observable<any>{
    return this._http.put<DiplomaMension>(`${this.baseUrl}/diplomamension/edit/${id}`, data)
  }

  delete(id: number): Observable<DiplomaMension>{
    return this._http.delete<DiplomaMension>(`${this.baseUrl}/diplomamension/delete/`+id)
  }
}
