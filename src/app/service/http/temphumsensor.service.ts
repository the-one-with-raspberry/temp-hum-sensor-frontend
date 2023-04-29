import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryResult } from 'node-postgres';
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
  getHistInfo(time: string) {
    const client = new Client({
      host: "localhost",
      user: "pi",
      port: 5432,
      password: "123456",
      database: "pimyhouse"
    });
    function subDate(ms: number) {
      return new Date(Date.now() - ms);
    }
    client.connect();
    client.query(`SELECT * FROM th`, (err: Error, res: QueryResult) => {
      if (err) {
        console.error(err.message);
        return;
      }
      let rows = res.rows;
      let output = [];
      let maxTime: Date | null = new Date();
      switch (time) {
        case "24h":
        case "1d":
          maxTime = subDate(86400000)
          break;
        case "1w":
          maxTime = subDate(604800000)
          break;
        case "1m":
          maxTime = subDate(2628000000)
          break;
        case "1y":
          maxTime = subDate(31536000000)
          break;
        case "all":
          maxTime = null;
          break;
        default:
          break;
      }
      if (time != 'all' && maxTime != null) {
        for (let row of rows) {
          if (moment(row.timestamp).fromNow() < maxTime) {
            output.push(client.query(`SELECT temp FROM th WHERE timestamp = ${row.timestamp}`))
          }
        }
      } else {
        for (let row of rows) {
            output.push(client.query(`SELECT temp FROM th WHERE timestamp = ${row.timestamp}`))
        }
      }
      return output;
    })
  }
}