import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegistrationForm} from "../interface/registrationForm";

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getRegistrationFormList(): Observable<RegistrationForm[]>{
    return this._http.get<RegistrationForm[]>(`${this.baseUrl}/registration-form/get`)
  }

  create(data: RegistrationForm): Observable<any>{
    return this._http.post<RegistrationForm>(`${this.baseUrl}/registration-form/create`, data)
  }

  edit(id: number,data: RegistrationForm): Observable<any>{
    return this._http.put<RegistrationForm>(`${this.baseUrl}/registration-form/edit/${id}`, data)
  }

  delete(id: number): Observable<RegistrationForm>{
    return this._http.delete<RegistrationForm>(`${this.baseUrl}/registration-form/delete/`+id)
  }
}
