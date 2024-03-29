import { Component, OnInit } from '@angular/core';
import { TemphumsensorService } from '../service/http/temphumsensor.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.css']
})
export class ReadingsComponent implements OnInit {


  constructor(private ths: TemphumsensorService) { }

  ngOnInit(): void {
    this.getInfoC();
  }

  getInfoC() {
    this.ths.getInfo()
      .subscribe(response => this.handleSuccessfulResponseC(response));
  }

  handleSuccessfulResponseC(response: any) {
    var c = document.getElementById('tccp');
    var f = document.getElementById('tfcp');
    var h = document.getElementById('hcp');
    if (c) {
      c.innerText = response.content.celsius.value.toFixed(1);
    }
    if (f) {
      f.innerText = response.content.farenheit.value.toFixed(1);
    }
    if (h) {
      h.innerText = response.content.humidity.value.toFixed(1);
    }
  }
}
