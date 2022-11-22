import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CelsiusService {

  constructor(private http:HttpClient) { }

  getTempCelsCur() {
    const p = new HttpParams().set('unit', 'celsius');
    return this.http.get('http://192.168.0.22:5000/api/v1/current/getTemp', {params: p});
  }
}
