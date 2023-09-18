import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NationalExam} from "../interface/nationalexam";

@Injectable({
  providedIn: 'root'
})
export class NationalExamService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getNationalExamList(): Observable<NationalExam[]>{
    return this._http.get<NationalExam[]>(`${this.baseUrl}/nationalexam/get`)
  }

  create(data: NationalExam): Observable<any>{
    return this._http.post<NationalExam>(`${this.baseUrl}/nationalexam/create`, data)
  }

  edit(id: number,data: NationalExam): Observable<any>{
    return this._http.put<NationalExam>(`${this.baseUrl}/nationalexam/edit/${id}`, data)
  }

  delete(id: number): Observable<NationalExam>{
    return this._http.delete<NationalExam>(`${this.baseUrl}/nationalexam/delete/`+id)
  }
}
