import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tempCurrentCelsius = HttpService.prototype.getTempCelsius();
  tempCurrentFaren = HttpService.prototype.getTempFaren();

  humCurrent = HttpService.prototype.getHum();

  ngOnInit(): void { }
}
