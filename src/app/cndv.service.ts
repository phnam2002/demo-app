import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cndv } from './cndv';

@Injectable({
  providedIn: 'root'
})
export class CndvService {
  cndv: Cndv;
  private baseUrl = "http://localhost:8999/dcdsd";

  constructor(private httpClient: HttpClient) { };
  getCndvsList(dCDSDrequest: Object): Observable<Cndv[]> {
    return this.httpClient.post<Cndv[]>(`${this.baseUrl}/find`, dCDSDrequest);
  }

  createCndv(cndv: Cndv): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/add`, cndv);
  }

  updateCndv(cndv: Cndv): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/update`, cndv);
  }

  deleteCndv(cndv: Cndv): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/delete`, cndv);
  }

  getListAll(): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}/getAll`);
  }

  setData(data: any) {
    this.cndv = data;
  }
  getData() {
    return this.cndv;
  }
  cleanData(data: any){
    data = undefined;
  }
}
