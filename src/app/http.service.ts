import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpclient: HttpClient) { }

  getTempCelsius(): any {
    const params = new HttpParams().set('unit', 'celsius');
    return this.httpclient.get<number>('78.96.198.92:5000/api/v1/current/getTemp', {params: params});
  }

  getTempFaren(): any {
    const params = new HttpParams().set('unit', 'farenheit');
    return this.httpclient.get<number>('78.96.198.92:5000/api/v1/current/getTemp', {params: params});
  }

  getHum(): any {
    return this.httpclient.get<Number>('78.96.198.92:5000/api/v1/current/getHum');
  }
}
