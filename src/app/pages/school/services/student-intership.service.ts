import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentIntersip} from "../interface/studentinternship";

@Injectable({
  providedIn: 'root'
})
export class StudentIntershipService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<StudentIntersip[]>{
    return this._http.get<StudentIntersip[]>(`${this.baseUrl}/student/internship/get`)
  }

  create(data: StudentIntersip): Observable<any>{
    return this._http.post<StudentIntersip>(`${this.baseUrl}/student/internship/create`, data)
  }

  edit(id: number,data: StudentIntersip): Observable<any>{
    return this._http.put<StudentIntersip>(`${this.baseUrl}/student/internship/edit/${id}`, data)
  }

  delete(id: number): Observable<StudentIntersip>{
    return this._http.delete<StudentIntersip>(`${this.baseUrl}/student/internship/delete/`+id)
  }
}
