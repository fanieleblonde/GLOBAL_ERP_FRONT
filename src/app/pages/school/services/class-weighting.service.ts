import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassWeighting} from "../interface/class-weighting";

@Injectable({
  providedIn: 'root'
})
export class ClassWeightingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ClassWeighting[]>{
    return this._http.get<ClassWeighting[]>(`${this.baseUrl}/class/weighting/get`)
  }

  create(data: ClassWeighting): Observable<any>{
    return this._http.post<ClassWeighting>(`${this.baseUrl}/class/weighting/create`, data)
  }

  edit(id: number,data: ClassWeighting): Observable<any>{
    return this._http.put<ClassWeighting>(`${this.baseUrl}/class/weighting/edit/${id}`, data)
  }

  delete(id: number): Observable<ClassWeighting>{
    return this._http.delete<ClassWeighting>(`${this.baseUrl}/class/weighting/delete/`+id)
  }
}
