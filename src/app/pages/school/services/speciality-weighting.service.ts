import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SpecialityWeighting} from "../interface/speciality-weighting";

@Injectable({
  providedIn: 'root'
})
export class SpecialityWeightingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SpecialityWeighting[]>{
    return this._http.get<SpecialityWeighting[]>(`${this.baseUrl}/speciality/weighting/get`)
  }

  create(data: SpecialityWeighting): Observable<any>{
    return this._http.post<SpecialityWeighting>(`${this.baseUrl}/speciality/weighting/create`, data)
  }

  edit(id: number,data: SpecialityWeighting): Observable<any>{
    return this._http.put<SpecialityWeighting>(`${this.baseUrl}/speciality/weighting/edit/${id}`, data)
  }

  delete(id: number): Observable<SpecialityWeighting>{
    return this._http.delete<SpecialityWeighting>(`${this.baseUrl}/speciality/weighting/delete/`+id)
  }
}
