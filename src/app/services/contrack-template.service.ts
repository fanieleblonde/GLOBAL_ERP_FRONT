import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Degree} from "../interface/degree";
import {ContractTemplate} from "../interface/contract-template";

@Injectable({
  providedIn: 'root'
})
export class ContrackTemplateService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ContractTemplate[]>{
    return this._http.get<ContractTemplate[]>(`${this.baseUrl}/contract/template/get`)
  }

  create(data: ContractTemplate): Observable<any>{
    return this._http.post<ContractTemplate>(`${this.baseUrl}/contract/template/create`, data)
  }

  edit(id: number,data: ContractTemplate): Observable<any>{
    return this._http.put<ContractTemplate>(`${this.baseUrl}/contract/template/edit/${id}`, data)
  }

  delete(id: number): Observable<ContractTemplate>{
    return this._http.delete<ContractTemplate>(`${this.baseUrl}/contract/template/delete/`+id)
  }
}
