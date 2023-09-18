import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BloodGroup} from "../interface/bloodgroup";

@Injectable({
  providedIn: 'root'
})
export class BloodgroupService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getBloodGroupList(): Observable<BloodGroup[]>{
    return this._http.get<BloodGroup[]>(`${this.baseUrl}/blood-group/get`)
  }

  create(data: BloodGroup): Observable<any>{
    return this._http.post<BloodGroup>(`${this.baseUrl}/blood-group/create`, data)
  }

  edit(id: number,data: BloodGroup): Observable<any>{
    return this._http.put<BloodGroup>(`${this.baseUrl}/blood-group/edit/${id}`, data)
  }

  delete(id: number): Observable<BloodGroup>{
    return this._http.delete<BloodGroup>(`${this.baseUrl}/blood-group/delete/`+id)
  }
}
