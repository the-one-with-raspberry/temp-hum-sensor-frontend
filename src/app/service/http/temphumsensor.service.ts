import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemphumsensorService {
  constructor(private hc: HttpClient) { }

  getInfo() {
    return this.hc.get<any>('http://localhost:5000/api/v1/current/getInfo');
  }
  getHistInfo(time: string) {
    if (time != undefined) {
      return this.hc.get<any>(`http://localhost:5000/api/v1/hist/getInfo?time=${time}`);
    } else {
      throw new Error('Invalid time parameter.');
    }
  }
}
