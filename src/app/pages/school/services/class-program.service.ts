import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassProgram} from "../interface/class-program";

@Injectable({
  providedIn: 'root'
})
export class ClassProgramService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ClassProgram[]>{
    return this._http.get<ClassProgram[]>(`${this.baseUrl}/class-program/get`)
  }

  create(data: ClassProgram): Observable<any>{
    return this._http.post<ClassProgram>(`${this.baseUrl}/class-program/create`, data)
  }

  edit(id: number,data: ClassProgram): Observable<any>{
    return this._http.put<ClassProgram>(`${this.baseUrl}/class-program/edit/${id}`, data)

  }

  delete(id: number): Observable<ClassProgram>{
    return this._http.delete<ClassProgram>(`http://localhost:8000/class/program/delete/`+id)
  }
}
