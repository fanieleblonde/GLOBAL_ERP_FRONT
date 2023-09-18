import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../interface/option";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getOptionList(): Observable<Option[]>{
    return this._http.get<Option[]>(`${this.baseUrl}/option/get`)
  }

  create(data: Option): Observable<any>{
    return this._http.post<Option>(`${this.baseUrl}/option/create`, data)
  }

  edit(id: number,data: Option): Observable<any>{
    return this._http.put<Option>(`${this.baseUrl}/option/edit/${id}`, data)
  }

  delete(id: number): Observable<Option>{
    return this._http.delete<Option>(`${this.baseUrl}/option/delete/`+id)
  }
}
