import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DiplomaType} from "../interface/diplomaType";

@Injectable({
  providedIn: 'root'
})
export class DiplomaTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }
  getDiplomaTypeList(): Observable<DiplomaType[]>{
    return this._http.get<DiplomaType[]>(`${this.baseUrl}/diploma/type/get`)
  }

  create(data: DiplomaType): Observable<any>{
    return this._http.post<DiplomaType>(`${this.baseUrl}/diploma/type/create`, data)
  }

  edit(id: number,data: DiplomaType): Observable<any>{
    return this._http.put<DiplomaType>(`${this.baseUrl}/diploma/type/edit/${id}`, data)
  }

  delete(id: number): Observable<DiplomaType>{
    return this._http.delete<DiplomaType>(`${this.baseUrl}/diploma/type/delete/`+id)
  }

}
