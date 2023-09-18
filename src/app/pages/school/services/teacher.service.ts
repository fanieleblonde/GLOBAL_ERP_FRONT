import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../interface/teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Teacher[]>{
    return this._http.get<Teacher[]>(`${this.baseUrl}/teacher/get`)
  }

  create(data: Teacher): Observable<any>{
    return this._http.post<Teacher>(`${this.baseUrl}/teacher/create`, data)
  }

  edit(id: number,data: Teacher): Observable<any>{
    return this._http.put<Teacher>(`${this.baseUrl}/teacher/edit/${id}`, data)
  }

  delete(id: number): Observable<Teacher>{
    return this._http.delete<Teacher>(`${this.baseUrl}/teacher/delete/`+id)
  }

}
