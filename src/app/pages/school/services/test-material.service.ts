import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestMaterial} from "../interface/testmaterial";


@Injectable({
  providedIn: 'root'
})
export class TestMaterialService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getTestMaterialList(): Observable<TestMaterial[]>{
    return this._http.get<TestMaterial[]>(`${this.baseUrl}/testmaterial/get`)
  }

  create(data: TestMaterial): Observable<any>{
    return this._http.post<TestMaterial>(`${this.baseUrl}/testmaterial/create`, data)
  }

  edit(id: number,data: TestMaterial): Observable<any>{
    return this._http.put<TestMaterial>(`${this.baseUrl}/testmaterial/edit/${id}`, data)
  }

  delete(id: number): Observable<TestMaterial>{
    return this._http.delete<TestMaterial>(`${this.baseUrl}/testmaterial/delete/`+id)
  }
}
