import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<User[]>{
    return this._http.get<User[]>(`${this.baseUrl}/user/get`)
  }

  getUserItem(id: number): Observable<any>{
    return this._http.get<User>(`${this.baseUrl}/user/get/${id}`)
  }
  setCurrentYear(yearId: number,userId: number): Observable<any>{
    return this._http.get<User>(`http://localhost:8000/user/setCurrentYear/${yearId}/${userId}`)
  }

  create(data: User): Observable<any>{
    return this._http.post<User>(`${this.baseUrl}/user/create`, data)
  }

  edit(id: number,data: User): Observable<any>{
    return this._http.put<User>(`${this.baseUrl}/user/edit/${id}`, data)
  }

  delete(id: number): Observable<User>{
    return this._http.delete<User>(`${this.baseUrl}/user/delete/`+id)
  }
}
