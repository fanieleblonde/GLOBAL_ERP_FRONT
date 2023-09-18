import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student} from "../interface/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getStudentList(): Observable<Student[]>{
    return this._http.get<Student[]>(`${this.baseUrl}/student/get`)
  }

  create(data: Student): Observable<any>{
    return this._http.post<Student>(`${this.baseUrl}/student/create`, data)
  }

  edit(id: number,data: Student): Observable<any>{
    return this._http.put<Student>(`${this.baseUrl}/student/edit/${id}`, data)
  }

  delete(id: number): Observable<Student>{
    return this._http.delete<Student>(`${this.baseUrl}/student/delete/`+id)
  }
}
