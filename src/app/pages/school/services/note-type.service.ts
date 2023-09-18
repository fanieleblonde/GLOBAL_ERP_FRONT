import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NoteType} from "../interface/noteType";

@Injectable({
  providedIn: 'root'
})
export class NoteTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getNoteTypeList(): Observable<NoteType[]>{
    return this._http.get<NoteType[]>(`${this.baseUrl}/note-type/get`)
  }

  create(data: NoteType): Observable<any>{
    return this._http.post<NoteType>(`${this.baseUrl}/note-type/create`, data)
  }

  edit(id: number,data: NoteType): Observable<any>{
    return this._http.put<NoteType>(`${this.baseUrl}/note-type/edit/${id}`, data)
  }

  delete(id: number): Observable<NoteType>{
    return this._http.delete<NoteType>(`${this.baseUrl}/note-type/delete/`+id)
  }
}
