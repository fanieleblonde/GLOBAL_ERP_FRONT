import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestGroup} from "../interface/testgroup";

@Injectable({
  providedIn: 'root'
})
export class TestGroupService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getTestGroupList(): Observable<TestGroup[]>{
    return this._http.get<TestGroup[]>(`${this.baseUrl}/testgroup/get`)
  }

  create(data: TestGroup): Observable<any>{
    return this._http.post<TestGroup>(`${this.baseUrl}/testgroup/create`, data)
  }

  edit(id: number,data: TestGroup): Observable<any>{
    return this._http.put<TestGroup>(`${this.baseUrl}/testgroup/edit/${id}`, data)
  }

  delete(id: number): Observable<TestGroup>{
    return this._http.delete<TestGroup>(`${this.baseUrl}/testgroup/delete/`+id)
  }
}
