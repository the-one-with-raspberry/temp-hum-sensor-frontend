import { Component, OnInit } from '@angular/core';
import { TemphumsensorService } from '../service/http/temphumsensor.service';
import { ChartConfiguration } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import { HistoryArray } from '../history-array';
import * as quark from '../quark';
import faicons from '../fa-solid.json';

@Component({
  selector: 'app-readings-hist',
  templateUrl: './readings-hist.component.html',
  styleUrls: ['./readings-hist.component.css']
})
export class ReadingsHistComponent implements OnInit {

  constructor(private ths: TemphumsensorService) { }

  ngOnInit(): void {
    this.getInfoH();

  }
  getInfoH() {
    const checkedOpt = document.querySelector<HTMLInputElement>('input[name="timeselect"]:checked');
    document.getElementById('icon-asdf')!.setAttribute('class', `fa fa-${faicons[Math.floor(Math.random() * faicons.length)]} fa-spin fa-2xl`)
    setInterval(() => {
      let f = document.createElement("i")
      document.querySelector('#hoficon')!.removeChild(document.getElementById('icon-asdf')!)
      f.setAttribute('class', `fa fa-${faicons[Math.floor(Math.random() * faicons.length)]} fa-spin fa-2xl`)
      f.setAttribute('id', 'icon-asdf')
      document.getElementById('hoficon')!.insertBefore(f, document.querySelector('#emptyspace1')!)
    }, 2000)
    this.ths.getHistInfo(checkedOpt!.dataset['value']!).subscribe({
      next: (res) => { this.handleSuccessfulResponseH(res) }, error: (err) => {
        document.querySelector<HTMLHeadingElement>("#hoficon")!.innerText = document.querySelector<HTMLHeadingElement>("#hoficon")!.innerText.replace("The server is doing its magic...", "Oops! Something bad happened!")
        const lmt = document.createElement('p')
        lmt.style.fontFamily = 'monospace';
        lmt.style.color = 'red';
        lmt.innerText = err;
        document.querySelector<HTMLHeadingElement>("#hoficon")!.insertBefore(lmt, document.querySelector<HTMLElement>('#emptyspace2')!)
      }
    });
  }
  handleSuccessfulResponseH(res: any) {
    try {
      const content = res.content;
      const humArr: any[][] = content.humidity.value;
      const tempArr: any[][] = content.celsius.value;
      const farenArr: any[][] = content.farenheit.value;
      const selTime = (document.querySelector('input[name="timeselect"]:checked') as HTMLElement).dataset['value'];
      /**
       * @example dataset = arrTimes(60 * 60 * 24, 60 * 60);
       * @param time How much time (in seconds) from last database log
       * @param diff Interval of time
       * @returns HistoryArray of humidity and temperature information
       */
      function arrTimes(time: number, diff: number): HistoryArray {
        let out: HistoryArray = { hum: [], celsius: [], faren: [], dates: [] };
        for (let i = 0; i < humArr.length; i++) {
          if (time % diff == 0) {
            out.hum.push(humArr[i][0]);
            out.celsius.push(tempArr[i][0])
            out.faren.push(farenArr[i][0])
            out.dates.push(new Date(tempArr[i][1]))
          } else if (i > time) {
            break;
          }
        }
        return out;
      }
      function monthDays(): number {
        const date = new Date();
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      }
      function leapYear() {
        const d = new Date().getFullYear()
        return ((d % 4 == 0) && (d % 100 != 0)) || (d % 400 == 0);
      }
      let dataset: HistoryArray;
      switch (selTime) {
        case '1d':
          dataset = arrTimes(60 * 60 * 24, 60 * 60);
          break;
        case '1w':
          dataset = arrTimes(60 * 60 * 24 * 7, 60 * 60 * 24);
          break;
        case '1m':
          dataset = arrTimes(60 * 60 * 24 * monthDays(), 60 * 60 * 24);
          break;
        case '1y':
          if (leapYear()) {
            dataset = arrTimes(60 * 60 * 24 * 366, 60 * 60 * 24)
          } else {
            dataset = arrTimes(60 * 60 * 24 * 365, 60 * 60 * 24)
          }
          break;
        case '5y':
          if (leapYear()) {
            dataset = arrTimes((60 * 60 * 24 * 366 * 2) + (60 * 60 * 24 * 365 * 3), 60 * 60 * 24)
          } else {
            dataset = arrTimes((60 * 60 * 24 * 366 * 1) + (60 * 60 * 24 * 365 * 4), 60 * 60 * 24)
          }
          break;
        case 'all':
          dataset = arrTimes(Date.now(), 60 * 60 * 24)
          break;
        default:
          throw new Error('Invalid time range.')
      }
      console.log(dataset)
      let chartData = {
        type: 'line',
        data: {
          labels: (() => {
            let out: string[] = []
            for (let item of dataset.dates) {
              out.push(
                item.toTimeString().substring(0, 8).concat(", ", item.toDateString().substring(0, 3), ", ", item.toDateString().substring(4, 10), ", ", item.toDateString().substring(11))
              )
            }
            return out;
          })(),
          datasets: [{
            label: "Humidity (%RH)",
            data: dataset.hum,
            fill: true,
            borderColor: '#0080FF',
            tension: 0.5
          },
          {
            label: "Temperature (Celsius)",
            data: dataset.celsius,
            fill: true,
            borderColor: '#00E573',
            tension: 0.5
          },
            // {
            //   label: "Temperature (Farenheit)",
            //   data: dataset.faren,
            //   fill: true,
            //   borderColor: '#FF3030',
            //   tension: 0.5
            // }
          ]
        }
      } as ChartConfiguration
      let chart: Chart = new Chart(
        document.getElementById('ctx') as HTMLCanvasElement,
        chartData
      )
      const elements = [document.getElementById('divoficon'), document.getElementById('ctxdiv')]
      if (elements[0] != null && elements[1] != null) {
        elements[0].style.display = 'none';
        elements[1].style.display = 'block';
      }
    } catch (err: any) {
      document.querySelector<HTMLHeadingElement>("#hoficon")!.innerText = document.querySelector<HTMLHeadingElement>("#hoficon")!.innerText.replace("The server is doing its magic...", "Oops! Something bad happened!")
      const lmt = document.createElement('p')
      lmt.style.fontFamily = 'monospace';
      lmt.style.color = 'red';
      lmt.innerText = err;
      document.querySelector<HTMLHeadingElement>("#hoficon")!.insertBefore(lmt, document.querySelector<HTMLElement>('#emptyspace2')!)
    }
  }
}
