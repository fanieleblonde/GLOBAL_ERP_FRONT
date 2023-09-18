import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Grading} from "../interface/grading";

@Injectable({
  providedIn: 'root'
})
export class GradingService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getGradingList(): Observable<Grading[]>{
    return this._http.get<Grading[]>(`${this.baseUrl}/grading/get`)
  }

  create(data: Grading): Observable<any>{
    return this._http.post<Grading>(`${this.baseUrl}/grading/create`, data)
  }

  edit(id: number,data: Grading): Observable<any>{
    return this._http.put<Grading>(`${this.baseUrl}/grading/edit/${id}`, data)
  }

  delete(id: number): Observable<Grading>{
    return this._http.delete<Grading>(`${this.baseUrl}/grading/delete/`+id)
  }
}
