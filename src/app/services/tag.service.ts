import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tag} from "../interface/tag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private _http: HttpClient) { }

  getList(): Observable<Tag[]>{
    return this._http.get<Tag[]>(`${this.baseUrl}/tag/get`)
  }

  create(data: Tag): Observable<any>{
    return this._http.post<Tag>(`${this.baseUrl}/tag/create`, data)
  }

  edit(id: number,data: Tag): Observable<any>{
    return this._http.put<Tag>(`${this.baseUrl}/tag/edit/${id}`, data)
  }

  delete(id: number): Observable<Tag>{
    return this._http.delete<Tag>(`${this.baseUrl}/tag/delete/`+id)
  }
}
