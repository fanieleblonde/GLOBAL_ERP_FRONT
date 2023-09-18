import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  addProduct(data: any): Observable<any>{
    return this._http.post('http://localhost:8000/api/education', data)
  }

  updateEducation(id: number, data: any): Observable<any>{
    return this._http.put(`http://localhost:8000/api/education/${id}`, data)
  }

  getEducationList(): Observable<any>{
    return this._http.get('http://localhost:8000/api/education')
  }

  getEducationListById(id: number): Observable<any>{
    return this._http.get('http://localhost:8000/api/education')
  }

  deleteEducation(id: number): Observable<any>{
    return this._http.delete(`http://localhost:8000/api/education/${id}`)
  }
}
