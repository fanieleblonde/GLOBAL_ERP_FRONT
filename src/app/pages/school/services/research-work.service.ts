import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResearchWork} from "../interface/researchwork";

@Injectable({
  providedIn: 'root'
})
export class ResearchWorkService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ResearchWork[]>{
    return this._http.get<ResearchWork[]>(`${this.baseUrl}/research/work/get`)
  }

  create(data: ResearchWork): Observable<any>{
    return this._http.post<ResearchWork>(`${this.baseUrl}/research/work/create`, data)
  }

  edit(id: number,data: ResearchWork): Observable<any>{
    return this._http.put<ResearchWork>(`${this.baseUrl}/research/work/edit/${id}`, data)
  }

  delete(id: number): Observable<ResearchWork>{
    return this._http.delete<ResearchWork>(`${this.baseUrl}/research/work/delete/`+id)
  }
}
