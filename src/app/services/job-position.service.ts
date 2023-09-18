import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmploymentType} from "../interface/employment-type";
import {JobPosition} from "../interface/job-position";

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<JobPosition[]>{
    return this._http.get<JobPosition[]>(`${this.baseUrl}/job/position/get`)
  }

  create(data: JobPosition): Observable<any>{
    return this._http.post<JobPosition>(`${this.baseUrl}/job/position/create`, data)
  }

  edit(id: number,data: JobPosition): Observable<any>{
    return this._http.put<JobPosition>(`${this.baseUrl}/job/position/edit/${id}`, data)
  }

  delete(id: number): Observable<JobPosition>{
    return this._http.delete<JobPosition>(`${this.baseUrl}/job/position/delete/`+id)
  }
}
