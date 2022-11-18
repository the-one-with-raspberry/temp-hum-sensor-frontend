import { Component, OnInit } from '@angular/core';
import { HumService } from '../service/http/hum/hum.service';
import { CelsiusService } from '../service/http/temp/celsius.service';
import { FarenService } from '../service/http/temp/faren.service';

@Component({
  selector: 'app-readings',
  templateUrl: './readings.component.html',
  styleUrls: ['./readings.component.scss']
})
export class ReadingsComponent implements OnInit {


  constructor(private celsius: CelsiusService, private farenheit: FarenService, private humidity: HumService) { }

  ngOnInit(): void {
  }

  getTempCelsCur() {
    console.log(this.celsius.getTempCelsCur());
  }

  getTempFarenCur() {
    console.log(this.farenheit.getTempFarenCur());
  }

  getHumCur() {
    console.log(this.humidity.getHumCur());
    this.humidity.getHumCur().subscribe();
  }
}
