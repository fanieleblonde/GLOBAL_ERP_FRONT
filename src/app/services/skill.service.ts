import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Skill} from "../interface/skill";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Skill[]>{
    return this._http.get<Skill[]>(`${this.baseUrl}/skill/get`)
  }

  create(data: Skill): Observable<any>{
    return this._http.post<Skill>(`${this.baseUrl}/skill/create`, data)
  }

  edit(id: number,data: Skill): Observable<any>{
    return this._http.put<Skill>(`${this.baseUrl}/skill/edit/${id}`, data)
  }

  delete(id: number): Observable<Skill>{
    return this._http.delete<Skill>(`${this.baseUrl}/skill/delete/`+id)
  }
}
