import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobLocation} from "../interface/job-location";

@Injectable({
  providedIn: 'root'
})
export class JobLocationService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<JobLocation[]>{
    return this._http.get<JobLocation[]>(`${this.baseUrl}/job/location/get`)
  }

  create(data: JobLocation): Observable<any>{
    return this._http.post<JobLocation>(`${this.baseUrl}/job/location/create`, data)
  }

  edit(id: number,data: JobLocation): Observable<any>{
    return this._http.put<JobLocation>(`${this.baseUrl}/job/location/edit/${id}`, data)
  }

  delete(id: number): Observable<JobLocation>{
    return this._http.delete<JobLocation>(`${this.baseUrl}/job/location/delete/`+id)
  }
}
