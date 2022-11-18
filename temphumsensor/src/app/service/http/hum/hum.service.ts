import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HumService {

  constructor(private http:HttpClient) { }

  getHumCur() {
    return this.http.get('http://192.168.0.22:5000/api/v1/current/getHum');
  }
}
