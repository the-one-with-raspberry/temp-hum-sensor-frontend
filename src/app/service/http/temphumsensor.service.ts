import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { platform } from 'process';

@Injectable({
  providedIn: 'root'
})
export class TemphumsensorService {
  constructor(private hc: HttpClient, private router: Router) { }

  apiVer: string = '1';

  baseUrl: string = platform === 'linux' ? `http://localhost:5000/api/v${this.apiVer}` : `http://192.168.68.70:5000/api/v${this.apiVer}`;

  getInfo() {
    return this.hc.get<any>(`${this.baseUrl}/current/getInfo`);
  }
  getHistInfo(time: string, interval: number | string) {
    if (time != undefined) {
      return this.hc.get<any>(`${this.baseUrl}/hist/getInfo?time=${time}&interval=${interval}`);
    } else {
      throw new Error('Invalid time parameter.');
    }
  }
}