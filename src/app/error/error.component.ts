import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(){}

  error: string | null = new URLSearchParams(window.location.search).get('error');

  ngOnInit(): void {
    document.querySelector<HTMLAnchorElement>('a')!.setAttribute('href', `mailto:victorstefan.costin@gmail.com?subject=Hey!%20An%20error%20occured%20on%20your%20website!&body=Temperature sensor website%0A${this.error}`)
  }
}
