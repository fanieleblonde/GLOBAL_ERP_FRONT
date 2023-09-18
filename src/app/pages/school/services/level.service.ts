import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Level} from "../interface/level";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getLevelList(): Observable<Level[]>{
    return this._http.get<Level[]>(`${this.baseUrl}/level/get`)
  }

  create(data: Level): Observable<any>{
    return this._http.post<Level>(`${this.baseUrl}/level/create`, data)
  }

  edit(id: number,data: Level): Observable<any>{
    return this._http.put<Level>(`${this.baseUrl}/level/edit/${id}`, data)
  }

  delete(id: number): Observable<Level>{
    return this._http.delete<Level>(`${this.baseUrl}/level/delete/`+id)
  }
}
