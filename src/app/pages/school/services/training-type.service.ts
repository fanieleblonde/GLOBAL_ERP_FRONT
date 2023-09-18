import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TrainingType} from "../interface/trainingType";

@Injectable({
  providedIn: 'root'
})
export class TrainingTypeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private _http: HttpClient) { }

  getTrainingTypeList(): Observable<TrainingType[]>{
    return this._http.get<TrainingType[]>(`${this.baseUrl}/training-type/get`)
  }

  create(data: TrainingType): Observable<any>{
    return this._http.post<TrainingType>(`${this.baseUrl}/training-type/create`, data)
  }

  edit(id: number,data: TrainingType): Observable<any>{
    return this._http.put<TrainingType>(`${this.baseUrl}/training-type/edit/${id}`, data)
  }

  delete(id: number): Observable<TrainingType>{
    return this._http.delete<TrainingType>(`${this.baseUrl}/training-type/delete/`+id)
  }
}
