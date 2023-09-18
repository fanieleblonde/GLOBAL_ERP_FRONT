import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registrationperclass} from "../interface/registrationperclass";

@Injectable({
  providedIn: 'root'
})
export class RegistrationperclassService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getRegistrationPerClassList(): Observable<Registrationperclass[]>{
    return this._http.get<Registrationperclass[]>(`${this.baseUrl}/get/classregistrations`)
  }

  getStregistrationList(): Observable<Registrationperclass[]>{
    return this._http.get<Registrationperclass[]>(`${this.baseUrl}/studregistrationperclass/get`)
  }

  create(data: Registrationperclass): Observable<any>{
    return this._http.post<Registrationperclass>(`${this.baseUrl}/registrationperclass/create`, data)
  }

  edit(id: number,data: any): Observable<any>{
    return this._http.put<any>(`${this.baseUrl}/oldstudregistration/edit/${id}`, data)
  }

  delete(id: number): Observable<Registrationperclass>{
    return this._http.delete<Registrationperclass>(`http://localhost:8000/studregistration/delete/`+id)
  }

  // edit(id: number,data: Registrationperclass): Observable<any>{
  //   return this._http.put<Registrationperclass>(`${this.baseUrl}/studregistrationperclass/edit/${id}`, data)
  // }

  // delete(id: number): Observable<Registrationperclass>{
  //   return this._http.delete<Registrationperclass>(`${this.baseUrl}/studregistration/delete/`+id)
  // }
}
