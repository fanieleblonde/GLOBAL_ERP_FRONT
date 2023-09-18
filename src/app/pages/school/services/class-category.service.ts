import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Program} from "../interface/program";
import {ClassCategory} from "../interface/class-category";

@Injectable({
  providedIn: 'root'
})
export class ClassCategoryService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<ClassCategory[]>{
    return this._http.get<ClassCategory[]>(`${this.baseUrl}/class-category/get`)
  }

  create(data: ClassCategory): Observable<any>{
    return this._http.post<ClassCategory>(`${this.baseUrl}/class-category/create`, data)
  }

  edit(id: number,data: ClassCategory): Observable<any>{
    return this._http.put<ClassCategory>(`${this.baseUrl}/class-category/edit/${id}`, data)
  }

  delete(id: number): Observable<ClassCategory>{
    return this._http.delete<ClassCategory>(`${this.baseUrl}/class-category/delete/`+id)
  }
}
