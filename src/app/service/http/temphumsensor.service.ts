import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { max } from 'rxjs';
const { Client } = require('pg');
const moment = require('moment');

@Injectable({
  providedIn: 'root'
})
export class TemphumsensorService {
  constructor(private hc: HttpClient) { }

  getInfo() {
    return this.hc.get<any>('http://192.168.68.70:5000/api/v1/current/getInfo');
  }
}