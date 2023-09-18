import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../interface/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getList(): Observable<Room[]>{
    return this._http.get<Room[]>(`${this.baseUrl}/room/get`)
  }

  create(data: Room): Observable<any>{
    return this._http.post<Room>(`${this.baseUrl}/room/create`, data)
  }

  edit(id: number,data: Room): Observable<any>{
    return this._http.put<Room>(`${this.baseUrl}/room/edit/${id}`, data)
  }

  delete(id: number): Observable<Room>{
    return this._http.delete<Room>(`${this.baseUrl}/room/delete/`+id)
  }
}
