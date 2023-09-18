import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bank} from "../interface/bank";

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getBankList(): Observable<Bank[]>{
    return this._http.get<Bank[]>(`${this.baseUrl}/bank/get`)
  }

  create(data: Bank): Observable<any>{
    return this._http.post<Bank>(`${this.baseUrl}/bank/create`, data)
  }

  edit(id: number,data: Bank): Observable<any>{
    return this._http.put<Bank>(`${this.baseUrl}/bank/edit/${id}`, data)
  }

  delete(id: number): Observable<Bank>{
    return this._http.delete<Bank>(`${this.baseUrl}/bank/delete/`+id)
  }
}
