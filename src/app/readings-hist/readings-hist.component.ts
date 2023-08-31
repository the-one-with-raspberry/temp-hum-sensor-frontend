import { Component, OnInit } from '@angular/core';
import { TemphumsensorService } from '../service/http/temphumsensor.service';
import { ChartConfiguration } from 'chart.js/auto';
import Chart from 'chart.js/auto';
import { HistoryArray } from '../history-array';
import * as quark from '../quark';
import faicons from '../fa-solid.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-readings-hist',
  templateUrl: './readings-hist.component.html',
  styleUrls: ['./readings-hist.component.css']
})
export class ReadingsHistComponent implements OnInit {

  constructor(private ths: TemphumsensorService, private router: Router, private route: ActivatedRoute) { }

  selectedOpt: string | null = (()=>{
    let out: string = '';
    this.route.queryParams.subscribe({
      next: (params)=>{
        out = params['time'];
      }
    })
    return out == '' ? '1d' : out;
  })()

  ngOnInit(): void {
    if (eval(`${sessionStorage.getItem('refresh')}`)) {
      sessionStorage.setItem('refresh', 'false');
    }
    document.querySelector('input[name="timeselect"]:checked')!.removeAttribute("checked");
    document.querySelector(`[data-value="${this.selectedOpt! ? this.selectedOpt! : "1d"}"]`)!.setAttribute("checked", "");
    console.log(this.selectedOpt);
    this.getInfoH();
  }
  getInfoH() {
    let checkedOpt = document.querySelector<HTMLInputElement>('input[name="timeselect"]:checked');
    document.getElementById('icon-asdf')!.setAttribute('class', `fa fa-${faicons[Math.floor(Math.random() * faicons.length)]} fa-spin fa-2xl`)
    document.getElementById('hoficon')!.style.display = 'block';
    setInterval(() => {
      let f = document.createElement("i")
      document.querySelector('#hoficon')!.removeChild(document.getElementById('icon-asdf')!)
      f.setAttribute('class', `fa fa-${faicons[Math.floor(Math.random() * faicons.length)]} fa-spin fa-2xl`)
      f.setAttribute('id', 'icon-asdf')
      document.getElementById('hoficon')!.insertBefore(f, document.querySelector('#emptyspace1')!)
    }, 2000);
    this.ths.getHistInfo(checkedOpt!.dataset['value']!, (() => {
      switch (checkedOpt!.dataset['value']!) {
        case '1d':
          return 60;
        case '1w':
          return 60 * 24;
        case '1m':
          return 60 * 60 * 24;
        case '1y':
          return 60 * 60 * 24 * 12;
        case '5y':
          return 60 * 60 * 24 * 12;
        case 'all':
          return 60 * 60 * 24 * 12;
        default:
          return '';
      }
    })()).subscribe({
      next: (res) => {
        this.handleSuccessfulResponseH(res);
        let changeDatesInterval = setInterval(() => {
          const checkedOptOld = checkedOpt;
          checkedOpt = document.querySelector<HTMLInputElement>('input[name="timeselect"]:checked');
          if (checkedOptOld != checkedOpt) {
            sessionStorage.setItem("refresh", "true");
            this.router.navigate([`/readings/hist`], { queryParams: { time: checkedOpt!.getAttribute("data-value") } })
            clearInterval(changeDatesInterval);
          }
        }, 50)
        console.log(changeDatesInterval);
      }, error: (err) => {
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
      const content: { celsius: number, fahrenheit: number, humidity: number, timestamp: string }[] = res.content;
      const selTime = (document.querySelector('input[name="timeselect"]:checked') as HTMLElement).dataset['value'];
      /**
       * @example dataset = arrTimes();
       * @returns HistoryArray of humidity and temperature information
       */
      function arrTimes(): HistoryArray {
        let out: HistoryArray = { hum: [], celsius: [], faren: [], dates: [] };
        for (let item of content) {
          out.hum.push(item.humidity);
          out.celsius.push(item.celsius)
          out.faren.push(item.fahrenheit)
          out.dates.push(new Date(item.timestamp))
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
          dataset = arrTimes();
          break;
        case '1w':
          dataset = arrTimes();
          break;
        case '1m':
          dataset = arrTimes();
          break;
        case '1y':
          if (leapYear()) {
            dataset = arrTimes()
          } else {
            dataset = arrTimes()
          }
          break;
        case '5y':
          if (leapYear()) {
            dataset = arrTimes()
          } else {
            dataset = arrTimes()
          }
          break;
        case 'all':
          dataset = arrTimes()
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
                // item.toTimeString().substring(0, 8).concat(", ", item.toDateString().substring(0, 3), ", ", item.toDateString().substring(4, 10), ", ", item.toDateString().substring(11))
                (item.getHours() + ":" +
                  (item.getMinutes().toString().length == 1 ? "0" + item.getMinutes() : item.getMinutes()) + ":" +
                  (item.getSeconds().toString().length == 1 ? "0" + item.getSeconds() : item.getSeconds()) +
                  ", " + item.toString().substring(8,10) + " " +
                  item.toLocaleString('default', { month: 'short' }) + " " +
                  item.getFullYear()
                ).toString()
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
      let changeDatesInterval = setInterval(() => {
        let checkedOpt = document.querySelector<HTMLInputElement>('input[name="timeselect"]:checked');
        if (!checkedOpt!.checked) { 
          chart.destroy();
          clearInterval(changeDatesInterval);
        }
      }, 4)
      } catch (err: any) {
      this.router.navigateByUrl("/error?error=" + err)
    }
  }
}
