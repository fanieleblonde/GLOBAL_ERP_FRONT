import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ExpenseHeading } from '../interface/exspenseHeading';

@Injectable({
  providedIn: 'root'
})
export class ExpenseHeadingService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) {  }

  getExpenseHeadingList(): Observable<ExpenseHeading[]>{
    return this._http.get<ExpenseHeading[]>(`${this.baseUrl}/expense/heading/get`)
  }

  create(data: ExpenseHeading): Observable<any>{
    return this._http.post<ExpenseHeading>(`${this.baseUrl}/expense/heading/create`, data)
  }

  edit(id: number,data: ExpenseHeading): Observable<any>{
    return this._http.put<ExpenseHeading>(`${this.baseUrl}/expense/heading/edit/${id}`, data)
  }

  delete(id: number): Observable<ExpenseHeading>{
    return this._http.delete<ExpenseHeading>(`${this.baseUrl}/expense/heading/delete/`+id)
  }
}
