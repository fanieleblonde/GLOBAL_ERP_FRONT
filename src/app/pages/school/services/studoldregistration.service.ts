import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Studoldregistration } from '../interface/studoldregistration';

@Injectable({
  providedIn: 'root'
})
export class StudoldregistrationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

   getStudoldregistrationList(): Observable<Studoldregistration[]>{
    return this._http.get<Studoldregistration[]>(`${this.baseUrl}/studregistration/get`)
  }

  getStudregistrationList(): Observable<Studoldregistration[]>{
    return this._http.get<Studoldregistration[]>(`${this.baseUrl}/oldstudregistration/get/{id}`)
  }

  getStudentList(): Observable<Studoldregistration[]>{
    return this._http.get<Studoldregistration[]>(`${this.baseUrl}/get/registrations`)
  }

  create(data: Studoldregistration): Observable<any>{
    return this._http.post<Studoldregistration>(`${this.baseUrl}/oldstudregistration/create`, data)
  }

  // Studentcreate(data: Studoldregistration): Observable<any>{
  //   return this._http.post<Studoldregistration>(`${this.baseUrl}/studregistration/create`, data)
  // }

  edit(id: number,data: Studoldregistration): Observable<any>{
    return this._http.put<Studoldregistration>(`${this.baseUrl}/oldstudregistration/edit/${id}`, data)
  }

  delete(id: number): Observable<Studoldregistration>{
    return this._http.delete<Studoldregistration>(`http://localhost:8000/studregistration/delete/`+id)
  }
}
