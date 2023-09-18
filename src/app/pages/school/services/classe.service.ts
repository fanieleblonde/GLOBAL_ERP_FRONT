import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Classe} from "../interface/classe";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getClasseList(): Observable<Classe[]>{
    return this._http.get<Classe[]>(`${this.baseUrl}/classe/get`)
  }

  create(data: Classe): Observable<any>{
    return this._http.post<Classe>(`${this.baseUrl}/classe/create`, data)
  }

  edit(id: number,data: Classe): Observable<any>{
    return this._http.put<Classe>(`${this.baseUrl}/classe/edit/${id}`, data)
  }

  delete(id: number): Observable<Classe>{
    return this._http.delete<Classe>(`${this.baseUrl}/classe/delete/`+id)
  }
}
