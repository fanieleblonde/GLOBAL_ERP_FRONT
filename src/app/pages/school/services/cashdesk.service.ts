import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CashDesk} from "../interface/cashdesk";

@Injectable({
  providedIn: 'root'
})
export class CashdeskService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getCashDeskList(): Observable<CashDesk[]>{
    return this._http.get<CashDesk[]>(`${this.baseUrl}/cash-desk/get`)
  }

  create(data: CashDesk): Observable<any>{
    return this._http.post<CashDesk>(`${this.baseUrl}/cash-desk/create`, data)
  }

  edit(id: number,data: CashDesk): Observable<any>{
    return this._http.put<CashDesk>(`${this.baseUrl}/cash-desk/edit/${id}`, data)
  }

  delete(id: number): Observable<CashDesk>{
    return this._http.delete<CashDesk>(`${this.baseUrl}/cash-desk/delete/`+id)
  }
}
