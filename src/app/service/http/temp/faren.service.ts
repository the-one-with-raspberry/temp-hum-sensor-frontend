import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarenService {

  constructor(private http:HttpClient) { }

  getTempFarenCur() {
    const p = new HttpParams().set('unit', 'farenheit');
    return this.http.get('http://192.168.0.22:5000/api/v1/current/getTemp', {params: p});
  }
}
