import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SkillType} from "../interface/skill-type";

@Injectable({
  providedIn: 'root'
})
export class SkillTypeService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<SkillType[]>{
    return this._http.get<SkillType[]>(`${this.baseUrl}/skill/type/get`)
  }

  create(data: SkillType): Observable<any>{
    return this._http.post<SkillType>(`${this.baseUrl}/skill/type/create`, data)
  }

  edit(id: number,data: SkillType): Observable<any>{
    return this._http.put<SkillType>(`${this.baseUrl}/skill/type/edit/${id}`, data)
  }

  delete(id: number): Observable<SkillType>{
    return this._http.delete<SkillType>(`${this.baseUrl}/skill/type/delete/`+id)
  }
}
