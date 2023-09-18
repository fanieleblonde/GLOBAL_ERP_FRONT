import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Studregistration} from "../interface/studregistration";

@Injectable({
  providedIn: 'root'
})
export class StudregistrationService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

getStudregistrationList(): Observable<Studregistration[]>{
    return this._http.get<Studregistration[]>(`${this.baseUrl}/studregistration/get`)
  }

getStudentList(): Observable<Studregistration[]>{
    return this._http.get<Studregistration[]>(`${this.baseUrl}/get/nullregistrations`)
  }

  getStudList(id: number,data: Studregistration): Observable<Studregistration[]>{
    return this._http.get<Studregistration[]>(`${this.baseUrl}/studregistration/get/${id}`)
  }

  create(data: Studregistration): Observable<any>{
    return this._http.post<Studregistration>(`${this.baseUrl}/studregistration/create`, data)
  }

  createStudent(data: Studregistration): Observable<any>{
    return this._http.post<Studregistration>(`${this.baseUrl}/student/create`, data)
  }


  edit(id: number,data: Studregistration): Observable<any>{
    return this._http.put<Studregistration>(`${this.baseUrl}/studregistration/edit/${id}`, data)
  }

  editStudent(id: number,data: Studregistration): Observable<any>{
    return this._http.put<Studregistration>(`${this.baseUrl}/student/edit/${id}`, data)
  }

  delete(id: number): Observable<Studregistration>{
    return this._http.delete<Studregistration>(`${this.baseUrl}/studregistration/delete/`+id)
  }
}
