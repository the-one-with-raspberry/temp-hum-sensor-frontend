import { Component, OnInit } from '@angular/core';
import { loginData } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: {deviceId: string, username: string | null} = loginData;

  constructor (private router: Router) {}

  ngOnInit(): void {

  }
}