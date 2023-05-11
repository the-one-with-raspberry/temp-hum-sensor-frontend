import { Component, OnInit } from '@angular/core';
import { data } from '../login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor (private router: Router) {}

  data: any = data;

  routerRedir(where: string) {
    this.router.navigate([`readings/${where}`]);
  }

  ngOnInit(): void {
    
  }
}