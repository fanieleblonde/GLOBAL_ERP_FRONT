import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BankAccount} from "../interface/bankaccount";

@Injectable({
  providedIn: 'root'
})
export class BankaccountService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getBankAccountList(): Observable<BankAccount[]>{
    return this._http.get<BankAccount[]>(`${this.baseUrl}/bank-account/get`)
  }

  create(data: BankAccount): Observable<any>{
    return this._http.post<BankAccount>(`${this.baseUrl}/bank-account/create`, data)
  }

  edit(id: number,data: BankAccount): Observable<any>{
    return this._http.put<BankAccount>(`${this.baseUrl}/bank-account/edit/${id}`, data)
  }

  delete(id: number): Observable<BankAccount>{
    return this._http.delete<BankAccount>(`${this.baseUrl}/bank-account/delete/`+id)
  }
}
