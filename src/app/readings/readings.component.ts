import { Component, OnInit } from '@angular/core';
import { HumService } from '../service/http/hum/hum.service';
import { CelsiusService } from '../service/http/temp/celsius.service';
import { FarenService } from '../service/http/temp/faren.service';
import { TemphumsensorService } from '../service/http/temphumsensor.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent implements OnInit {


  constructor(private ths: TemphumsensorService) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.ths.getInfo()
      .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response: any) {
    var c = document.getElementById('tccp');
    var f = document.getElementById('tfcp');
    var h = document.getElementById('hcp');
    if (c) {
      c.innerText = response.content.celsius.value;
    }
    if (f) {
      f.innerText = response.content.farenheit.value;
    }
    if (h) {
      h.innerText = response.content.humidity.value;
    }
  }
}
