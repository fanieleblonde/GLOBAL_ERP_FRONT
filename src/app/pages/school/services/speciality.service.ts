import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Speciality} from "../interface/speciality";

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Speciality[]>{
    return this._http.get<Speciality[]>(`${this.baseUrl}/speciality/get`)
  }

  create(data: Speciality): Observable<any>{
    return this._http.post<Speciality>(`${this.baseUrl}/speciality/create`, data)
  }

  edit(id: number,data: Speciality): Observable<any>{
    return this._http.put<Speciality>(`${this.baseUrl}/speciality/edit/${id}`, data)
  }

  delete(id: number): Observable<Speciality>{
    return this._http.delete<Speciality>(`${this.baseUrl}/speciality/delete/`+id)
  }
}
